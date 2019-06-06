---
title: Uberspace with multiple domains
date: 2016-04-15
tags:
- dev
---
A couple of months back I got myself a new hoster, [Uberspace](https://uberspace.de/). I moved my sites to HTTPS, got rid of that subdomain (hey.kleinfreund.de) and setup a mail address. Here I explain the first part: Setting up multiple domains with Uberspace.

<!--more-->

The following information are partially adapted from [Uberspace’s article about setting up domains on their service](https://wiki.uberspace.de/domain:verwalten) (in German only).

## What you need

One thing to get out of the way first: You’ll enter commands into a command line a lot. No need to worry though, everything is explained on the very detailed [Uberspace wiki](https://wiki.uberspace.de/). Here are some things you’ll need in the process.

- **SSH client:** A simple program that does the job is [PuTTY](http://www.chiark.greenend.org.uk/~sgtatham/putty/download.html). I use [cmder](http://cmder.net/) as a replacement for Windows’ PowerShell which also works as an SSH client.
- **SFTP client:** To upload your files to the server. I use [WinSCP](https://winscp.net/eng/download.php) instead of FileZilla because it allows synchronizing directories.

Assuming you’ve registered for an Uberspace, log into it via SSH. Using `ssh` from the command line looks like this:

```
# 'phl' should be your Uberspace username. This one is mine.
ssh phl@amnesia.uberspace.de
```

Connect to your Uberspace via your SFTP client as well. The server name would be `amnesia.uberspace.de` at port 22 while the username is again your Uberspace username.

## Choose directory

Back to the SSH client. Go to `/var/www/virtual/phl`. If you want to publish multiple websites on one Uberspace, this is the place where they go. If you wish to publish only one site, the contents could just reside in the `html` directory.

Assume that we want to publish the websites [kleinfreund.de](https://kleinfreund.de) and [hyperlink.cool](https://hyperlink.cool). For each website we need a separate directory. The directory’s name will be what the server is looking for as someone is trying to access your website.

After the Domain Name System figured out the IP your domain points to, it’s the servers job to direct to the correct place. In our case, the Uberspace servers will look for the name `kleinfreund.de` inside `/var/www/virtual/phl` if someone entered this into their browser. Let’s make it so.

```
cd /var/www/virtual/phl
mkdir kleinfreund.de
mkdir hyperlink.cool
```

If you want to setup subdomains (e.g. www.kleinfreund.de, hey.kleinfreund.de, etc.), do the following:

```
ln -s kleinfreund.de hey.kleinfreund.de
ln -s kleinfreund.de www.kleinfreund.de
ln -s hyperlink.cool www.hyperlink.cool
```

The commands above create symbolic (`-s`) links (`ln`) to the directories we just created. This will result in requests to both `www.kleinfreund.de` and `hey.kleinfreund.de` being redirected to the respective directory (i.e. `kleinfreund.de`).

Now we also need to tell the Uberspace server that it should add some domains to the webserver configuration. Only with that information, the Uberspace server actually knows where exactly to search for the website (e.g. the `/phl` part of `/var/www/virtual/phl`).

```
uberspace-add-domain -d kleinfreund.de -w
uberspace-add-domain -d hey.kleinfreund.de -w
uberspace-add-domain -d www.kleinfreund.de -w
```

After you entered the commands above, you’ll receive some output like this:

```
The webserver's configuration is adapted; it will get active within at most 5 minutes.
Now you can use the following records for your dns:
  A -> 12.34.56.78
  AAAA -> 2002:0:0:0:0:0:c22:384e
```

These information are important for your domain provider. Log into your accounts and find the place where you can change the “DNS” or “nameserver” settings for your domain. Add a new `A` and `AAAA` record for each subdomain and also one for the main domain as shown in the table below:

| Host | Type | Value                   | TTL  |
|------|------|-------------------------|------|
|      | A    | 12.34.56.78             | 3600 |
|      | AAAA | 2002:0:0:0:0:0:c22:384e | 3600 |
| www  | A    | 12.34.56.78             | 3600 |
| www  | AAAA | 2002:0:0:0:0:0:c22:384e | 3600 |
| hey  | A    | 12.34.56.78             | 3600 |
| hey  | AAAA | 2002:0:0:0:0:0:c22:384e | 3600 |

Do not attempt to use the above IP’s, use the ones from the output. You should also get rid of old `A`/`AAAA` records pointing to other IP’s (from your previous webhost).

DNS changes often need a bit of time to propagate, so this is a good time to grab a hot cup of tea or coffee. You can test if the changes have been made with `dig` like this:

```
dig kleinfreund.de AAAA +short
dig kleinfreund.de A +short
```

<p class="note"><code>dig</code> is not shipped with Windows. You can get it by downloading one of the archives <a href="ftp://ftp.nominum.com/pub/isc/bind9/9.9.8/">from here</a>. Extract only the <code>dig.exe</code> file and drop it somewhere. I have it in <code>C:\dig\</code>. Now add this directory to your path and restart your favorite command line.</p>

---

That’s it for now. I think about also explaining how to setup HTTPS and the mail addresses. Would that be of interest for you? Let me know on [Twitter](https://twitter.com/kleinfreund).
