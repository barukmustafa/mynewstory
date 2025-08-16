// js/main.js
(function(){
  const S = ()=>Game.State.state;

  // HUD buttons
  document.getElementById('btnRestart').onclick = ()=>{ Game.State.reset(); Game.State.go('home'); };
  document.getElementById('btnHome').onclick    = ()=> Game.State.go('home');
  document.getElementById('btnWork').onclick    = ()=> Game.State.go('work', { phase:'pre' });
  document.getElementById('btnShop').onclick    = ()=> Game.State.go('shop');

  // Render inicial
  Game.State.renderHUD();
  Game.State.go('home');

  // Debug helpers
  window.__mns = {
    coins(n=100){ S().money+=n; Game.State.save(); Game.State.renderHUD(); },
    gems(n=1){ S().gems+=n; Game.State.save(); Game.State.renderHUD(); },
    day(n=1){ S().day = n; Game.State.save(); Game.State.renderHUD(); },
    reset(){ Game.State.reset(); Game.State.go('home'); }
  };
})();
