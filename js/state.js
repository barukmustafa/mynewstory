// js/state.js
window.Game = window.Game || {};

(function(){
  const SAVE_KEY = 'mns_v1';

  const DEFAULT = {
    money: 0, gems: 0, day: 1, affinity: 0, jobProgress: 0,
    flags: {
      metLove:false, firstDate:false, cohabiting:false,
      introShown:false // ← mostra o prólogo em casa apenas uma vez (Dia 1)
    },
    today: { worked:false, coinsEarned:0, canSleep:false, showHomeDialog:false },
  };

  const state = load() || JSON.parse(JSON.stringify(DEFAULT));

  function load(){
    try{ const raw = localStorage.getItem(SAVE_KEY); return raw ? JSON.parse(raw) : null; }
    catch(e){ console.warn('Falha load', e); return null; }
  }
  function save(){ try{ localStorage.setItem(SAVE_KEY, JSON.stringify(state)); } catch(e){ console.warn('Falha save', e); } }
  function reset(){ Object.assign(state, JSON.parse(JSON.stringify(DEFAULT))); save(); renderHUD(); }

  function renderHUD(){
    const g = (id)=>document.getElementById(id);
    g('coins').textContent = state.money;
    g('gems').textContent = state.gems;
    g('day').textContent = state.day;
    g('aff').textContent = state.affinity;
  }

  // Toast
  let toastT=null;
  function toast(msg, ms=1800){
    const t = document.getElementById('toast');
    t.textContent = msg; t.style.display='block';
    clearTimeout(toastT); toastT = setTimeout(()=> t.style.display='none', ms);
  }

  // Transição universal
  async function transition(runSwapScene){
    const tr = document.getElementById('transition');
    tr.classList.remove('fade-out'); tr.classList.add('fade-in'); await wait(500);
    await runSwapScene();
    tr.classList.remove('fade-in'); tr.classList.add('fade-out'); await wait(500);
    tr.classList.remove('fade-out');
  }
  function wait(ms){ return new Promise(r=>setTimeout(r, ms)); }

  // Roteador
  const sceneEl = () => document.getElementById('scene');
  async function go(sceneName, props={}){
    await transition(async ()=>{
      sceneEl().innerHTML = '';
      if(sceneName==='home') Game.Home.render();
      else if(sceneName==='work') Game.Work.render(props);
      else if(sceneName==='minigame') Game.Minigame.render();
      else if(sceneName==='shop') Game.Shop.render();
      else if(sceneName==='dialogue') Game.Dialogue.render(props); // debug/manual
    });
    renderHUD();
  }

  function newDay(){
    state.day += 1;
    state.today = { worked:false, coinsEarned:0, canSleep:false, showHomeDialog:false };
    save(); renderHUD();
  }

  Game.State = { state, save, reset, renderHUD, toast, go, newDay, wait };
})();
