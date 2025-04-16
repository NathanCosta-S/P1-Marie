// Variáveis que guardam o estado do jogo
let score = 0; // Quantidade de acertos do jogador
let time = 60; // Tempo restante (em segundos)
let correctAnswer = true; // Se a conta exibida está correta ou não
let interval; // Vai guardar a contagem do tempo (cronômetro)


function gerarQuestao() {
  let a = Math.floor(Math.random() * 10); // Número aleatório entre 0 e 9
  let b = Math.floor(Math.random() * 10); // Outro número aleatório entre 0 e 9
  let realResult = a + b; // Resultado correto da soma dos dois

  let mostrarResultado = realResult; // Esse é o resultado que será mostrado na tela (pode ser certo ou errado)

  // Com 50% de chance, mostramos um resultado errado de propósito
  if (Math.random() > 0.5) {
    mostrarResultado += Math.floor(Math.random() * 3) - 1; // Altera o resultado em -1, 0 ou +1
    correctAnswer = mostrarResultado === realResult; // Se for igual ao real, é verdadeiro, senão é falso
  } else {
    correctAnswer = true; // Mostramos o resultado correto mesmo
  }

  // Mostra a conta no elemento com id "statement"
  document.getElementById("statement").textContent = `${a} + ${b} = ${mostrarResultado}`;
}


function responder(escolha) {
  const feedback = document.getElementById("feedback"); // Onde vamos mostrar "Correto" ou "Errado"

  // Se o jogador acertou (ou seja, clicou na resposta certa)
  if (escolha === correctAnswer) {
    score++; // Aumenta a pontuação
    feedback.textContent = " Correto!";
    feedback.style.color = "green"; // Cor verde para indicar acerto
  } else {
    feedback.textContent = " Errado!";
    feedback.style.color = "red"; // Cor vermelha para erro
  }

  // Atualiza o placar na tela
  document.getElementById("score").textContent = score;

  // Gera uma nova pergunta
  gerarQuestao();
}


function iniciarTempo() {
  interval = setInterval(() => {
    time--; // Diminui o tempo a cada segundo
    document.getElementById("time").textContent = time; // Atualiza o tempo na tela

    if (time === 0) {
      clearInterval(interval); // Para o cronômetro quando chegar a 0
      document.getElementById("statement").textContent = "Fim de jogo!";
      
      // Desativa os botões de resposta
      document.querySelectorAll(".buttons button").forEach(btn => btn.disabled = true);
    }
  }, 1000); // Executa isso a cada 1000 milissegundos (1 segundo)
}


function iniciarJogo() {
  // Reinicia tudo
  score = 0;
  time = 60;
  document.getElementById("score").textContent = score;
  document.getElementById("time").textContent = time;
  document.getElementById("feedback").textContent = "";

  // Ativa os botões novamente
  document.querySelectorAll(".buttons button").forEach(btn => btn.disabled = false);

  // Esconde o botão de "Iniciar" e mostra a área do jogo
  document.getElementById("startBtn").style.display = "none";
  document.getElementById("jogo").style.display = "block";

  // Começa o jogo: gera a primeira pergunta e inicia o cronômetro
  gerarQuestao();
  iniciarTempo();
}
