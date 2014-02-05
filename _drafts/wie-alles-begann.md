---
layout: post
site-title: Wie alles begann
---
Mit [Jekyll](http://jekyllrb.com/) wird aus einem haufen verrückter Dateien ein neuer Haufen. Heraus kommt eine voll funktionsfähige, statische Website. Die funktioniert theoretisch sogar offline, wenn die Pfade ohne `/` beginnen und die Links in der Navigation angepasst werden.

Das ist großartig, denn mehr brauche ich nicht. Das Blog hat eine Paginierung. Beiträge kann ich bequem in [Markdown](http://daringfireball.net/projects/markdown/) schreiben. Anpassungen an der Seite muss ich nicht in einem Dutzend HTML-Dokumenten vornehmen, sondern lediglich in einem.

Mit einem `jekyll serve -w` in der Kommandozeile lässt sich das auch über einen lokalen Server testen. Ändert sich mein CSS oder eine Layoutdatei, dann seh ich das direkt im Browser. SASS wird beim Speichern von [Prepros](http://alphapixels.com/prepros/) mit [config.rb](http://github.com/kleinfreund/kleinfreund.github.io/blob/master/config.rb) als normale und als komprimierte CSS-Datei ausgegeben.
