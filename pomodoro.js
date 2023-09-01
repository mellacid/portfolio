const timerDisplay = document.getElementById("timer");
const startButton = document.getElementById("startButton");
const resetButton = document.getElementById("resetButton");
const pauseButton = document.getElementById("pauseButton");
const continueButton = document.getElementById("continueButton");
const messageDisplay = document.getElementById("message"); // Element für die Nachricht

let pomodoroCount = 0; // Zähler für abgeschlossene Pomodoro-Einheiten
let timeLeft = 5; // 25 Minuten in Sekunden (Standard-Pomodoro)
let timerInterval;
let isPaused = false;

function updateTimer() {
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  timerDisplay.textContent = `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
}

function showMessage(message) {
  messageDisplay.textContent = message; // Nachricht anzeigen
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
        pomodoroCount++;
        if (pomodoroCount % 4 === 0) {
          showMessage("Große Pause. Zeit für eine Pause!"); // Nachricht für große Pause
          timeLeft = 9000; // 2 Stunden und 30 Minuten für die große Pause
        } else {
          showMessage("Arbeitsintervall abgeschlossen. Zeit für eine Pause!"); // Nachricht für Pomodoro-Pause
          timeLeft = 5; // 5 Minuten Pause
        }
        updateTimer();
        startTimer(); // Timer für die Pause starten
      }
    }
  }, 1000);
}

function pauseTimer() {
  isPaused = true;
  showMessage("Pause läuft..."); // Nachricht für laufende Pause
}

function continueTimer() {
  isPaused = false;
  showMessage(""); // Nachricht löschen
  if (pomodoroCount % 4 !== 0) {
    showMessage("Pomodoro-Modus: 25 Minuten konzentriert arbeiten!"); // Neue Nachricht für Pomodoro-Modus
  }
  startTimer(); // Fortsetzen startet den Timer erneut
}

function resetTimer() {
  clearInterval(timerInterval);
  pomodoroCount = 0; // Zurücksetzen des Pomodoro-Zählers
  timeLeft = 1500; // Zurücksetzen auf 25 Minuten (Standard-Pomodoro)
  updateTimer();
  showMessage(""); // Nachricht löschen
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
