// Zuerst werden alle wichtigen HTML-Elemente durch ihre IDs aus dem DOM (Document Object Model) geholt.
const timerDisplay = document.getElementById("timer");
const startButton = document.getElementById("startButton");
const resetButton = document.getElementById("resetButton");
const pauseButton = document.getElementById("pauseButton");
const continueButton = document.getElementById("continueButton");
const messageDisplay = document.getElementById("message");

// Initialisierung von Variablen für den Timer und den Status
let pomodoroCount = 0; // Ein Zähler für abgeschlossene Pomodoro-Einheiten
let timeLeft = 1500; // Die verbleibende Zeit in Sekunden (Standard-Pomodoro: 25 Minuten)
let timerInterval; // Eine Variable zur Speicherung des Timer-Intervalls
let isPaused = false; // Ein Status, um zu überprüfen, ob der Timer pausiert ist
let originalMessage = "Pomodoro-Modus: 25 Minuten konzentriert arbeiten!"; // Die ursprüngliche Nachricht speichern

// Eine Funktion zum Aktualisieren der Timer-Anzeige (Minuten und Sekunden)
function updateTimer() {
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  timerDisplay.textContent = `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
}

// Eine Funktion zum Anzeigen von Nachrichten im Timer
function showMessage(message) {
  messageDisplay.textContent = message;
}

// Die Funktion zum Starten des Timers
function startTimer() {
  clearInterval(timerInterval); // Zuerst wird das aktuelle Timer-Intervall gelöscht
  timerInterval = setInterval(() => {
    // Dann wird ein neues Intervall gestartet
    if (!isPaused) {
      // Der Timer läuft nur, wenn er nicht pausiert ist
      if (timeLeft > 0) {
        timeLeft--;
        updateTimer();
      } else {
        // Wenn die Zeit abgelaufen ist
        clearInterval(timerInterval); // Das Intervall wird gelöscht
        playSound(); // Hier könnte man Code zum Abspielen eines Sounds einfügen
        pomodoroCount++; // Der Pomodoro-Zähler wird erhöht
        if (pomodoroCount % 4 === 0) {
          // Wenn ein Pomodoro-Zyklus abgeschlossen ist
          showMessage("Große Pause. Zeit für eine Pause!"); // Die Nachricht für die große Pause wird angezeigt
          timeLeft = 1500; // Die Zeit wird auf 25 Minuten für die große Pause zurückgesetzt
        } else {
          // Wenn ein Arbeitsintervall abgeschlossen ist
          showMessage("Arbeitsintervall abgeschlossen. Zeit für eine Pause!"); // Die Nachricht für die Pomodoro-Pause wird angezeigt
          timeLeft = 300; // Die Zeit wird auf 5 Minuten für die Pause zurückgesetzt
        }
        updateTimer(); // Die Timer-Anzeige wird aktualisiert
        startTimer(); // Der Timer wird erneut gestartet, um die Pause zu beginnen
      }
    }
  }, 1000); // Das Intervall wird alle 1000 Millisekunden (1 Sekunde) aktualisiert
}

// Die Funktion zum Pausieren des Timers
function pauseTimer() {
  isPaused = true; // Der Status wird auf pausiert gesetzt
  showMessage("Pause läuft..."); // Die Nachricht "Pause läuft..." wird angezeigt
}

// Die Funktion zum Fortsetzen des Timers
function continueTimer() {
  isPaused = false; // Der Status wird auf nicht pausiert gesetzt
  if (pomodoroCount % 4 === 0) {
    showMessage(originalMessage); // Wenn es eine große Pause ist, wird die ursprüngliche Nachricht angezeigt
  } else {
    showMessage("Arbeitsintervall abgeschlossen. Zeit für eine Pause!"); // Ansonsten wird die Nachricht für das Pomodoro-Intervall angezeigt
  }
}

// Die Funktion zum Zurücksetzen des Timers
function resetTimer() {
  clearInterval(timerInterval); // Das Timer-Intervall wird gelöscht
  pomodoroCount = 0; // Der Pomodoro-Zähler wird zurückgesetzt
  timeLeft = 1500; // Die Zeit wird auf 25 Minuten (Standard-Pomodoro) zurückgesetzt
  updateTimer(); // Die Timer-Anzeige wird aktualisiert
  isPaused = false; // Der Status wird auf nicht pausiert gesetzt
  showMessage(""); // Die Nachricht wird gelöscht
  startButton.style.display = "inline"; // Der Start-Button wird angezeigt
  continueButton.style.display = "inline"; // Der Weiter-Button wird angezeigt
  pauseButton.style.display = "inline"; // Der Pause-Button wird angezeigt
}

// Eine Funktion zum Abspielen von Sounds könnte hier ergänzt werden

// Event-Listener für die Buttons
startButton.addEventListener("click", () => {
  startTimer(); // Der Timer wird gestartet
  showMessage(originalMessage); // Die ursprüngliche Nachricht wird angezeigt
  startButton.style.display = "none"; // Der Start-Button wird versteckt
  continueButton.style.display = "none"; // Der Weiter-Button wird versteckt
  pauseButton.style.display = "inline"; // Der Pause-Button wird angezeigt
});

pauseButton.addEventListener("click", () => {
  pauseTimer(); // Der Timer wird pausiert
  pauseButton.style.display = "none"; // Der Pause-Button wird versteckt
  continueButton.style.display = "inline"; // Der Weiter-Button wird angezeigt
});

continueButton.addEventListener("click", () => {
  continueTimer(); // Der Timer wird fortgesetzt
  continueButton.style.display = "none"; // Der Weiter-Button wird versteckt
  pauseButton.style.display = "inline"; // Der Pause-Button wird angezeigt
});

resetButton.addEventListener("click", resetTimer); // Der Timer wird zurückgesetzt
