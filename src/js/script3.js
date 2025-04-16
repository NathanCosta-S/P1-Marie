let score = 0;
let time = 60;
let correctAnswer = true;
let interval;

function gerarQuestao() {
  let a = Math.floor(Math.random() * 10);
  let b = Math.floor(Math.random() * 10);
  let realResult = a + b;

  let mostrarResultado = realResult;

  if (Math.random() > 0.5) {
    mostrarResultado += Math.floor(Math.random() * 3) - 1; // +-1
    correctAnswer = mostrarResultado === realResult;
  } else {
    correctAnswer = true;
  }

  document.getElementById("statement").textContent = `${a} + ${b} = ${mostrarResultado}`;
}

function responder(escolha) {
  const feedback = document.getElementById("feedback");

  if (escolha === correctAnswer) {
    score++;
    feedback.textContent = " Correto!";
    feedback.style.color = "green";
  } else {
    feedback.textContent = " Errado!";
    feedback.style.color = "red";
  }

  document.getElementById("score").textContent = score;
  gerarQuestao();
}

function iniciarTempo() {
  interval = setInterval(() => {
    time--;
    document.getElementById("time").textContent = time;

    if (time === 0) {
      clearInterval(interval);
      document.getElementById("statement").textContent = "Fim de jogo!";
      document.querySelectorAll(".buttons button").forEach(btn => btn.disabled = true);
    }
  }, 1000);
}

function iniciarJogo() {
  // Resetar estado
  score = 0;
  time = 60;
  document.getElementById("score").textContent = score;
  document.getElementById("time").textContent = time;
  document.getElementById("feedback").textContent = "";
  document.querySelectorAll(".buttons button").forEach(btn => btn.disabled = false);

  // Mostrar a área do jogo
  document.getElementById("startBtn").style.display = "none";
  document.getElementById("jogo").style.display = "block";

  gerarQuestao();
  iniciarTempo();
}
