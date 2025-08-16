// js/dialogue.js
window.Game = window.Game || {};

(function(){
  const S = ()=>Game.State.state;

  function getChapter(day){
    if(window.Chapters && window.Chapters[day]) return window.Chapters[day];
    return (window.Chapters && window.Chapters.default) || { pre:[], post:[], home:[] };
  }

  // Mapeia sprites
  function srcFor(name, emotion='normal'){
    if(name==='jonny') return 'files/friend.png';
    if(name==='oliver'){
      if(emotion==='confuso')   return 'files/oliver_confuso.png';
      if(emotion==='surpreso')  return 'files/oliver_surpreso.png';
      if(emotion==='animado')   return 'files/oliver_animado.png';
      return 'files/oliver_normal.png';
    }
    return null;
  }

  /**
   * props:
   * - phase: 'pre' | 'post' | 'home'
   * - onFinish: fn(payload?)
   * - nextLabel: string
   * - retainOnFinish: boolean
   * - bg: 'kitchen' | 'home'
   */
  function render({ phase='pre', onFinish=null, nextLabel='Avançar ▶', retainOnFinish=false, bg='kitchen' }={}){
    const root = document.createElement('div');
    root.className = 'scene-dialogue';
    root.style.background = bg==='home'
      ? "#000 url('files/bg_casa.png') center/cover no-repeat"
      : "#000 url('files/bg_kitchen.jpg') center/cover no-repeat";

    const chars = document.createElement('div'); chars.className='vn-characters';
    root.appendChild(chars);

    // Phone overlay (home only)
    const phone = document.createElement('div');
    phone.className = 'phone-overlay';
    root.appendChild(phone);

    const box = document.createElement('div'); box.className='box vn-box';
    const speaker = document.createElement('div'); speaker.className='speaker';
    const text = document.createElement('div'); text.className='vn-text';
    const choices = document.createElement('div'); choices.className='choices';
    const controls = document.createElement('div'); controls.className='vn-controls';
    const next = document.createElement('button'); next.className='primary btn-next btn-continue'; next.textContent = nextLabel;
    controls.append(next);
    box.append(speaker, text, choices, controls);
    root.appendChild(box);

    document.getElementById('scene').appendChild(root);

    const chap = getChapter(S().day);
    const lines = JSON.parse(JSON.stringify(chap[phase] || []));
    let i=0;

    // cria/atualiza personagem em cena, com emoção
    function setChar(name, side='left', emotion='normal'){
      if(!name) return;
      const id = `char-${name}`;
      let el = chars.querySelector('#'+id);
      const desiredSrc = srcFor(name, emotion) || '';
      if(!el){
        el = document.createElement('img');
        el.id = id; el.className = `char ${side}`;
        el.src = desiredSrc;
        el.dataset.emotion = emotion;
        chars.appendChild(el);
        requestAnimationFrame(()=> el.classList.add('show'));
      } else {
        // troca de emoção com animação hide→show
        if(el.dataset.emotion !== emotion){
          el.classList.remove('show'); el.classList.add('hide');
          setTimeout(()=>{
            el.src = desiredSrc; el.dataset.emotion = emotion;
            el.classList.remove('hide'); el.classList.add('show');
          }, 180);
        } else {
          el.classList.add('show');
        }
      }
    }

    function phoneIn(){
      if(bg!=='home') return;
      phone.classList.remove('phone-out'); phone.className = 'phone-overlay phone-in';
    }
    function phoneOut(cb){
      if(bg!=='home'){ cb?.(); return; }
      phone.classList.remove('phone-in'); phone.classList.add('phone-out');
      setTimeout(()=>{ cb?.(); }, 280);
    }

    function renderStep(){
      choices.innerHTML='';
      const step = lines[i];
      if(!step){
        if(typeof onFinish === 'function'){
          if(retainOnFinish){
            root.innerHTML = '';
            root.appendChild(document.createElement('div')).className = 'vn-characters';
            onFinish({ mount: root });
          } else {
            root.remove(); onFinish();
          }
        } else {
          if(phase==='pre') Game.State.go('minigame'); else Game.State.go('home');
        }
        return;
      }

      // condicional
      if(step.cond){
        const branch = step.cond(S()) ? step.then : step.else;
        lines.splice(i,1, ...branch);
        return renderStep();
      }

      // personagem/emoção
      if(step.showChar){
        setChar(step.showChar.name, step.showChar.side||'left', step.showChar.emotion||'normal');
      }

      // alinhamento “Você” à direita
      const isPlayer = step.speaker && step.speaker.toLowerCase().startsWith('você');
      speaker.classList.toggle('me', !!isPlayer);
      text.classList.toggle('me', !!isPlayer);

      speaker.textContent = step.speaker || '';
      text.textContent = step.text || '';

      // phone overlay (home) neste passo?
      if(step.phone){ phoneIn(); } else { phone.classList.remove('phone-in','phone-out'); }

      // escolhas (duas)
      if(step.choices){
        next.disabled = true;
        step.choices.slice(0,2).forEach(opt=>{
          const b = document.createElement('button'); b.className='choice';
          b.textContent = opt.text;
          b.onclick = ()=>{
            const proceed = ()=>{
              if(opt.effects){
                if('affinity' in opt.effects) S().affinity += opt.effects.affinity;
                if('jobProgress' in opt.effects) S().jobProgress += opt.effects.jobProgress;
                Game.State.save(); Game.State.renderHUD();
              }
              i++; renderStep();
            };
            if(step.phone) phoneOut(proceed); else proceed();
          };
          choices.appendChild(b);
        });
      } else {
        next.disabled = false;
      }
    }

    next.onclick = ()=>{
      const step = lines[i];
      const go = ()=>{ i++; renderStep(); };
      if(step && step.phone) phoneOut(go); else go();
    };

    renderStep();
  }

  Game.Dialogue = { render };
})();
