---
layout: post--portfolio
title: "Website: bbk-vogtland.de"
permalink: /en/portfolio/bbk-vogtland/
---
The local society [Bund Bildender Künstler Vogtland e.V.](http://bbk-vogtland.de/) got a redesign. The result is a light, static site.

![BBK Vogtland homepage](/img/bbk-vogtland/bbk-vogtland-1.jpg)

Only the members page involves a bit jQuery to reveal the member information.

![BBK Vogtland members page](/img/bbk-vogtland/bbk-vogtland-2.jpg)

The tricky part was using the CSS3 `transition` property, because the boxes for the detail view vary in height. Instead of transitioning to `height: auto;` one needs to use `max-height`. Not optimal, but it works.

![BBK Vogtland detail view for members page](/img/bbk-vogtland/bbk-vogtland-3.jpg)
