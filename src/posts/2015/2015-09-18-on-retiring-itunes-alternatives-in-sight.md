---
title: On Retiring iTunes – Alternatives in Sight?
date: 2015-09-18
tags:
- music
---
iTunes has been and still is an invaluable piece of software for me. Compared to any other music player I’ve seen it has by far the best user interface. It looks nice. After the last update, I wasn’t able to start iTunes anymore. I worked around this by plugging in my iPod which opened iTunes just fine. A couple of days later I figured it out. The shortcut in the task bar was broken and I replaced it. Phew.

<figure>
  <img src="/img/posts/on-retiring-itunes-1.jpg" alt="Image of iTunes’ album view showing the atworks, album title and album artists.">
  <figcaption>iTunes’ album view</figcaption>
</figure>

However while iTunes didn’t start properly, I played with the idea of retiring iTunes with another player. So what do I really need, what are the mandatory features my new music playing and managing application should offer? I want a proper album view sorted by album artists. iTunes almost does it perfectly but it’s really damn slow on Windows to the point where you do not want to use it. It lets you type letters and jumps to album artists starting with that letter. There is another caveat: Accidentally hitting the album title or artist name will instead toggle renaming. This should not happen.

A no-brainer, but the player needs to be able to handle ID3 meta tags properly. This means it needs to read and write ID3 v2.4 (iTunes reads and writes version 2.2–2.4). Especially important is the understanding of the album artist field, which plays a dominant role in my collection. The obvious area of application are albums by multiple artists and compilations. Almost no Android media player handles that correctly. The iOS music app is one of the few mobile application that does it correctly. On Android, [doubleTwist](https://play.google.com/store/apps/details?id=com.doubleTwist.androidPlayer&hl=en) does the job as well, although it doesn’t have the ability to sort by album artist directly, only artist or album. Since I’m using an iPod Touch when I’m outside, this is not a problem for me.

The reason why the handling of album artists is so important to me is simple: I have a lot of tracks (around 800) that are not part of an album or compilation. For these tracks I set the album artist field to `Various Artists`. Now when I simply sort any view by artist, every artist of my single tracks will show up. This is no good. However sorting by album artist solves this problem, because from previously hundreds of additional artists in my list this is cut down to one: Various Artists. Same rule applies to mixtapes.

### Zukunftsmusik – A Pie in the Sky

There is something that is not handled properly by any software I know: Multiple artists. It’s common practice to drop the additional artist(s) in parenthesis behind the title (i.e. `Gorillaz – Empire Ants (feat. Little Dragon)`).

This results in a title field that holds the title plus additional artists. My preferred way would be setting multiple artist fields and using the album artist as the field for the album artist. Most applications won’t offer an arbitrary number of artist fields. My current workaround is putting the artists in one field and separating with a `/` character (i.e. `Gorillaz/Little Dragon – Empire Ants`).

Now this is useful not only because it has a clear structure, but also there is no trouble when dealing with remixes or covers by multiple artists. One day, music players are hopefully able to specify and handle multiple artists. Back to topic. Let’s have a look at some actual players.

### Media Monkey

When [downloading Media Monkey](http://www.mediamonkey.com/download/), the website looks like it wants to scam you. I went with the free version anyway.

<figure>
  <img src="/img/posts/on-retiring-itunes-2.jpg" alt="The screenshot shows the Media Monkey website which offers you a deal to get the software for free. Looks suspicious.">
  <figcaption><q>By clicking the button above, I agree with TrialPay's User Agreement and Privacy Policy.</q><br>Yeah, I completely trust you.</figcaption>
</figure>

Media Monkey is a somewhat big name and has many features. It understands album artists and allows sorting by them in the album view. A small drawback is that the albums are alphabetically grouped. Couldn’t find a setting that would disable this.

<figure>
  <img src="/img/posts/on-retiring-itunes-3.jpg" alt="Sceenshot of Media Monkeys album view showing the atworks, album title and album artists.">
  <figcaption>Media Monkeys album view</figcaption>
</figure>

I’m not a fan of the appearance of Media Monkey. The skins look stale, they have the typical 2005-ish music player look to them. Why is the text in the album view underlined? What’s up with these control elements in the bottom left corner? Alright, what’s next?

### Tomahawk

Fancy-shmancy [website](https://www.tomahawk-player.org/) with very little information on what the features are. But have you seen the logo? That’s a good-looking and simple logo right there. Nice.

<figure>
  <img src="/img/posts/on-retiring-itunes-4.jpg" alt="Sceenshot of Tomahawks collection view. Overall good-looking with artwork, artist and album title.">
  <figcaption>View of my collection in Tomahawk</figcaption>
</figure>

Tomahawk is the best-looking player of the ones I tried, although it seems to have some issues with the font on Windows. This player is very different. It directly integrates the ability to use services like SoundCloud. I searched for some Fusion Live Sets which worked good. By right-clicking the title you can even copy a link to the set. Atleast that’s what the label promised. The link opens a [custom website](http://toma.hk/c56laaab) which offers all sorts of sharing and allows playing. But folks, I want the freakin’ direct link to the SoundCloud website. That’s not helpful. My roommate suggested clicking the tiny SoundCloud icon instead which takes you to the SoundCloud page.

Sadly, the player is not good at anything besides the overall appearance. The current version has very poor handling of local files. Some files, it just won’t play. Sometimes even whole albums are not playable with the message that it “couldn’t find the file”. This is a [known issue](https://twitter.com/tomahawk/status/644139564995616768) and should be fixed in version 0.9. Also a lot of album covers are not displayed (they’re correctly saved in the files, all other players can display them).

The metadata editing capability is also very lackluster. It allows changing title, artist, album, track number and year. Extra bad: The release year 2014 is shown as 1900 in Tomahawk. Upon further investigation, every file shows the year 1900. What?

Also, closing Tomahawk is not closing Tomahawk. I hate when applications on Windows do that. I’m looking at you, Skype (Skype, a product owned by the very same company who makes the operating system. Argh!). Up next we’re looking at Helium Music Manager.

### Helium Music Manager

Very similar to Media Monkey from the look’n’feel perspective. You can [get it here](http://www.helium-music-manager.com/download/). The website is informative and well structured. Since it is so similar to Media Monkey, I’ll skip the parts that did not change.

It looks like Helium is able to customize the album view further, but only when buying the premium version. Using the album view with album thumbnails is very annoying here, because one scroll step is about 600 pixels or three full rows of albums.

<figure>
  <img src="/img/posts/on-retiring-itunes-5.jpg" alt="Sceenshot of Heliums library view.">
  <figcaption>My library displayed with album thumbnails</figcaption>
</figure>

Another downside is that you’re not able to display all all album artists via the music explorer at once. You need to pick a starting letter. Working around this is possible by going to *Entire library* and sorting by artist which actually seems to sort by album artists instead. Maybe these features are only available in the premium version as well. More on the premium topic in a bit. Just let me tell you real quick what else I tried.

### Other players

I tried [Winamp](http://www.winamp.com/) – for the sake of the good ol’ days – but, oh well, this thing is seriously dead. A couple of months ago, I gave [foobar2000](http://www.foobar2000.org/) a try. It was a mess to be honest. It’s highly customizable packed full with features, but I couldn’t figure out how to achieve what I wanted.

If you can suggest other good alternatives, write me on [Twitter](https://twitter.com/kleinfreund). Or write your own article. Did you switch to streaming entirely, yet? What are you doing with your music?

### Premium

Now paying for music software is definitely worth considering when you have the same high demands as I do. I love to pay for an application if it’s worth it. However, if there is no way to test the premium version before paying, how am I supposed to decide whether it fits my needs? As far as I can tell, Helium does not offer such a test version, which is kinda sad. I don’t need any of the Media Monkey features, so I would only buy the gold version, if I was really using it.

### Résumé

I am not retiring iTunes for now. It served me well, although it has many quirks and – oh boy – is the media information window broken on Windows. Just to give you an idea of what I have to deal with when tagging files in iTunes:

<figure>
  <img src="/img/posts/on-retiring-itunes-6.jpg" alt="An illustrated sceenshot of the media information window in iTunes showing the broken tabbing order: 1, 3, 2, 5, 4, 7, 6, 9, 8, 10, 12, 13, 11, 14, 15, 17, 16, 18">
  <figcaption>iTunes’ tabbing order in the media information window is bonkers</figcaption>
</figure>

Anyways, I’ve gotten used to it. Maybe OS X folks have a better experience, because the software is tested more intensively on their own platform.

Let me know if you find articles like this useful. Bye, folks.
