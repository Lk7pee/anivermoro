/**
 * Personalize este arquivo e publique novamente. Todos os caminhos de foto e áudio
 * são relativos à pasta que contém index.html (ex.: "./img/primeiroprint.jpeg").
 * Campos vazios são opcionais: não aparecem como links ou imagens quebradas.
 */
export const siteConfig = {
  nomeDoSite: 'Nosso Pequeno Infinito ♡',
  nomeDele: '',
  nomeDela: '',
  apelidoCarinhoso: 'meu amor',
  dataInicioNamoro: '2025-10-09',
  dataPrimeiroAniversario: '2026-10-09',
  timezone: 'America/Recife',
  cores: { dele: ['#142850', '#E63946'], dela: ['#FFD6E7', '#FF4F9A'] },

  textos: {
    inviteTitle: 'Ei, {apelido}... 💌',
    inviteSub: 'Preparei uma coisinha para você.',
    inviteReveal1: '365 dias atrás, começou uma das partes mais bonitas da minha vida.',
    inviteReveal2: 'E hoje eu queria te mostrar uma coisa...',
    siteTitle: '', // vazio = usar nomeDoSite no título principal
    mainPhrase: 'Um ano de nós. Uma eternidade para descobrir.',
    universeSub: 'Um ano atrás, duas histórias começaram a ser uma só.',
    counterLabel: 'Estamos escrevendo nossa história há...',
    historyTitleStart: 'Nossa história, ',
    historyTitleEnd: 'do nosso jeito.',
    historyIntro: 'Nenhuma história bonita cabe inteira numa linha do tempo. Mas alguns pedacinhos merecem ficar guardados.',
    worldsTitleStart: 'Dois mundos. ',
    worldsTitleEnd: 'Um lugar só nosso.',
    worldsIntro: 'Duas cores, duas playlists, mil detalhes diferentes. E uma coincidência bonita: a gente.',
    worldHim: 'Eu tinha meu próprio mundo, minhas músicas, minhas cores e meus sonhos...',
    worldHer: 'Você chegou com seu mundo, seus detalhes, seu jeito único e tudo aquilo que faz você ser você.',
    worldUnion: 'E no meio de tantas diferenças, a gente encontrou o nosso lugar favorito: um no outro.',
    musicTitleStart: 'Se a gente fosse ',
    musicTitleEnd: 'uma playlist...',
    musicIntro: 'Talvez tivesse músicas para dançar, outras para ficar quietinhos e algumas que ainda vamos descobrir.',
    quizTitleStart: 'Será que você conhece mesmo o seu namorado? ',
    quizTitleEnd: '👀💕',
    quizIntro: 'Prometo que não vale nota. Só vale sorrir.',
    lettersTitleStart: '12 cartinhas, ',
    lettersTitleEnd: '12 meses.',
    lettersIntro: 'Cada mês teve seu próprio pedacinho de nós. Abra quantas vezes quiser.',
    letterPrompt: 'Escolha uma cartinha para ler.',
    hugTitleStart: 'Tá com saudade ',
    hugTitleEnd: 'de mim? 🥹',
    hugIntro: 'Tem abraço que a gente guarda até poder dar de verdade.',
    finaleTitleStart: 'Antes de terminar...',
    finaleTitleEnd: 'tem uma última coisa que eu preciso te dizer.',
    finaleHint: 'Toque para abrir a carta',
    surpriseTitleStart: 'Achou que tinha ',
    surpriseTitleEnd: 'acabado? 👀',
    surpriseIntro: 'Nosso primeiro ano chegou ao fim. Mas a nossa história não.',
    giftMessage: 'Mais 365 oportunidades de fazer memórias comigo. ♡',
    nextChapter: 'Próximo capítulo: nós dois, de novo e de novo.',
    finalQuestion: 'Continua comigo nessa história?'
  },

  musica: { ativada: false, faixaLocal: '', volumeInicial: 0.3 },
  playlist: [
    { titulo: 'O universo dele', artista: 'Billie Eilish', musica: "Halley's Comet", url: 'https://www.youtube.com/watch?v=geUYm3f6ZA4&t=116s', mensagem: 'Um pedacinho da música que eu queria guardar aqui.', previewUrl: 'https://open.spotify.com/embed/track/5XsAal7ZcWg1I5T4NcRjkv?utm_source=generator', previewInicio: 116, previewFim: 138 },
    { titulo: 'O universo dela', artista: 'Ariana Grande', musica: 'POV', url: 'https://www.youtube.com/watch?v=nQJEp-k-ogs', mensagem: 'Uma música com o brilho do seu mundo.', previewUrl: 'https://open.spotify.com/embed/track/3UoULw70kMsiVXxW0L3A33?utm_source=generator', previewInicio: 24, previewFim: 54 },
    { titulo: 'A trilha sonora da nossa história', artista: 'Sotam, Rob e Pulim', musica: 'Foi Assim', url: 'https://www.youtube.com/watch?v=vUI2PT3rKts', mensagem: 'Uma música para esse pedacinho da nossa história.', previewUrl: 'https://open.spotify.com/embed/track/6fPALIGFkjmlHKuiiZLRl6?utm_source=generator', previewInicio: 0, previewFim: 30 }
  ],

  momentos: [
    { data: '22/08/2026', titulo: 'O início de tudo.', descricao: 'Talvez a gente não soubesse o tamanho da história que a gente tava começando, mas foi o dia em que tudo começou e eu viveria tudo de novo com você meu amor.', foto: './img/primeiroprint.jpeg', alt: 'Print completo da nossa primeira conversa', emoji: '♡', legenda: 'Nosso primeiro print', destaque: true },
    { data: '', titulo: 'Uma das nossas primeiras fotos', descricao: 'Aquela foto que toda vez que você vê, você diz, "Apaga isso menino" mas no fundo você sabe que essa foto representa muito mais, essa foi a primeira vez que a gente se encontrou e a primeira foto que a gene tirou juntos', foto: './img/primeirafoto.jpeg', alt: 'Nossa primeira foto juntos', emoji: '✦', legenda: 'Nossa primeira foto' },
    { data: '09/10/2025', titulo: 'Um dia Inesquecível', descricao: 'O dia em que eu tomei a decisão em fazer tudo na minha e na sua vida mudar, e te pedi em namoro, com o objetivo de te ter pra o resto da vida', foto: './img/pedidodenamoro.jpeg', alt: 'Buquê de rosas do pedido de namoro', emoji: '☼', legenda: 'O pedido de namoro' },
    { data: '', titulo: 'Uma memória que faz sorrir', descricao: 'Quando você alisou meu cabelo pela primeira vez e eu fiquei parecendo um porco espinho kkkkk', foto: './img/fotoengracada.jpeg', alt: 'Foto engraçada do cabelo alisado', emoji: '✿', legenda: 'O cabelo de porco-espinho' },
    { data: '', titulo: 'Nós dois ♡', descricao: 'Eu te amo pra sempre minha princesa', foto: './img/amoreu.jpeg', alt: 'Nós dois juntos na praia', emoji: '♡', legenda: 'Eu e você' }
  ],

  perguntas: [
    { pergunta: 'Quais são duas das minhas cores favoritas?', opcoes: ['Azul e vermelho', 'Verde e amarelo', 'Preto e lilás', 'Laranja e branco'], correta: 0, acerto: 'Acertou! Duas cores bem minhas. 💙❤️', erro: 'Quase! Minha dupla é azul e vermelho.' },
    { pergunta: 'Qual cantora eu mais gosto de ouvir?', opcoes: ['Ariana Grande', 'Billie Eilish', 'Dua Lipa', 'Taylor Swift'], correta: 1, acerto: 'Isso! Billie Eilish na nossa playlist. 🎧', erro: 'É a Billie Eilish! Mas adoro sua tentativa.' },
    { pergunta: 'Qual herói eu gosto?', opcoes: ['Batman', 'Superman', 'Homem-Aranha', 'Flash'], correta: 2, acerto: 'Com grandes poderes... vem um grande acerto! 🕸️', erro: 'É o Homem-Aranha! 🕸️' },
    { pergunta: 'Em que dia começou nosso namoro?', opcoes: ['09/10/2025', '10/09/2025', '09/10/2026', '10/10/2025'], correta: 0, acerto: 'Essa data mora no meu coração. ♡', erro: 'Foi em 09/10/2025. Agora você não esquece mais! ♡' },
    { pergunta: 'Quem é minha pessoa favorita?', opcoes: ['Um super-herói', 'Uma cantora', 'Você', 'Meu travesseiro'], correta: 2, acerto: 'Essa era fácil. Sempre você. 💕', erro: 'A resposta que eu escolheria todas as vezes é: você. 💕' }
  ],

  cartinhas: [
    'Com você, até os dias comuns têm alguma coisa especial.',
    'Eu amo poder dividir minhas pequenas conquistas com você.',
    'Seu sorriso consegue melhorar dias que pareciam impossíveis.',
    'Eu gosto de quem sou quando estou ao seu lado.',
    'Você transformou companhia em significado.',
    'Ainda quero descobrir milhares de coisas sobre você.',
    'Não precisamos de um dia perfeito para criar uma lembrança bonita.',
    'Entre tantas coisas no mundo, eu continuo escolhendo você.',
    'Adoro quando a gente encontra motivos para rir juntos.',
    'Obrigado por fazer parte de tantos momentos da minha vida.',
    'Nosso amor merece ser cuidado nas pequenas coisas, todos os dias.',
    'Um ano é só o começo de tudo o que ainda desejo viver com você.'
  ],

  cartaFinal: `{saudacao},

Hoje faz um ano que a nossa história começou.

E é estranho pensar como uma única data pode guardar tanto significado. Há um ano, a gente estava começando algo que, aos poucos, se tornaria uma parte tão importante da minha vida.

Eu queria encontrar uma forma diferente de comemorar esse dia com você. Algo que não fosse apenas um presente, mas que tivesse um pedacinho do meu carinho em cada detalhe.

Foi por isso que fiz esse nosso pequeno universo.

Coloquei aqui um pouco das nossas cores, das coisas que a gente gosta e de tudo aquilo que me faz pensar em você.

Sei que nenhum site vai conseguir explicar completamente o que eu sinto, mas espero que, enquanto você passeia por cada cantinho dele, consiga perceber o quanto é especial para mim.

Obrigado por esse primeiro ano. Pelos momentos bons, pelos aprendizados, pela companhia e por tudo o que ainda estamos construindo.

Eu não sei tudo o que o futuro guarda para nós. Mas sei que quero continuar criando memórias, encontrando motivos para sorrir e fazendo a nossa história valer a pena.

Feliz um ano de namoro, meu amor.

Eu te amo. ❤️`,
  assinatura: 'Com todo o meu amor,\nSeu Bilulipe ♡',

  segredos: {
    heart: 'De todos os encontros possíveis, o meu favorito foi encontrar você.',
    star: 'Se eu pudesse escolher uma estrela, escolheria a que me trouxe até você.',
    bow: 'Bilhete secreto: o seu jeitinho deixa o meu mundo mais bonito. ♡',
    web: 'Entre tantos caminhos possíveis, o meu favorito foi o que me levou até você. 🕸️'
  },
  abraco: 'Ganhou um abraço pra agora',
  beijinho: 'Toma um beijinho sua biluzinha tolofinha',
  mensagemFinalJogo: 'Pode até errar algumas respostas... Mas teve uma coisa que meu coração acertou: escolher você.',
  promessa: 'Continuar cuidando do que a gente constrói, mesmo nos dias difíceis.',
  desejo: 'Que nunca faltem motivos para a gente sorrir junto.',
  plano: 'Viver mais momentos que um dia vamos querer lembrar.'
};
