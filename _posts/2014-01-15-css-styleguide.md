---
date: 2014-01-15 12:57:05
layout: post
title: CSS Styleguide
---
Das ist mein persönliches CSS Styleguide.

<h3 class=entry__heading>Benennung</h3>

* Alles ist klein geschrieben
* ID und Klassennamen werden durch Bindestriche getrennt (außer bei BEM-Syntax)
* BEM wird nur verwendet, wenn es echten Mehrwert bietet
* Benennung erfolgt so kurz wie möglich, aber so lang wie nötig<br>
z.B. `site-nav` statt `site-navigation`

<h3 class=entry__heading>Code</h3>

* Eine Deklaration pro Zeile
* Einrückung um 4 Leerzeichen (keine Tabs)
* Keine abschließenden Leerzeichen
* Jede Eigenschafts-Deklaration wird mit mit einem `;` beendet
* Ein Leerzeichen zwischen Selektor und `{`
* Ein Leerzeichen nach dem `:` in Eigenschafts-Deklarationen

```
[selector] {
    [property]: [value];
}
```

Eigenschaften und Werte mit Vendor-Prefix werden passend angeordnet. Das ist einfach eine Frage der Übersichtlichkeit. Man erkennt auf einen Blick, wo man sich bei einem Wert vertippt hat.

```
*, *:before, *:after {
    -webkit-box-sizing: border-box;
       -moz-box-sizing: border-box;
            box-sizing: border-box;
}
```

Benutze hex-basierte Farbwerte statt `rgb()`. Außerdem kurze Farbwerte wie `#f60` statt `#ff6600`. Ähnliche Tag-Selektoren werden gruppiert auf eine Zeile geschrieben, wenn es sich anbietet.

```
h1, h2, h3, h4, h5, h6 {
    color: #f60;
}
```

__Randnotiz:__ Weil man sich beim Schreiben eines solchen Artikels auf Deutsch ziemlich lächerlich vorkommt, gibt's hier noch die [englischsprachige Variante](http://github.com/kleinfreund/kleinfreund.github.io/blob/master/posts/2014-01-12-css-styleguide.md) auf GitHub.