const timerDisplay = document.getElementById("timer");
const startButton = document.getElementById("startButton");
const resetButton = document.getElementById("resetButton");
const pauseButton = document.getElementById("pauseButton");
const continueButton = document.getElementById("continueButton");
let timeLeft = 60; // 25 minutes in seconds
let timerInterval;
let isPaused = false;

function updateTimer() {
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  timerDisplay.textContent = `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
}

function startTimer() {
  clearInterval(timerInterval);
  timerInterval = setInterval(() => {
    if (!isPaused) {
      if (timeLeft > 0) {
        timeLeft--;
        updateTimer();
      } else {
        clearInterval(timerInterval);
        playSound();
        showNotification(
          "Arbeitsintervall abgeschlossen. Zeit für eine Pause!"
        );
        timeLeft = 300; // 5 minutes break
        updateTimer();
      }
    }
  }, 1000);
}

function pauseTimer() {
  isPaused = true;
}

function continueTimer() {
  isPaused = false;
}

function resetTimer() {
  clearInterval(timerInterval);
  timeLeft = 1500; // Reset to 25 minutes
  updateTimer();
}

function playSound() {
  // Hier kannst du den Code zum Abspielen eines Sounds einfügen
}

startButton.addEventListener("click", () => {
  startTimer();
});

pauseButton.addEventListener("click", () => {
  pauseTimer();
});

continueButton.addEventListener("click", () => {
  continueTimer();
});

resetButton.addEventListener("click", resetTimer);
