---
date: 2014-05-26 08:17:34
title: "Jekyll: Front Matter Defaults"
---
Mit Jekyll 2 gibt es jetzt die Möglichkeit Standardwerte für’s YAML Front Matter in der Konfigurationsdatei festzulegen: [Front Matter Defaults](http://jekyllrb.com/docs/configuration/#frontmatter-defaults).

Statt mich im Front Matter immer wieder mit `layout: post` zu wiederholen, lege ich das jetzt in der _config.yml fest. Für was genau die Standardwerte gelten, kann man mit `path` und `type` einschränken. Lässt man die Angabe für den Pfad leer, so gilt sie für alle Dateien. Optional legt man noch die Art der Datei fest (`page`, `post` oder `draft`).


```
defaults:
  -
    scope:
      path: ""
    values:
      layout: "default"
  -
    scope:
      path: ""
      type: "post"
    values:
      layout: "post"
      category: "blog"
```

Hier lege ich für alle Dateien erst einmal das Standardlayout fest. Alle Beiträge sollen aber das Layout für Beiträge bekommen. Die zweite Hälfte ist spezifischer und überschreibt den Layout-Standard aus der ersten Hälfte.

Beachten sollte man, dass Angaben in Layout oder anderen Jekyll-Dateien die Front Matter Defaults überschreiben können.

Wie auch immer. Tolles Feature. Macht immer mehr Spaß mit Jekyll zu arbeiten.

__Update:__ [Jekyll 2.1.0](http://jekyllrb.com/news/2014/06/28/jekyll-turns-21-i-mean-2-1-0/) bringt ein paar Neuigkeiten mit. Bei `scope` lassen sich jetzt auch Collections verwenden. Außerdem kann man jetzt auch Kategorien als Standard festlegen.
