---
layout: post
site-title: CSS Styleguide
---
Das ist mein persönlicher CSS Styleguide. Alle Angaben ohne Gewähr. Ihr könnt das meinetwegen ganz anders handhaben. Vielleicht hilft euch ja doch das eine oder andere Detail.

Im übrigen schaue ich mir sowas auch gerne von anderen an und lasse mich inspirieren. Schickt mir das doch per <a href="http://twitter.com/kleinfreund">Twitter</a>, wenn ihr mögt.

## Benennung

* Alles ist klein geschrieben
* ID und Klassennamen werden durch Bindestriche getrennt<br>
z.B. `post-list` statt `postList`
* BEM wird nur verwendet, wenn es echten Mehrwert bietet<br>
Syntax: `block__element--modifier`
* Benennung erfolgt so kurz wie möglich, aber so lang wie nötig<br>
z.B. `site-nav` statt `site-navigation`

## Code

* Eine Deklaration pro Zeile
* Einrückung um 4 Leerzeichen (keine Tabs)
* Keine abschließenden Leerzeichen
* Jede Eigenschafts-Deklaration wird mit mit einem `;` beendet
* Ein Leerzeichen zwischen Selektor und `{` in Regelblöcken
* Ein Leerzeichen nach dem `:` in Eigenschafts-Deklarationen

```
[selector] {
    [property]: [value];
}
```

Eigenschaften und Werte mit Vendor-Prefix werden passend angeordnet. Das ist einfach eine Frage der Übersichtlichkeit. Man erkennt auf einen Blick, wo man sich bei einem Wert vertippt hat. Kann ich nur empfehlen.

```
*, *:before, *:after {
    -webkit-box-sizing: border-box;
       -moz-box-sizing: border-box;
            box-sizing: border-box;
}
```

Benutze hex-basierte Farbwerte statt `rgb()`. Wenn ihr `rgba()` braucht ist das natürlich etwas anderes. Außerdem kurze Farbwerte wie `#f60` statt `#ff6600`. Das spart einfach Tastenanschläge. Denkt dran, eure Tastatur ist ein Verschleißteil.

Ähnliche Tag-Selektoren werden gruppiert auf eine Zeile geschrieben, wenn es sich anbietet. Tut euch den Gefallen und spart da nicht an Leerzeichen. Denkt doch mal einer an die Übersicht. Am Ende könnt ihr soviel weg minifizieren, wie ihr wollt.

```
h1, h2, h3, h4, h5, h6 {
    color: #f60;
}
```

__Randnotiz:__ Weil man sich beim Schreiben eines solchen Artikels auf Deutsch ziemlich lächerlich vorkommt, gibt's hier noch die [englischsprachige Variante](https://github.com/kleinfreund/kleinfreund.github.io/blob/master/_drafts/css-styleguide.md) auf GitHub.