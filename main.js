const emojis = ["🐶", "🚀", "🎉", "🤔", "📚", "👻", "🏠", "🚫", "👑", "🤝"];
const game = document.querySelector(".game");
const message = document.getElementById("message");
const timerEl = document.getElementById("timer");
const movesEl = document.getElementById("moves");

const soundSuccess = new Audio('./src/success.mp3');
const soundFail = new Audio('./src/fail.mp3');


let openCards = [];
let lockBoard = false;
let matchedCount = 0;
let moves = 0;
let time = 0;
let timerInterval = null;

function startTimer() {
  timerInterval = setInterval(() => {
    time++;
    timerEl.textContent = `${time}s`;
  }, 1000);
}

function stopTimer() {
  clearInterval(timerInterval);
}

function updateMoves() {
  moves++;
  movesEl.textContent = moves;
}

function checkWin() {
  if (matchedCount === emojis.length) {
    stopTimer();
    message.style.display = "block";
    message.textContent = `🎉 Parabéns! Você venceu em ${time}s com ${moves} jogadas!`;
  }
}


const shuffledEmojis = [...emojis, ...emojis].sort(() => Math.random() - 0.5);

shuffledEmojis.forEach((emoji) => {
  const box = document.createElement("div");
  box.classList.add("item");
  box.innerHTML = `<span class="emoji">${emoji}</span>`;
  box.addEventListener("click", handleClick);
  game.appendChild(box);
});

function handleClick() {
  if (lockBoard || this.classList.contains("matched") || this.classList.contains("flipped")) return;

  if (moves === 0 && time === 0) startTimer();

  this.classList.add("flipped");
  openCards.push(this);

  if (openCards.length === 2) {
    lockBoard = true;
    updateMoves();

    const [card1, card2] = openCards;
    const emoji1 = card1.querySelector("span").textContent;
    const emoji2 = card2.querySelector("span").textContent;

    if (emoji1 === emoji2) {
      card1.classList.add("matched");
      card2.classList.add("matched");
      openCards = [];
      matchedCount++;
      lockBoard = false;
      
      checkWin();
        soundSuccess.play();
    } else {
      setTimeout(() => {
        card1.classList.remove("flipped");
        card2.classList.remove("flipped");
        soundFail.play();
        openCards = [];
        lockBoard = false;
      }, 1000);
    }
  }
}
