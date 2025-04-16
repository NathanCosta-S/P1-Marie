// 🟡 MENU HAMBURGUER (abre e fecha o menu em telas pequenas)

const menuToggle = document.querySelector('.menu-toggle'); // pega o botão do menu (ícone)
const navLinks = document.querySelector('nav.nav-links'); // pega o menu com os links

// Quando clicar no botão do menu:
menuToggle.addEventListener('click', () => {
  navLinks.classList.toggle('open'); // abre/fecha o menu
  menuToggle.classList.toggle('active'); // muda o ícone (tipo animação)
});


// Função para adicionar valores no visor da calculadora
// 🧮 CALCULADORA

// Adiciona um número ou símbolo no visor
function appendValue(valor) {
  document.getElementById('display').value += valor;
}

// Faz o cálculo quando o usuário aperta "="
function calcular() {
  let expressao = document.getElementById('display').value; // pega o que está escrito no visor
  try {
    let resultado = eval(expressao); // "eval" tenta resolver a conta (ex: 2+3)
    document.getElementById('display').value = resultado; // mostra o resultado
  } catch (erro) {
    document.getElementById('display').value = 'Erro'; // se der erro na conta, mostra "Erro"
  }
}

// Limpa o visor
function limpar() {
  document.getElementById('display').value = '';
}

// 🧠 JOGO DA MEMÓRIA COM OPERAÇÕES DE MATEMÁTICA

// Lista de pares com pergunta e resposta
const pares = [
  { pergunta: '5+5', resposta: '10' },
  { pergunta: '8x6', resposta: '48' },
  { pergunta: '35/5', resposta: '7' },
  { pergunta: '122x5', resposta: '610' },
  { pergunta: '355-85', resposta: '270' },
  { pergunta: '3x+5=11', resposta: 'x=2' },
  { pergunta: '5x+2=17', resposta: 'x=3' },
  { pergunta: '4x−8=12', resposta: 'x=5' }
];

let cartas = []; // lista que vai conter todas as cartas (perguntas e respostas)

// Para cada par, cria duas cartas: uma com a pergunta e uma com a resposta
pares.forEach(par => {
  cartas.push({ texto: par.pergunta, valor: par.resposta });
  cartas.push({ texto: par.resposta, valor: par.resposta });
});

// Embaralha as cartas de forma aleatória
cartas.sort(() => 0.5 - Math.random());


const tabuleiro = document.getElementById('tabuleiro'); // pega o tabuleiro (área onde vai ficar as cartas)
let cartaVirada = null; // armazena a primeira carta que o jogador vira
let bloqueio = false; // impede que o jogador clique em outras cartas durante a animação


// Cria cada carta visualmente e define o comportamento quando clicada
cartas.forEach(c => {
  const carta = document.createElement('div'); // cria um novo elemento <div> para a carta
  carta.classList.add('carta'); // adiciona a classe "carta" pra estilizar
  carta.dataset.valor = c.valor; // guarda o valor correto da carta (para comparar depois)
  carta.dataset.texto = c.texto; // guarda o texto que será exibido (pergunta ou resposta)
  carta.innerText = ''; // inicialmente, a carta fica virada (sem texto)

  // Quando o jogador clica na carta:
  carta.addEventListener('click', () => {
    if (bloqueio || carta.classList.contains('virada')) return; // se não puder clicar, sai da função

    carta.innerText = carta.dataset.texto; // mostra o texto da carta (vira ela)
    carta.classList.add('virada'); // adiciona uma classe pra deixar virada visualmente

    if (!cartaVirada) {
      // se é a primeira carta que o jogador virou:
      cartaVirada = carta;
    } else {
      // se é a segunda carta:
      if (carta.dataset.valor === cartaVirada.dataset.valor) {
        // se os valores forem iguais (é um par!)
        cartaVirada = null; // zera a cartaVirada pra começar de novo
      } else {
        // se não for um par, esconde as cartas depois de 1 segundo
        bloqueio = true; // trava o jogo por 1 segundo
        setTimeout(() => {
          carta.innerText = '';
          carta.classList.remove('virada');
          cartaVirada.innerText = '';
          cartaVirada.classList.remove('virada');
          cartaVirada = null;
          bloqueio = false;
        }, 1000); // espera 1 segundo
      }
    }
  });

  // coloca a carta no tabuleiro
  tabuleiro.appendChild(carta);
});
