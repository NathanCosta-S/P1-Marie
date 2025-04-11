const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('nav.nav-links');

menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    menuToggle.classList.toggle('active');
});

function appendValue(valor) {
    document.getElementById('display').value += valor;
  }

  function limpar() {
    document.getElementById('display').value = '';
  }

  function calcular() {
    try {
      const resultado = eval(document.getElementById('display').value);
      document.getElementById('display').value = resultado;
    } catch (e) {
      alert('Expressão inválida');
    }
  };

  document.addEventListener('DOMContentLoaded', () => {
    const gameBoard = document.getElementById('gameBoard');
    const restartButton = document.getElementById('restartButton');
    
    let cards = [];
    let flippedCards = [];
    let canFlip = true;
    
    // URLs das imagens para os pares (8 pares = 16 cartas)
    const imageUrls = [
        '../src/img/html.png',
        '../src/img/C.png',
        '../src/img/hub.png',
        '../src/img/JS.png',
        '../src/img/TS.png',
        '../src/img/corel.png',
        '../src/img/GIT.png',
        '../src/img/css.png'
    ];
    
    // Inicializar o jogo
    function initGame() {
        // Resetar variáveis
        cards = [];
        flippedCards = [];
        canFlip = true;
        
        // Limpar tabuleiro
        gameBoard.innerHTML = '';
        
        // Criar pares de cartas
        const cardValues = [...imageUrls, ...imageUrls];
        
        // Embaralhar cartas
        shuffleArray(cardValues);
        
        // Criar elementos das cartas
        cardValues.forEach((value, index) => {
            const card = document.createElement('div');
            card.className = 'card';
            card.dataset.value = value;
            card.dataset.index = index;
            card.addEventListener('click', flipCard);
            
            // Parte de trás da carta (verso)
            const back = document.createElement('div');
            back.className = 'back';
            
            // Parte da frente da carta (imagem)
            const front = document.createElement('div');
            front.className = 'front';
            const img = document.createElement('img');
            img.src = value;
            img.alt = 'Imagem da carta';
            front.appendChild(img);
            
            card.appendChild(back);
            card.appendChild(front);
            
            gameBoard.appendChild(card);
            cards.push({
                element: card,
                value: value,
                flipped: false,
                matched: false
            });
        });
    }
    
    // Embaralhar array
    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }
    
    // Virar carta
    function flipCard() {
        if (!canFlip) return;
        
        const index = parseInt(this.dataset.index);
        const card = cards[index];
        
        // Não fazer nada se a carta já estiver virada ou combinada
        if (card.flipped || card.matched) return;
        
        // Virar a carta
        card.flipped = true;
        this.classList.add('flipped');
        flippedCards.push(card);
        
        // Verificar se duas cartas estão viradas
        if (flippedCards.length === 2) {
            canFlip = false;
            
            // Verificar se as cartas são iguais
            if (flippedCards[0].value === flippedCards[1].value) {
                // Par encontrado
                flippedCards[0].matched = true;
                flippedCards[1].matched = true;
                
                flippedCards[0].element.classList.add('matched');
                flippedCards[1].element.classList.add('matched');
                
                flippedCards = [];
                canFlip = true;
                
                // Verificar se o jogo terminou
                if (cards.every(card => card.matched)) {
                    setTimeout(() => {
                        alert('Parabéns! Você completou o jogo!');
                    }, 500);
                }
            } else {
                // Cartas não combinam - virar de volta após um pequeno atraso
                setTimeout(() => {
                    flippedCards.forEach(card => {
                        card.flipped = false;
                        card.element.classList.remove('flipped');
                    });
                    flippedCards = [];
                    canFlip = true;
                }, 1000);
            }
        }
    }
    
    // Reiniciar o jogo
    restartButton.addEventListener('click', initGame);
    
    // Iniciar o jogo quando a página carregar
    initGame();
});