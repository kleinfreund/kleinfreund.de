---
layout: post--portfolio
title: "Website: bbk-vogtland.de"
permalink: /de/portfolio/bbk-vogtland/
---
Der Verein [Bund Bildender Künstler Vogtland e.V.](http://bbk-vogtland.de/) bekam ein Redesign. Das Ergebnis ist eine schlanke, statische Seite.

![BBK Vogtland Startseite](/img/bbk-vogtland/bbk-vogtland-1.jpg)

Nur die Mitgliederseite bedarf etwas jQuery, um die entsprechenden Informationen anzuzeigen.

![BBK Vogtland Mitgliederseite](/img/bbk-vogtland/bbk-vogtland-2.jpg)

Der komplizierte Teil war die Animation mit der CSS3-Eigenschaft `transition`, da die einzelnen Boxen unterschiedlich hoch sind. Statt zu `height: auto;` zu animieren, muss man auf `max-height` zurückgreifen. Nicht optimal, funktioniert aber.

![BBK Vogtland Detailansicht der Mitglieder](/img/bbk-vogtland/bbk-vogtland-3.jpg)
