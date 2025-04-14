  // Função para adicionar valores no visor da calculadora
  function appendValue(valor) {
    document.getElementById('display').value += valor;
  }

  function calcular() {
    let expressao = document.getElementById('display').value;
    try {
      let resultado = eval(expressao); 
      document.getElementById('display').value = resultado;
    } catch (erro) {
      document.getElementById('display').value = 'Erro';
    }
  }

  function limpar() {
    document.getElementById('display').value = '';
  }

// jogo da memoria
   const pares = [
    {pergunta: '5+5', resposta: '10'},
    {pergunta: '8x6', resposta: '48'},
    {pergunta: '35/5', resposta: '7'},
    {pergunta: '122x5', resposta: '610'},
    {pergunta: '355-85', resposta: '270'},
    {pergunta: '3x+5=11', resposta: 'x=2'},
    {pergunta: '5x+2=17', resposta: 'x=3'},
    {pergunta: '4x−8=12', resposta: 'x=5'}
];
let cartas = [];
pares.forEach(par => {
    cartas.push({texto: par.pergunta, valor: par.resposta});
    cartas.push({texto: par.resposta, valor: par.resposta});
});
cartas.sort(() => 0.5 - Math.random());

const tabuleiro = document.getElementById('tabuleiro');
let cartaVirada = null;
let bloqueio = false;

cartas.forEach(c => {
    const carta = document.createElement('div');
    carta.classList.add('carta');
    carta.dataset.valor = c.valor;
    carta.dataset.texto = c.texto;
    carta.innerText = '';

    carta.addEventListener('click', () => {
        if (bloqueio || carta.classList.contains('virada')) return;

        carta.innerText = carta.dataset.texto;
        carta.classList.add('virada');

        if (!cartaVirada) {
            cartaVirada = carta;
        } else {
            if (carta.dataset.valor === cartaVirada.dataset.valor) {
            
                cartaVirada = null;
            } else {
              
                bloqueio = true;
                setTimeout(() => {
                    carta.innerText = '';
                    carta.classList.remove('virada');
                    cartaVirada.innerText = '';
                    cartaVirada.classList.remove('virada');
                    cartaVirada = null;
                    bloqueio = false;
                }, 1000);
            }
        }
    });

    tabuleiro.appendChild(carta);
});