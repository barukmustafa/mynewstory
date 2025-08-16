// js/home.js
window.Game = window.Game || {};

(function(){
  const S = ()=>Game.State.state;

  function render(){
    const root = document.createElement('div');
    root.className = 'scene-home';
    root.innerHTML = `<div class="home-overlay"></div>`;
    const scene = document.getElementById('scene');
    scene.appendChild(root);

    // PRÓLOGO (Dia 1, antes do trabalho) — monólogo + msgs Meggy + dica
    if(S().day === 1 && !S().today.worked && !S().flags.introShown){
      S().flags.introShown = true; Game.State.save();
      Game.Dialogue.render({
        phase:'home_intro',
        nextLabel:'Continuar',
        bg:'home',
        onFinish:()=>{ /* mantém em casa; jogadora escolhe ir trabalhar pela maleta */ }
      });
      return; // evita disparar também o diálogo pós-trabalho
    }

    // Mensagens/pensamentos ao voltar da work (pós-minigame)
    if(S().today.showHomeDialog){
      S().today.showHomeDialog = false; Game.State.save();
      Game.Dialogue.render({
        phase:'home',
        nextLabel:'Continuar',
        bg:'home',
        onFinish:()=>{ /* volta para a casa simplesmente */ }
      });
    }

    // Botão Dormir (só depois de voltar do trabalho)
    if(S().today.canSleep){
      const sleep = document.createElement('button');
      sleep.className = 'sleep-btn';
      sleep.innerHTML = `<img src="files/sleep_icon.png" alt="Dormir" /><span>Dormir</span>`;
      sleep.onclick = ()=>{
        Game.State.newDay();
        Game.State.toast('Novo dia! 🌅');
        Game.State.go('home');
      };
      root.appendChild(sleep);
    }
  }

  Game.Home = { render };
})();
