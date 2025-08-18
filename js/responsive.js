// js/responsive.js
(function(){
  const BASE_W = 1280;
  const BASE_H = 720;

  function classifyDevice(w, h){
    const min = Math.min(w, h);
    if(min <= 700) return 'device-phone';
    if(min <= 1100) return 'device-tablet';
    return 'device-desktop';
  }

  function applyScale(){
    const w = window.innerWidth;
    const h = window.innerHeight;

    // escala que encaixa o frame inteiro na viewport
    const scale = Math.max(0.3, Math.min((w - 8) / BASE_W, (h - 8) / BASE_H));

    // aplica classe de device no BODY para futuros ajustes que quisermos
    const cls = classifyDevice(w, h);
    document.body.classList.remove('device-phone','device-tablet','device-desktop');
    document.body.classList.add(cls);

    // seta a variável CSS
    document.documentElement.style.setProperty('--scale', scale.toFixed(4));

    // aviso de rotação (somente quando for phone em retrato)
    const overlay = document.getElementById('rotateOverlay');
    const isPortrait = h > w;
    const isPhone = cls === 'device-phone';
    if(overlay){
      if(isPhone && isPortrait){
        overlay.classList.add('show');
      } else {
        overlay.classList.remove('show');
      }
    }
  }

  // Debounce simples pra não recalcular mil vezes durante resize
  let t=null;
  function onResize(){
    clearTimeout(t);
    t = setTimeout(applyScale, 50);
  }

  // init
  window.addEventListener('resize', onResize, { passive:true });
  window.addEventListener('orientationchange', onResize, { passive:true });
  window.addEventListener('DOMContentLoaded', applyScale);
})();
