const timerDisplay = document.getElementById("timer");
const startButton = document.getElementById("startButton");
const resetButton = document.getElementById("resetButton");
const pauseButton = document.getElementById("pauseButton");
const continueButton = document.getElementById("continueButton");
const messageDisplay = document.getElementById("message");

let pomodoroCount = 0;
let timeLeft = 1500; // 25 Minuten in Sekunden (Standard-Pomodoro)
let timerInterval;
let isPaused = false;
let originalMessage = "Pomodoro-Modus: 25 Minuten konzentriert arbeiten!"; // Speichern der ursprünglichen Nachricht

function updateTimer() {
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  timerDisplay.textContent = `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
}

function showMessage(message) {
  messageDisplay.textContent = message;
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
          showMessage("Große Pause. Zeit für eine Pause!");
          timeLeft = 1500; // 25 Minuten für die große Pause
        } else {
          showMessage("Arbeitsintervall abgeschlossen. Zeit für eine Pause!");
          timeLeft = 300; // 5 Minuten Pause
        }
        updateTimer();
        startTimer();
      }
    }
  }, 1000);
}

function pauseTimer() {
  isPaused = true;
  showMessage("Pause läuft...");
}

function continueTimer() {
  isPaused = false;
  if (pomodoroCount % 4 === 0) {
    showMessage(originalMessage); // Zeige die ursprüngliche Nachricht für Große Pause
  } else {
    showMessage("Arbeitsintervall abgeschlossen. Zeit für eine Pause!"); // Zeige die Nachricht für Pomodoro-Pause
  }
}

function resetTimer() {
  clearInterval(timerInterval);
  pomodoroCount = 0;
  timeLeft = 1500; // Zurücksetzen auf 25 Minuten (Standard-Pomodoro)
  updateTimer();
  isPaused = false;
  showMessage("");
  startButton.style.display = "inline"; // Zeige den Start-Button
  continueButton.style.display = "inline"; // Zeige den Weiter-Button
  pauseButton.style.display = "inline"; // Zeige den Pause-Button
}

function playSound() {
  // Hier kannst du den Code zum Abspielen eines Sounds einfügen
}

startButton.addEventListener("click", () => {
  startTimer();
  showMessage(originalMessage);
  startButton.style.display = "none"; // Verstecke den Start-Button
  continueButton.style.display = "none"; // Verstecke den Weiter-Button
  pauseButton.style.display = "inline"; // Zeige den Pause-Button
});

pauseButton.addEventListener("click", () => {
  pauseTimer();
  pauseButton.style.display = "none"; // Verstecke den Pause-Button
  continueButton.style.display = "inline"; // Zeige den Weiter-Button
});

continueButton.addEventListener("click", () => {
  continueTimer();
  continueButton.style.display = "none"; // Verstecke den Weiter-Button
  pauseButton.style.display = "inline"; // Zeige den Pause-Button
});

resetButton.addEventListener("click", resetTimer);
