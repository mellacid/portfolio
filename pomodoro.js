const timerDisplay = document.getElementById("timer");
const startAutoButton = document.getElementById("startAutoButton");
const startManualButton = document.getElementById("startManualButton");
const startPauseButton = document.getElementById("startPauseButton");
const resetButton = document.getElementById("resetButton");
let timeLeft = 1500; // 25 minutes in seconds
let timerInterval;
let manualMode = false;
let pauseMode = false;

function updateTimer() {
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  timerDisplay.textContent = `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
}

function showNotification(message) {
  if (Notification.permission === "granted") {
    new Notification(message);
  } else if (Notification.permission !== "denied") {
    Notification.requestPermission().then((permission) => {
      if (permission === "granted") {
        new Notification(message);
      }
    });
  }
}

function startTimer() {
  clearInterval(timerInterval);
  timerInterval = setInterval(() => {
    if (timeLeft > 0) {
      timeLeft--;
      updateTimer();
    } else {
      clearInterval(timerInterval);
      playSound();
      showNotification("Arbeitsintervall abgeschlossen. Zeit für eine Pause!");
      timeLeft = 300; // 5 minutes break
      updateTimer();
    }
  }, 1000);
}

function pauseTimer() {
  clearInterval(timerInterval);
  pauseMode = true;
  timeLeft = 300; // 5 minutes break
  updateTimer();
}

function resetTimer() {
  clearInterval(timerInterval);
  timeLeft = 1500; // Reset to 25 minutes
  updateTimer();
}

function playSound() {
  // Hier kannst du den Code zum Abspielen eines Sounds einfügen
}

startAutoButton.addEventListener("click", () => {
  manualMode = false;
  pauseMode = false;
  startTimer();
});

startManualButton.addEventListener("click", () => {
  manualMode = true;
  pauseMode = false;
  clearInterval(timerInterval);
  updateTimer();
});

startPauseButton.addEventListener("click", () => {
  manualMode = false;
  pauseMode = true;
  pauseTimer();
});

resetButton.addEventListener("click", resetTimer);

// Timer für 2 Stunden und 25 Minuten
setTimeout(() => {
  showNotification("Pomodoro-Session beendet. Gute Arbeit!");
}, 8700000); // 2 Stunden und 25 Minuten in Millisekunden
