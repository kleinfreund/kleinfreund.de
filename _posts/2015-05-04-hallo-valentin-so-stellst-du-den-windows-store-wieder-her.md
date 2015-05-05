---
date: 2015-05-04 22:58:13
title: "Hey Valentin, so stellst du den Windows Store wieder her"
tags:
- personal
---
Weil ich ein ganz sorgfältiger Vollprofi bin, habe ich deinen Laptop vor dem ersten Kontakt mit dir gründlich aufgeräumt. Dabei habe ich die ganze Müll-Software, die vorinstalliert war, deinstalliert. Weil ich so sorgfältig bin, habe ich auch gleich alles im Startmenü gelöscht, deinstalliert, verbrannt—was immer nötig war, um es los zu werden.

Jetzt vermisst du den Windows Store und die Mail App. Das kann ich zwar nicht verstehen, aber ich helfe dir trotzdem, sie wieder herzustellen.

Tue dies:

<ul>
    <li>
        Rechtsklicke auf den Desktop und erstelle mit <em>Neu &gt; Verknüpfung</em> eine neue Verknüpfung
    </li>
    <li>
        Als Speicherort gibst du folgendes ein und drückst <em>Weiter</em>:<br>
        <pre><code>ms-windows-store:</code></pre>
    </li>
    <li>
        Als Name kannst du eingeben, was du willst, auch <em>Philipp ist doof</em>, aber ein einfaches <em>Store</em> tut’s auch. Dann <em>Fertigstellen</em>.
    </li>
    <li>
        Auf die neue Verknüpfung rechtsklickst du nochmal und dann auf <em>Eigenschaften</em> und nun <em>Anderes Symbol</em>.
    </li>
    <li>
        In dem Textfeld, also da wo der verrückte Kram steht, löschst du alles und fügst stattdessen folgendes ein:<br>
        <pre><code>%SystemRoot%\WinStore\WinStoreUI.dll</code></pre>
    </li>
    <li>
        Nicht fragen, einfach machen: Zweimal <em>OK</em> drücken
    </li>
    <li>
        Jetzt drückst du <kbd>Win</kbd>+<kbd>R</kbd> und kopierst das da rein:<br>
        <pre><code>%programdata%\Microsoft\Windows\Start Menu\Programs</code></pre>
    </li>
    <li>
        Drücke auf <em>OK</em> und gehe wieder auf den Desktop
    </li>
    <li>
        Nun musst du die Verknüpfung auf dem Desktop ausschneiden. Das geht mit <kbd>Strg</kbd>+<kbd>X</kbd>.
    </li>
    <li>
        Anschließend gehst du in den Ordner, den du gerade aufgemacht hast. Dort drückst du <kbd>Strg</kbd>+<kbd>V</kbd>, um die Verknüpfung wieder einzufügen
    </li>
    <li>
        Schließlich kommt noch eine Meldung, die du mit <em>Fortsetzen</em> bestätigst
    </li>
</ul>

Wenn du jetzt die Windowstaste (<kbd>Win</kbd>) drückst müsste da irgendwo die Verknüpfung zum Windows Store sein. Rechtsklick darauf und _An „Start“ anheften_ wählen. Jetzt hast du im Startmenü wieder die Windows Store-Kachel. Von da aus kannst du den anderen Krempel wieder herunterladen.

<p>Siehst du, war doch ganz einfach. <q>Und Piggeldy ging mit Frederick nach Hause</q>.</p>
