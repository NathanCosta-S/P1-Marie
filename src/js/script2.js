 // Lista de imagens (coloque o caminho correto das suas PNGs)
 const imagens = [
  '../src/img/css.png',
  '../src/img/C.png',
  '../src/img/corel.png',
  '../src/img/GIT.png',
  '../src/img/html.png',
  '../src/img/hub.png',
  '../src/img/JS.png',
  '../src/img/TS.png'
];



  // Duplicar imagens para formar pares
  let cartas = imagens.concat(imagens);

  // Embaralhar
  cartas.sort(() => 0.5 - Math.random());

  const tabuleiro = document.getElementById('tabuleiro');
  let cartaVirada = null;
  let bloqueio = false;

  cartas.forEach(src => {
    const carta = document.createElement('div');
    carta.classList.add('carta');
    const img = document.createElement('img');
    img.src = src;
    carta.appendChild(img);

    carta.addEventListener('click', () => {
      if (bloqueio || carta.classList.contains('virada')) return;

      carta.classList.add('virada');

      if (!cartaVirada) {
        cartaVirada = carta;
      } else {
        if (carta.querySelector('img').src === cartaVirada.querySelector('img').src) {
          // Par correto
          cartaVirada = null;
        } else {
          bloqueio = true;
          setTimeout(() => {
            carta.classList.remove('virada');
            cartaVirada.classList.remove('virada');
            cartaVirada = null;
            bloqueio = false;
          }, 1000);
        }
      }
    });

    tabuleiro.appendChild(carta);
  });