// js/minigame.js
window.Game = window.Game || {};

(function(){
  const S = ()=>Game.State.state;

  const MENU = [
    { key:'coffee', img:'files/coffee.png', label:'Café' },
    { key:'tea', img:'files/tea.png', label:'Chá' },
    { key:'croissant', img:'files/croissant.png', label:'Croissant' },
  ];
  const CUSTOMERS = [
    'files/customer_1.png','files/customer_2.png','files/customer_3.png',
    'files/customer_4.png','files/customer_5.png','files/customer_6.png',
  ];
  const rnd = (arr)=> arr[Math.floor(Math.random()*arr.length)];

  function render(){
    const root = document.createElement('div');
    root.className = 'scene-minigame';

    // Camada de noite (crossfade)
    const night = document.createElement('div');
    night.className = 'mg-sky-night';

    // CLIENTES
    const customersEl = document.createElement('div'); customersEl.className='mg-customers';

    // HUD
    const mgHud = document.createElement('div'); mgHud.className='mg-hud';
    mgHud.innerHTML = `
      <div class="mg-pill">
        <img src="files/clockgame_icon.png" alt="Tempo" class="mg-icon" />
        <span id="mgTime">60s</span>
      </div>
      <div class="mg-pill">
        <img src="files/clients_icon.png" alt="Atendidos" class="mg-icon" />
        <span id="mgScore">0</span>
      </div>
      <button id="btnPause" class="mg-pill-btn" title="Pausar">
        <img id="pauseIcon" src="files/pause_icon.png" alt="Pause" />
      </button>
    `;

    // Mesa / Itens
    const tableEl = document.createElement('div'); tableEl.className='mg-table';
    const itemsEl = document.createElement('div'); itemsEl.className='items';
    tableEl.appendChild(itemsEl);

    // Painel de fechamento
    const endPanel = document.createElement('div'); endPanel.className='panel hidden';
    endPanel.innerHTML = `
      <h2 style="margin:6px 0 12px">Hora de fechar!</h2>
      <div id="endStats" style="margin-bottom:10px"></div>
      <button class="primary btn-next" id="btnCloseDay">Encerrar o dia</button>
    `;

    // Ordem: night (absoluta), clientes, mesa, HUD, endPanel
    root.append(night, customersEl, tableEl, mgHud, endPanel);
    document.getElementById('scene').appendChild(root);

    // 3 clientes
    let clients = [ newCustomer(), newCustomer(), newCustomer() ];
    clients.forEach(c => { c.classList.add('enter-down-up'); customersEl.appendChild(c); });

    // Itens
    const spawn = [ {x:480,y:40}, {x:640,y:40}, {x:800,y:40} ];
    MENU.forEach((m,i)=> itemsEl.appendChild(makeItem(m, (spawn[i]?.x||520+i*160), (spawn[i]?.y||40))));

    // ===== Tempo (60s) e crossfade =====
    const TOTAL_MS = 60000;
    const FADE_START_MS = 31000; // inicia aos 31s
    const FADE_DUR_MS   = 21000; // dura 21s (até 52s)
    let remainingMs = TOTAL_MS;
    let score=0, started=false, paused=false, ended=false;

    // 🔒 navegação bloqueada durante o jogo
    const navBtns = ['btnHome','btnWork','btnShop','btnRestart'].map(id=>document.getElementById(id));
    function setNavDisabled(disabled){ navBtns.forEach(b=>{ if(b) b.disabled = !!disabled; }); }

    // Loop a cada 100ms para fade suave e timer preciso
    let loopId=null;
    function start(){
      if(started) return; started=true;
      remainingMs = TOTAL_MS; score = 0; ended = false; updateHud();
      setNavDisabled(true); paused = false;
      loopId = setInterval(loop, 100);
    }
    function loop(){
      if(paused || ended) return;
      remainingMs -= 100;
      if(remainingMs < 0) remainingMs = 0;

      // Atualiza HUD
      updateHud();

      // Crossfade
      const elapsed = TOTAL_MS - remainingMs;
      let alpha = 0;
      if(elapsed >= FADE_START_MS){
        alpha = Math.min(1, (elapsed - FADE_START_MS) / FADE_DUR_MS);
      }
      night.style.opacity = alpha.toFixed(3);

      if(remainingMs === 0){ end(); }
    }
    function updateHud(){
      const secs = Math.ceil(remainingMs/1000);
      document.getElementById('mgTime').textContent = `${secs}s`;
      document.getElementById('mgScore').textContent = `${score}`;
    }
    function end(){
      if(loopId){ clearInterval(loopId); loopId=null; }
      ended = true; paused = true;

      // trava interações
      itemsEl.style.pointerEvents = 'none';
      customersEl.style.pointerEvents = 'none';
      const btnPause = mgHud.querySelector('#btnPause');
      if(btnPause){
        btnPause.disabled = true;
        btnPause.title = 'Rodada encerrada';
        mgHud.querySelector('#pauseIcon').src = 'files/playgame_icon.png';
        btnPause.style.filter='grayscale(1)';
      }

      // ganhos
      const coins = score * 2;
      S().money += coins;
      S().today.worked = true;
      S().today.coinsEarned = coins;
      Game.State.save(); Game.State.renderHUD();

      // Painel
      const stats = endPanel.querySelector('#endStats');
      stats.innerHTML = `<div>Clientes atendidos: <b>${score}</b></div><div>🪙 Moedas: <b>+${coins}</b></div>`;
      endPanel.classList.remove('hidden');
      endPanel.classList.add('show');
    }

    // Fechar dia
    endPanel.addEventListener('click', (e)=>{
      if(e.target && e.target.id === 'btnCloseDay'){
        setNavDisabled(false);
        Game.State.go('work', { phase:'post' });
      }
    });

    // Pause/Play com troca de ícone
    mgHud.querySelector('#btnPause').onclick = ()=>{
      if(!started || ended) return;
      paused = !paused;
      const icon = mgHud.querySelector('#pauseIcon');
      const btn = mgHud.querySelector('#btnPause');
      if(paused){
        icon.src = 'files/playgame_icon.png';
        btn.title = 'Retomar';
        btn.style.filter = 'grayscale(1)';
      } else {
        icon.src = 'files/pause_icon.png';
        btn.title = 'Pausar';
        btn.style.filter = '';
      }
    };

    // Início automático
    start();

    function makeItem(menuItem, baseX, baseY){
      const el = document.createElement('div'); el.className='item'; el.style.left = baseX+'px'; el.style.bottom = baseY+'px';
      el.dataset.type = menuItem.key;
      el.innerHTML = `<div class="plate"></div><div class="food" style="background-image:url('${menuItem.img}')"></div>`;

      let dragging=false, startX=0, startY=0, orig={left:baseX, bottom:baseY};

      el.addEventListener('pointerdown', e=>{
        if(paused || ended) return;
        e.preventDefault(); dragging=true; el.setPointerCapture(e.pointerId);
        startX = e.clientX; startY = e.clientY; el.classList.add('dragging');
      });

      el.addEventListener('pointermove', e=>{
        if(!dragging || paused || ended) return;
        const dx = e.clientX - startX, dy = e.clientY - startY;
        el.style.left = (orig.left + dx) + 'px';
        el.style.bottom = (orig.bottom - dy) + 'px';
      });

      function endDrag(e){
        if(!dragging) return;
        el.releasePointerCapture?.(e.pointerId);
        dragging=false; el.classList.remove('dragging');

        if(ended){
          el.style.left = orig.left+'px';
          el.style.bottom = orig.bottom+'px';
          return;
        }

        const prevPE = el.style.pointerEvents;
        el.style.pointerEvents = 'none';
        const under = document.elementFromPoint(e.clientX, e.clientY);
        const targetCustomer = under?.closest?.('.customer') || null;
        el.style.pointerEvents = prevPE;

        if(targetCustomer){
          const want = targetCustomer.dataset.order;
          const have = el.dataset.type;
          if(want === have){
            score += 1; updateHud();
            serveAndReplaceCustomer(targetCustomer);
          } else {
            const img = targetCustomer.querySelector('img');
            if(img){
              img.classList.remove('shake'); void img.offsetWidth;
              img.classList.add('shake');
              setTimeout(()=> img.classList.remove('shake'), 360);
            }
          }
        }
        el.style.left = orig.left+'px';
        el.style.bottom = orig.bottom+'px';
      }
      el.addEventListener('pointerup', endDrag);
      el.addEventListener('pointercancel', endDrag);

      return el;
    }

    function newCustomer(){
      const wrap = document.createElement('div'); wrap.className='customer';
      const img = document.createElement('img'); img.src = rnd(CUSTOMERS);
      wrap.appendChild(img);

      const orderKey = rnd(MENU).key;
      wrap.dataset.order = orderKey;
      const bubble = document.createElement('div'); bubble.className='order';
      const icon = document.createElement('img'); icon.src = MENU.find(m=>m.key===orderKey).img;
      bubble.append(icon); wrap.appendChild(bubble);

      return wrap;
    }

    function serveAndReplaceCustomer(targetEl){
      if(!targetEl || ended) return;
      const parent = targetEl.parentElement;
      const idx = Array.from(parent.children).indexOf(targetEl);
      targetEl.classList.remove('enter-down-up');
      targetEl.classList.add('exit-up-down');
      targetEl.addEventListener('animationend', function onExit(){
        targetEl.removeEventListener('animationend', onExit);
        if(!parent || idx<0 || ended) return;
        if(parent.children[idx]){
          const fresh = newCustomer();
          fresh.classList.add('enter-down-up');
          parent.replaceChild(fresh, parent.children[idx]);
        }
      });
    }
  }

  Game.Minigame = { render };
})();
