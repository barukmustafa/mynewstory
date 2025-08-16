// js/work.js
window.Game = window.Game || {};

(function(){
  /**
   * props:
   * - phase: 'pre' | 'post'
   */
  function render({ phase='pre' }={}){
    Game.Dialogue.render({
      phase,
      nextLabel: 'Continuar',
      retainOnFinish: true,
      bg: 'kitchen',
      onFinish: ({ mount })=>{
        const panel = document.createElement('div');
        panel.className = 'panel show';
        if(phase==='pre'){
          panel.innerHTML = `
            <h2 style="margin:6px 0 12px">Pronta para começar?</h2>
            <p class="center" style="margin-top:0">Atenda os clientes arrastando o item correto até cada um.</p>
            <button id="btnGoMini" class="primary btn-next">Começar a trabalhar</button>
          `;
          panel.querySelector('#btnGoMini').onclick = ()=> Game.State.go('minigame');
        } else {
          const earned = Game.State.state.today?.coinsEarned || 0;
          panel.innerHTML = `
            <h2 style="margin:6px 0 12px">Bom trabalho!</h2>
            <p class="center" style="margin-top:0">Você ganhou <b>+${earned}</b> moedas hoje.</p>
            <button id="btnGoHome" class="primary btn-next">Ir pra casa</button>
          `;
          panel.querySelector('#btnGoHome').onclick = ()=>{
            // não vira o dia aqui; habilita "Dormir" e mostra mensagens em casa
            Game.State.state.today.canSleep = true;
            Game.State.state.today.showHomeDialog = true;
            Game.State.save();
            Game.State.go('home');
          };
        }
        mount.appendChild(panel);
      }
    });
  }

  Game.Work = { render };
})();
