// js/shop.js
window.Game = window.Game || {};
(function(){
  function render(){
    const root = document.createElement('div');
    root.className = 'scene-home';
    root.innerHTML = `<div class="home-overlay"></div>`;
    const box = document.createElement('div'); box.className='box';
    box.style.position='absolute'; box.style.right='20px'; box.style.top='80px';
    box.innerHTML = `<b>Loja (em breve)</b><div class="muted">Vamos focar no minigame e VN primeiro.</div>`;
    root.appendChild(box);
    document.getElementById('scene').appendChild(root);
  }
  Game.Shop = { render };
})();
