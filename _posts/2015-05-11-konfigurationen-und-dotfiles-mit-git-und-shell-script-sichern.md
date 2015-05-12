---
date: 2015-05-11 13:12:44
title: "Konfigurationen und Dotfiles mit Git und Shell-Script sichern"
tags:
- dev
---
Vor ein paar Monaten ist mir die Festplatte meines vorherigen Laptops kaputt gegangen, aber ich konnte auf einer Ubuntu-Partition weiter machen, die ich für solche Fälle vorbereitet hatte. Zum Glück hatte ich auch alle wichtigen Konfigurationsdateien von Dingen wie Sublime Text in einem [Git-Repository](https://github.com/kleinfreund/dotfiles) gespeichert. An dem Punkt wollte ich den Prozess des manuellen Kopierens der einzelnen Dateien aus den verteilten Verzeichnissen vereinfachen. Ich habe ein kleines Shell-Script für dieses Vorhaben geschrieben.

Denkt daran, dass das Script an meine persönlichen Wünsche und an die Software angepasst ist, die ich benutze. Es sollte bei euch auch laufen, aber ich habe nichts außer meinen eigenen Umgebungen getestet.

## Was macht das Script?

Das Script sollte im Verzeichnis des Repositories ausgeführt werden, das die verschiedenen Dateien enthalten soll. Deshalb überprüft es zuerst, ob es innerhalb eines Git-Repositories läuft und ob ein .git-Verzeichnis da ist. DDann müssten wir uns nämlich im Wurzelverzeichnis des Repositories befinden.

```bash
if [[ ! -d .git ]] || ! git rev-parse --git-dir > /dev/null 2>&1; then
    echo "Not a git repository."
    exit 1
fi
```

Jetzt versuche ich zu erkennen, um welches Betriebssystem es sich handelt. Das mache ich, weil ich die Dateien verschiedener Betriebssysteme getrennt ablege. Das ist nicht unbedingt notwendig und vielleicht sogar eine Erschwerung des Ganzen, aber ich will hier auf Nummer sicher gehen. Den Pfadschnipsel für das Betriebssystem speichere ich in der Variable `OS`. Außerdem speicher ich mir noch den Ort der Konfigurationsdateien für Sublime Text. Anders als der Standardort für Dotfiles, unterscheiden sich hier die Pfade von System zu System.

Danach erstelle ich Verzeichnisse für jedes Tool innerhalb des Repositories. Für Bash-Dateien von Ubuntu zum Beispiel würde ich Kopien in `${REPO_PATH}linux/bash/` ablegen. Schließlich führe ich `cp`-Kommandos für jede Datei aus. Hier muss ich für Sublime Text nochmal überprüfen, um welches OS es sich gerade handelt, da die Dateien für die keybindings jeweils anders benannt sind (z.B. `Default (Linux).sublime-keymap`). Das war’s, `echo "Completed."`.

## Mögliche Probleme

Das Script nimmt an, wo sich die einzelnen Dateien befinden sollten. Diese Information beruht im wesentlichen auf meinen Erfahrungen und den aktuellen Bedingungen auf meinem System. Das kann bei anderen oder zukünftigen Umgebungen wieder ganz anders aussehen. Ich weiß jedenfalls gerade von keinem verlässlicheren Weg, die richtigen Pfade zu bestimmen. Macht auch nichts.

Was auch richtig nützlich wäre, ist eine Map. Bash in Version 4 hat Associative Arrays, aber Git Bash kommt mit Version 3. Ich habe keine Ahnung, ob ein zukünfiger Git-Installer (der _immer noch_ nur bei 1.9.5 für Windows rumhängt) vielleicht eine aktuellere Version mitbringt. Bis dahin lass ich das erstmal sein, um die Kompatibilität mit Windows zu gewährleisten.
