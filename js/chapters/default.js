// js/chapters/default.js
window.Chapters = window.Chapters || {};

/**
 * CAPÍTULO 1 — “Olá, nova vida!”
 * Fases:
 *  - home_intro: prólogo em casa (monólogo + Meggy + dica da maleta)
 *  - pre: chegada ao EveryHour Café (Jonny + Oliver) + escolha #1
 *  - post: depois do minigame + escolha #2
 *  - home: mensagens noturnas (Meggy, depois Oliver) + pensamentos
 *
 * Regras:
 *  - “Você” fica alinhada à direita (tratado em dialogue.js)
 *  - Duas escolhas no total (1 no pre, 1 no post) com impacto leve em afinidade
 *  - Mensagens de celular usam { phone:true } (handphone overlay)
 *  - Emoções do Oliver: normal, confuso, surpreso, animado
 */

window.Chapters[1] = {
  /* ===== CASA — PRÓLOGO (ANTES DO TRABALHO) ===== */
  home_intro: [
    { speaker:'Você', text:'Hoje a casa ainda cheira a tinta e caixas de papelão. Cada passo faz eco. Parece vazio, mas é um vazio meu.' },
    { speaker:'Você', text:'Na outra cidade eu acordava sempre com um peso no peito. Tudo tinha regra. Tudo tinha opinião. Eu tinha pouco espaço pra existir.' },
    { speaker:'Você', text:'Aqui eu ainda não sei onde fica a padaria mais próxima, nem o ônibus certo. Mas eu sei que posso errar, tentar de novo e chamar isso de vida.' },
    { speaker:'Você', text:'Vou ter contas, louça, poeira no chão. Vou ter trabalho e talvez dias ruins. Mesmo assim, quando respiro, tem um gosto de liberdade.' },

    // Meggy — mensagens de texto
    { speaker:'(Meggy)', text:'"Amiga!! Falei com o dono do EveryHour Café. Tá T-U-D-O certo pra você começar hoje ✨"', phone:true },
    { speaker:'(Meggy)', text:'"O nome dele é Jonny. Ele é quase uma fábrica de piadas ruins, mas é gente boa. O trampo é entregar café, chá e croissant pra quem busca."', phone:true },
    { speaker:'Você', text:'Obrigada por abrir essa porta pra mim. Prometo não derrubar bandejas (ou pelo menos não duas vezes).', phone:true },
    { speaker:'(Meggy)', text:'"Hahaha! E prometo que devolvo sua camisa na semana que vem. Juro de mindinho! 😅"', phone:true },
    { speaker:'Você', text:'Vou cobrar. E vou postar no meu blog imaginário se não cumprir.', phone:true },

    // Fechando o prólogo
    { speaker:'Você', text:'Tá. Primeiro dia. Banho, cabelo preso, tênis confortável. Sem coragem não tem recomeço.' },
    { speaker:'(Dica)', text:'Toque no ícone de maleta para ir ao trabalho.' }
  ],

  /* ===== TRABALHO — PRÉ-MINIGAME ===== */
  pre: [
    { speaker:'Jonny', text:'Bem-vinda ao EveryHour Café! Eu sou o Jonny. Aqui a gente serve pressa com carinho: café quentinho, chá perfumado e croissant que desmancha.' , showChar:{name:'jonny', side:'left'} },
    { speaker:'Jonny', text:'Por enquanto é take-away. O segredo é olhar o pedido, sorrir com os olhos e entregar como se fosse um presente.' },
    { speaker:'Jonny', text:'Você parece do tipo que presta atenção em gente. Isso ajuda muito.' },

    // Oliver entra
    { speaker:'Oliver', text:'Oi, oi! Seja super bem-vinda! Eu sou o Oliver.' , showChar:{name:'oliver', side:'right', emotion:'animado'} },
    { speaker:'Você', text:'Oi… prazer. Eu ainda tô decorando meu nome na campainha. Se eu disser algo sem sentido, finge que era poesia.' },
    { speaker:'Oliver', text:'Fechado! Se travar, a gente diz que foi uma performance. Eu bato palmas e todo mundo acredita.' , showChar:{name:'oliver', side:'right', emotion:'surpreso'} },
    { speaker:'Jonny', text:'Olha, já virou dupla de comédia. Qualquer coisa me chama… ou chama o Oliver. Vou ali resolver um troço rapidinho.', showChar:{name:'jonny', side:'left'} },

    // Só Oliver e a jogadora
    { speaker:'Oliver', text:'Eu moro aqui desde sempre. Às vezes acho que a cidade sabe meu humor pelo jeito que o vento entra pela janela.' , showChar:{name:'oliver', side:'right', emotion:'normal'} },
    { speaker:'Oliver', text:'Eu maratono filmes de terror como se estudasse pra uma prova que nunca vem. Meu sonho atual é ter um gatinho.' , showChar:{name:'oliver', side:'right', emotion:'animado'} },
    { speaker:'Oliver', text:'Ainda moro com os meus pais. Eles sempre dizem “um dia, quem sabe”. Eu adoro eles, mas a resposta costuma ser não.' , showChar:{name:'oliver', side:'right', emotion:'confuso'} },
    { speaker:'Você', text:'Eu acabei de chegar. Ainda erro a rua de casa. Mas quando abro a janela, sinto que, pela primeira vez, sou eu que decido o barulho.' },

    // ESCOLHA #1
    {
      speaker:'Você',
      text:'Como responder ao Oliver?',
      choices:[
        { text:'Brincar: “te ajudo a convencer seus pais… em troca de croissant quentinho.”', effects:{ affinity:+1 } },
        { text:'Tímida: “tomara que seu gatinho chegue logo. Você fala bonito quando fala dele.”', effects:{ affinity:0 } }
      ]
    },

    { speaker:'Oliver', text:'Negócio fechado ou torcida garantida. Valeu por ouvir.' , showChar:{name:'oliver', side:'right', emotion:'normal'} },
    { speaker:'Oliver', text:'Eu deixo tudo pronto lá dentro. Você manda no balcão. Se algo cair, a gente inventa que foi coreografia.' , showChar:{name:'oliver', side:'right', emotion:'animado'} },
    { speaker:'Você', text:'Combinado. Se eu dançar, prometo ritmo.' },
    { speaker:'Jonny', text:'Então simbora. Quando quiser, começa o expediente.', showChar:{name:'jonny', side:'left'} }
  ],

  /* ===== TRABALHO — PÓS-MINIGAME ===== */
  post: [
    { speaker:'Você', text:'Primeiro dia vencido. Meu coração bateu rápido no começo, depois acertou o passo.' },
    { speaker:'Oliver', text:'Eu vi. Você encontrou um jeito de sorrir com paciência. Parece pouco, mas muda o dia de quem passa.' , showChar:{name:'oliver', side:'right', emotion:'normal'} },
    { speaker:'Oliver', text:'No começo soa repetitivo. Três itens, pessoas apressadas. Com o tempo, cada pedido vira um pequeno encontro.' , showChar:{name:'oliver', side:'right', emotion:'confuso'} },
    { speaker:'Você', text:'Gostei de te ouvir falando assim. Parece que você sabe guardar detalhes.' },

    // Jonny chega e vira climinha de piada
    { speaker:'Oliver', text:'E confesso: eu precisava de alguém simpática aqui. Eu já estava sofrendo com as piadas do chefe…', showChar:{name:'oliver', side:'right', emotion:'surpreso'} },
    { speaker:'Jonny', text:'Eu ouvi “piadas do chefe”? O que tem minhas piadas?' , showChar:{name:'jonny', side:'left'} },
    { speaker:'Oliver', text:'Nada! Tudo incrível! Eu rio por dentro pra economizar energia, chefe. Hahaha!' , showChar:{name:'oliver', side:'right', emotion:'animado'} },
    { speaker:'Você', text:'Eu… gosto do clima daqui. Parece que a cidade fica mais leve por cinco minutos.' },

    // ESCOLHA #2
    {
      speaker:'Você',
      text:'Como reagir agora?',
      choices:[
        { text:'Brincar com o Oliver: “piada boa é a que rende croissant extra no fim do turno.”', effects:{ affinity:+1 } },
        { text:'Apoiar o Jonny: “tem um charme nessas piadas. Fica parecendo família.”', effects:{ affinity:0 } }
      ]
    },

    { speaker:'Jonny', text:'Família é isso: gente que aguenta o nosso humor e ainda volta amanhã.' },
    { speaker:'Você', text:'Obrigada pelos aprendizados de hoje.' },
    { speaker:'Jonny', text:'Fechamos. Vai descansar e cuida de você. Amanhã a cidade pede bis.' }
  ],

  /* ===== CASA — NOITE (DEPOIS DO TRABALHO) ===== */
  home: [
    // Meggy — fofocas e cuidado
    { speaker:'(Meggy)', text:'"E aí? Como foi o grande dia? Tô aqui roendo a tampa do pote de sorvete de ansiedade 🍨"', phone:true },
    { speaker:'Você', text:'Deu certo. O Jonny é brincalhão de verdade. E o Oliver… é diferente. Jeito manso de olhar, sabe?', phone:true },
    { speaker:'(Meggy)', text:'"Diferente tipo bonito-diferente? Porque ouvi boatos. Ele é o famoso pedido que todo mundo quer repetir 😏"', phone:true },
    { speaker:'Você', text:'Bonito, sim. Mas não só isso. Ele fala como se tivesse um filme passando por trás dos olhos.', phone:true },
    { speaker:'(Meggy)', text:'"Amei a poesia, mas cuidado. Meu tio Jonny disse que ele é meio fora de órbita ainda. Mora com os pais, não pega ônibus sozinho, essas coisas."', phone:true },
    { speaker:'Você', text:'Eu também já me senti fora de órbita. Crescer é meio cambaleante. Não acho um problema por si só.', phone:true },
    { speaker:'(Meggy)', text:'"Ok, adulta! Eu tô orgulhosa. Quero te ver com alguém que te acompanhe no passo. Você merece um mundo inteiro."', phone:true },
    { speaker:'Você', text:'Obrigada por ser meu porto. Te amo, Meggy. Boa noite 💖', phone:true },
    { speaker:'(Meggy)', text:'"Te amo mais. Dorme com os anjos. E sem derrubar bandeja no sonho 😂"', phone:true },

    // Oliver — mensagem inesperada
    { speaker:'(Oliver)', text:'"Oi oi! O Jonny me passou seu número pra gente se falar se rolar algo no café 😉"', phone:true },
    { speaker:'Você', text:'Claro. Obrigada por hoje. Boa noite 😊', phone:true },

    // Pensamento final
    { speaker:'Você', text:'Talvez tenha sido só educação. Talvez tenha sido um convite silencioso.' },
    { speaker:'Você', text:'É cedo pra chamar de destino. Mas eu gosto dessa curva no caminho.' },
    { speaker:'Você', text:'Apago a luz. Amanhã eu descubro mais um pedacinho de quem eu sou.' }
  ]
};

/* Fallback genérico (outros dias sem roteiro dedicado) */
window.Chapters.default = {
  pre: [
    { speaker:'Jonny', text:'Pronta para mais um dia?', showChar:{name:'jonny', side:'left'} },
    { speaker:'Você', text:'Prontíssima!' },
    { speaker:'Oliver', text:'Deixei tudo encaminhado. Boa sorte no balcão!', showChar:{name:'oliver', side:'right', emotion:'normal'} },
  ],
  post: [
    { speaker:'Oliver', text:'Foi um bom dia!', showChar:{name:'oliver', side:'right', emotion:'normal'} },
    { speaker:'Você', text:'Foi mesmo. Até amanhã!' },
    { speaker:'Jonny', text:'Descansa bem.', showChar:{name:'jonny', side:'left'} },
  ],
  home: [
    { speaker:'Você', text:'Mais um dia concluído.' }
  ]
};
