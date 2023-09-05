# test publishing

## Pomodoro Timer

Dieses Projekt implementiert einen Pomodoro-Timer, der Ihnen dabei hilft, effektiv zu arbeiten, indem er Arbeitsintervalle und Pausen verwaltet.

### Funktionen

- **Start:** Starten Sie den Timer, um eine 25-minütige Arbeitsperiode zu beginnen.
- **Pause:** Unterbrechen Sie den Timer, um eine Pause einzulegen.
- **Fortsetzen:** Setzen Sie den Timer nach einer Pause fort.
- **Große Pause:** Nach vier Arbeitsintervallen wird automatisch eine 30-minütige große Pause eingelegt.
- **Zurücksetzen:** Starten Sie den Timer neu.

### Anpassungen

Sie können die Arbeits- und Pausenzeit sowie den Sound, der am Ende eines Intervalls oder einer Pause abgespielt wird, in der JavaScript-Datei anpassen.

#### JavaScript-Code-Erklärung

Der JavaScript-Code in dieser Anwendung verfügt über folgende Schlüsselfunktionen:

- **Elementauswahl:** Zuerst werden alle wichtigen HTML-Elemente durch ihre IDs aus dem DOM (Document Object Model) geholt.

- **Timer-Logik:** Es gibt eine Funktion zum Starten des Timers, die die verbleibende Zeit in Sekunden zählt und die Timer-Anzeige aktualisiert. Der Timer verwendet ein Intervall, das alle 1000 Millisekunden (1 Sekunde) aktualisiert wird. Wenn die Zeit abgelaufen ist, wird eine Sounddatei (die Sie definieren können) abgespielt, und je nachdem, ob es sich um ein Arbeitsintervall oder eine große Pause handelt, wird die entsprechende Nachricht angezeigt.

- **Pausensteuerung:** Es gibt Funktionen zum Pausieren und Fortsetzen des Timers. Die Nachricht "Pause läuft..." wird angezeigt, wenn der Timer pausiert ist, und die ursprüngliche Nachricht wird angezeigt, wenn der Timer fortgesetzt wird.

- **Zurücksetzen:** Die Zurücksetzen-Funktion setzt den Timer und den Zähler zurück und zeigt die ursprüngliche Nachricht an.

- **Sound-Wiedergabe:** Es gibt auch eine Funktion, um Sounds abzuspielen, die Sie durch Hinzufügen einer Audio-Datei in den Projektordner definieren können.

### Verwendung

1. Klone dieses Repository oder laden Sie die Dateien herunter.
2. Öffnen Sie die `index.html`-Datei in Ihrem Webbrowser.
3. Klicken Sie auf "Start", um den Timer zu starten.
4. Verwenden Sie die Schaltflächen "Pause" und "Fortsetzen", um Pausen einzulegen und fortzusetzen.
5. Klicken Sie auf "Reset", um den Timer zurückzusetzen.

### Sound hinzufügen

Wenn Sie einen Sound hinzufügen möchten, legen Sie eine Audio-Datei in den Projektordner und geben Sie den Pfad in der JavaScript-Datei an.

### Autor

Dieses Projekt wurde erstellt von Melisa Damla Becid.

...
