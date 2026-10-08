# Nosso Pequeno Infinito ♡

Site estático de aniversário de namoro para **09/10/2025 a 09/10/2026**. Os dez capítulos podem ser publicados diretamente no GitHub Pages.

## Ver o site

Abra `index.html` em um navegador moderno. Se o navegador bloquear módulos JavaScript em `file://`, inicie um servidor local nesta pasta:

```powershell
python -m http.server 8000
```

Depois acesse `http://localhost:8000/`.

## Publicar no GitHub Pages

1. Crie um repositório no GitHub.
2. Envie todos os arquivos desta pasta para a raiz do repositório, incluindo `index.html`, `.nojekyll`, `css/`, `js/`, `assets/` e **`img/`**.
3. Em **Settings → Pages → Build and deployment**, escolha **Deploy from a branch**, branch **main** e pasta **/ (root)**.
4. Abra o endereço publicado no celular para conferir fotos, áudio e textos.

Os caminhos são relativos e funcionam em um subdiretório do GitHub Pages. Os arquivos enviados ao repositório e ao Pages ficam públicos; revise as fotos e informações pessoais antes da publicação.

## Personalizar

Edite [`js/config.js`](./js/config.js) para mudar textos, datas, fotos, músicas, perguntas, cartinhas e a assinatura. As cinco fotos atuais estão em `img/` como arquivos **JPEG**, mesmo que nomes `.png` tenham sido mencionados na solicitação: `primeiroprint.jpeg`, `primeirafoto.jpeg`, `pedidodenamoro.jpeg`, `fotoengracada.jpeg` e `amoreu.jpeg`. Mantenha os caminhos de `momentos[].foto` iguais aos nomes reais dos arquivos.

As fotos aparecem inteiras nas molduras da linha do tempo. Toque em uma delas para abrir o visualizador; o botão **Ampliar detalhes** permite ler o primeiro print de conversa sem perder partes da imagem. O texto alternativo de cada foto fica em `momentos[].alt`.

Cada item de `playlist` usa `musica`, `artista`, `url` e `previewUrl`. O botão de prévia carrega o embed oficial do Spotify somente após o toque. Para a Billie, o link **Abrir música** já aponta para aproximadamente 1:56, no trecho de “What a drag to love you like I do”; as outras duas faixas também têm prévias curtas. A reprodução depende da disponibilidade do Spotify e da conexão do visitante.

As datas do contador são datas de calendário no fuso configurado em `timezone`; nenhum horário de início é presumido. Em 09/10/2026, ele mostra 365 dias.

## Verificações

Confira a abertura, os dez capítulos, o jogo, as 12 cartinhas, as fotos, as três prévias, o abraço, o beijo, a carta e a surpresa final. Teste também em um celular real antes de compartilhar. A prévia local foi conferida em larguras pequenas e grandes; a publicação em uma conta do GitHub e o Safari de um iPhone físico dependem do dispositivo e repositório de destino.

## Privacidade

O site não tem backend nem rastreamento próprio. O navegador guarda localmente se o envelope e algumas cartinhas foram abertos. Google Fonts é carregado ao abrir a página; o player do Spotify é carregado quando alguém pede uma prévia musical. Consulte as políticas desses serviços se isso for relevante para sua publicação.

## Estrutura

```text
index.html             estrutura dos dez capítulos
css/                   visual, animações e responsividade
js/config.js           conteúdo e personalização
js/render.js           criação dos cartões e da linha do tempo
js/interactions.js     jogo, envelopes, fotos, músicas e surpresas
js/animations.js       entradas, progresso e corações
js/utils.js            datas, DOM e armazenamento local
img/                   cinco fotografias do casal
assets/                ícone e recursos locais
.nojekyll              publicação direta no GitHub Pages
```
# anivermoro
