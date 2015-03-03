---
date: 2015-02-24 13:00:03
title: "Der Frühling kommt"
tags:
- dev
- jekyll
---
Es ist mal wieder soweit. Nicht nur der Frühling ist fast da, sondern auch ein neues Jahr für das Blog. Der erste Beitrag ist vom 1. Februar 2014. Heute ist garnicht der 1. Februar? Da hast du natürlich vollkommen Recht. Das macht ja aber auch nichts, oder? In den letzten Tagen habe ich hier und da ein paar Schrauben fest gezogen oder gelockert.

## Subdomain aus Performance-Gründen

Die wichtigste Änderung ist der Umzug auf eine Subdomain. Schaut doch mal, da oben steht jetzt __hey.kleinfreund.de__. Das hat ganz pragmatische Gründe. Zeigt man nämlich mit der Root-Domain (kleinfreund.de) per A Record auf die GitHub Pages-IP, wird man weitergeleitet. Das ist Teil der DDoS-Mitigation-Strategie, die die Mädels und Jungs dort fahren (Anselm Hannemann hat das letztes Jahr <a href="https://helloanselm.com/2014/github-pages-redirect-performance/">aufgeschrieben</a>).

Bei mir hat das Weiterleitern 3–5 Sekunden gedauert und das ist viel zu lange. Schweren Herzens wollte ich also die typische www.-Subdomain einrichten, bis mir dann eingefallen ist, dass man sich auch etwas anderes ausdenken kann. Anatol Broder hat sich drüben zum Beispiel für <a href="http://anatol.penibelst.de/">anatol.penibelst.de</a> entschieden.

## Kritisches CSS

Zur Zeit experimentiere ich damit, mein komplettes Stylesheet in den `head` zu stecken. Im Moment sind das 7,3 KB. Damit spare ich mir den HTTP-Request und das Rendern ist auch nicht durch das externe Stylesheet blockiert. Im Gegenzug ist das Ganze auch nicht mehr cachebar, da das Stylesheet ja jetzt im HTML liegt.

Dadurch ist leider die Build-Zeit von Jekyll um 6–7 Sekunden nach oben gegangen. Das liegt daran, dass die `sassify`- bzw. `scssify`-Filter offenbar nicht das Sass-Cache nutzen. Abhilfe dafür kann ich mir zumindest lokal mit <a href="https://talk.jekyllrb.com/t/is-capture-slow-or-are-my-build-times-normal/32/4">dem Tipp</a> von envygeeks im neuen Jekyll-Forum schaffen.

{% raw %}
```liquid
{% if jekyll.environment == 'local' %}
    <link rel="stylesheet" href="{{ site.assets.css }}kleinfreund.css">
{% else %}
    <style>
        {% capture scss_include %}
            {% include kleinfreund.scss %}
        {% endcapture %}

        {{ scss_include | scssify }}
    </style>
{% endif %}
```
{% endraw %}

## Unter der Haube

Bisher gab es ein paar Seiten, die gleich aufgebaut waren und sich nur durch Sprachschnippsel unterschieden haben. Heißt also, dass ich zu faul war dafür ein Layout anzulegen und entsprechende Strings in der locales.yml zu hinterlegen. Das habe ich jetzt nachgeholt.

Weiterhin habe ich eigentlich einen Artikel darüber geschrieben, wie ich die Website meiner Eltern von Wordpress nach Jekyll umgezogen habe. Der ist aber nicht mehr zugänglich, da sich kürzlich meine Windows-Partition verabschiedet hat. Ich arbeite zur Zeit auf den verbleibenden 50 GB, die ich zum Glück vor ein paar Monaten mit Ubuntu bestückt hatte.
