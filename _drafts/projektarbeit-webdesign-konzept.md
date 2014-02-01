---
layout: post
site-title: "Projektarbeit Webdesign: Konzept"
---
Diese Seite entstand im Rahmen des Abschlussprojekts im Fach Webdesign. Die Aufgabenstellung war genau die gleiche, die ich schon seit langem auf die lange Bank geschoben hatte. Eine eigene Website. __Also los.__

Das war die Gelegenheit, mich intensiver mit ein paar Dingen zu beschäftigen. Ich bin vermutlich der letzte, der auf den [SASS](http://sass-lang.com)-Zug aufspringt. Bei der Gelegenheit habe ich mit Harry Roberts' [inuitcss](http://inuitcss.com) gearbeitet.

Kurz danach war der Entschluss getroffen, die Seite auf [GitHub Pages](http://pages.github.com/) zu hosten. Eine Domain habe ich auch gleich noch registriert. Wo ich schon mal dabei war, alles auf den Kopf zu stellen, wurde kurzerhand noch [Jekyll](http://jekyllrb.com/) integriert.

## Struktur

Maßgabe für die Umsetzung des Projekts war eine saubere Verzeichnisstruktur. Im Hauptverzeichnis befinden sich `index.html` und `404.html`, sowie das Favicon (`icon.png`). Weiterhin liegen noch folgende Dateien dort: `robots.txt`, `feed.xml` und `sitemap.xml`.

Die Startseite ist gleichzeitig ein Blog. Die Artikel liegen in jahres- und monatsbasierten Verzeichnissen (`/2014/01` für Januar 2014).

Die Bilder zu den Artikel liegen in gleichnamigen Verzeichnissen innerhalb von `/img` (z.B. `/img/landscapes`). Im Bilder-Verzeichnis ist auch das Logo (`kleinfreund.svg` und `kleinfreund.png`), sowie ein Foto von mir (`ich.jpg`) für das Profil.

Im Verzeichnis `/fonts` liegen die Schnitte der [Ubuntu-Schrift](http://google.com/fonts/specimen/Ubuntu). Um eine gewisse Kompatibilität für die alten Internet Explorers zu gewährleisten ist der so genannte [HTML5 Shiv](https://code.google.com/p/html5shiv/) in ebenfalls komprimierte Fassung im Verzeichnis `/js` hinterlegt.

Unter `/css` findet man die Stylesheets der Seite. Dabei ist die `kleinfreund.css` die unkomprimierte und damit lesbare Version. Auf der Seite wird aber die komprimierte `kleinfreund.min.css` eingebunden. Bei dieser fehlen sämtlich überflüssigen Weißzeichen, Kommentare etc.

```
.
├── 2014
|   ├── 01
|   |   └── article
|   └── 02
|       └── article
├── css
|   ├── kleinfreund.min.css
|   └── kleinfreund.css
├── fonts
|   ├── license.txt
|   ├── ubuntu-light.ttf
|   ├── ubuntu-lightitalic.ttf
|   └── ubuntu-medium.ttf
├── img
|   ├── article
|   |   └── article-image.jpg
|   ├── ich.jpg
|   ├── kleinfreund.png
|   └── kleinfreund.svg
├── js
|   └── html5shiv.js
├── portfolio
|   └── index.html
├── profil
|   └── index.html
├── impressum
|   └── index.html
├── index.html
├── 404.html
├── robots.txt
├── sitemap.xml
├── feed.xml
└── icon.png
```

## Konzeption und Sitemap

Meine Website ist in vier Seiten aufgeteilt, die sich direkt in der Navigation widerspiegeln. Dabei ist die Startseite ein __Blog__. Die anderen drei Seiten sind __Portfolio__, __Profil__ und __Impressum__.

Besonderheit ist, dass jede dieser vier Seiten ein eigenes Farbschema besitzt. Auch dieser Aspekt wird von der Navigation aufgegriffen.

### Seitenkopf

Der Seitenkopf ist eine Einheit, die auf der Website immer wiederkehrt und gleich aufgebaut ist. Das Logo ist linkerhand platziert. Darunter auf der rechten Seite befindet sich die Navigation. Zudem schließt dieser Bereich mit einem Rahmen in entsprechender Farbe ab.

### Hauptinhalt

Nur auf Hauptseiten folgt dem Kopfbereich eine Überschrift, der sich auf die jeweilige Seite bezieht (z.B. bei Profil: _Etwas Persönlichkeit_). Dieser trägt ebenfalls das farbliche Thema in Form der Hintergrundfarbe.

Auf den Unterseiten der jeweiligen Hauptseiten wird allerdings keine weitere Überschrift angezeigt. Das Farbthema ist aber natürlich ebenfalls vorhanden.

Der Spalte für den Hauptinhalt auf jeder Seite ist so angelegt, dass eine optimale Lesbarkeit gewährleistet ist. Eine typografische Regel dafür lautet, dass zwischen 55 und 75 Zeichen auf einer Zeile Platz finden sollen. Leerzeichen mit eingerechnet. Nicht mehr und nicht weniger.

Als Schriftgröße für Fließtext habe ich mich für 20 px entschieden. Ich bin gegen lächerlich kleine Schrift auf Websites. Im Grunde erhält die ganze Website ein durch und durch klares Design.

Spezielle Auszeichnungen innerhalb des Textes entsprechen dem Farbschema. Das betrifft u.a. Links, Überschriften und Code-Schnipsel. Die Website verzichtet auf besonders auffällige Animationen und Hovereffekte. Links erhalten beim `:hover`-Zustand eine Rahmenlinie darunter.

### Seitenfuß

Abschließend befindet auf jeder Seite ganz unten der Seitenfuß. Darin lediglich Angaben wie Autor und verwendete Tools.

### Sitemap

```
.
├── Blog
|   ├── 2014/01/article
|   └── 2014/02/article
├── Portfolio
|   ├── Website: artrudloff.de
|   ├── Geschäftspapier: RUDELOVE
|   ├── Neujahrs-Typografie
|   ├── Piktogramme
|   ├── Landscapes
|   └── Studioporträts: Martin & Phil
├── Profil
├── Impressum
└── Fehler 404
```
