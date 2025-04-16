// Lista de imagens (cada item é o caminho de uma imagem no seu computador ou site)
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

// Aqui duplicamos as imagens, para que possamos ter pares (2 de cada imagem)
let cartas = imagens.concat(imagens); // Agora temos 16 imagens (8 pares)

// Embaralhamos a lista de cartas, para que fiquem em ordem aleatória
cartas.sort(() => 0.5 - Math.random());

// Pegamos o tabuleiro (a parte da tela onde as cartas vão aparecer)
const tabuleiro = document.getElementById('tabuleiro');

// Variáveis para controlar o jogo
let cartaVirada = null; // Armazena a carta que foi virada primeiro
let bloqueio = false;   // Evita que o jogador clique em mais cartas enquanto espera

// Para cada imagem da lista de cartas
cartas.forEach(src => {
  // Criamos uma nova 'div' para representar a carta
  const carta = document.createElement('div');
  carta.classList.add('carta'); // Damos uma classe para poder estilizar com CSS

  // Criamos a imagem da carta
  const img = document.createElement('img');
  img.src = src; // Definimos a imagem que essa carta vai mostrar
  carta.appendChild(img); // Colocamos a imagem dentro da carta

  // Adicionamos um clique para a carta
  carta.addEventListener('click', () => {
    // Se o jogo estiver bloqueado ou a carta já estiver virada, não faz nada
    if (bloqueio || carta.classList.contains('virada')) return;

    // Viramos a carta (adicionamos a classe 'virada')
    carta.classList.add('virada');

    if (!cartaVirada) {
      // Se nenhuma carta estava virada antes, guardamos essa
      cartaVirada = carta;
    } else {
      // Se já tinha uma carta virada, comparamos as duas
      if (carta.querySelector('img').src === cartaVirada.querySelector('img').src) {
        // Se forem iguais, deixamos ambas viradas e zeramos a cartaVirada
        cartaVirada = null;
      } else {
        // Se forem diferentes, bloqueamos o jogo por 1 segundo
        bloqueio = true;
        setTimeout(() => {
          // Desviramos as duas cartas
          carta.classList.remove('virada');
          cartaVirada.classList.remove('virada');
          cartaVirada = null;
          bloqueio = false;
        }, 1000); // Espera 1 segundo (1000 milissegundos)
      }
    }
  });

  // Colocamos a carta dentro do tabuleiro
  tabuleiro.appendChild(carta);
});
