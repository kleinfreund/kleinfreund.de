---
title: Setting up my Development Environment on Ubuntu
date: 2017-10-14T12:30:00Z
tags:
- dev
js:
- expandable-code-blocks.js
---
I like setting up a new operating system. For the most part. All is still fresh. But some things need to be *exactly* like they were before. For a while now I’ve been keeping a backup of my configuration files in a [dotfiles repository](https://github.com/kleinfreund/dotfiles). This helps me getting up and running fairly quickly. However, that’s only half the trick.

Setting up Ubuntu is tedious. It doesn’t do a good job of getting out of your way. Rather, it gets in your way. Changing some interface behavior or installing software is rarely obvious. What I found myself doing more than anything was hitting up a search engine.

*“How to install <var>$SOFTWARE</var> on Ubuntu?*

*“How to stop Ubuntu from doing <var>$THING</var>?”*

To help my future self, I created a text document in my home directory. In there, I wrote down what I did to answer these questions for myself. Following now is a loose collection of things I need to do when setting up a fresh Ubuntu installation.

- Software
  - Google Chrome
  - Git
  - Visual Studio Code
  - Sublime Text
  - Gnome Tweak Tool
- General settings
  - Global file associations for text files
  - Disable touchpad when mouse is connected
  - Disable account locking when closing the laptops’ lid
  - Disable tab/application switching on scroll **(not possible)**
  - Disable screenshot sound
  - Disable dots covering the wallpaper in the login screen
  - Disable mouse wheel click minimizing windows
  - Disable global <kbd>Ctrl</kbd>+<kbd>Alt</kbd>+<kbd>Up Arrow</kbd>/<kbd>Down Arrow</kbd> keybindings
  - Show the date in the menu bar

### Software

#### Google Chrome

```
wget -qO - https://dl-ssl.google.com/linux/linux_signing_key.pub | sudo apt-key add -
echo 'deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main' | sudo tee /etc/apt/sources.list.d/google-chrome.list
sudo apt update
sudo apt install google-chrome-stable
```

(Source: [Ask Ubuntu: How to install Google Chrome](https://askubuntu.com/a/510186))

#### Git

```
sudo add-apt-repository ppa:git-core/ppa
sudo apt-get update
sudo apt-get install git
```

(Source: [Ask Ubuntu: How do I install the latest version of Git with apt?](https://askubuntu.com/a/568596/337853))

#### Visual Studio Code

Open [code.visualstudio.com/Download](https://code.visualstudio.com/Download) and download the `.deb` file. Install it with `dpkg` as shown below. You have to adjust the file name.

```
sudo dpkg --install code_1.16.1-1505406497_amd64.deb
```

#### Sublime Text

Follow [the instructions on the Sublime Text website](https://www.sublimetext.com/docs/3/linux_repositories.html).

In order to use a dev build but also get a potentially newer stable release, I added both channels like below.

```
wget -qO - https://download.sublimetext.com/sublimehq-pub.gpg | sudo apt-key add -
echo "deb https://download.sublimetext.com/ apt/stable/" | sudo tee /etc/apt/sources.list.d/sublime-text.list
echo "deb https://download.sublimetext.com/ apt/dev/" | sudo tee /etc/apt/sources.list.d/sublime-text.list
sudo apt update
sudo apt install sublime-text
```

#### Gnome Tweak Tool

```
sudo apt update
sudo apt install gnome-tweak-tool
```


### General Settings

#### Global file associations for text files

Ubuntu uses gedit as its default text editor. To associate files that are opened in gedit with another program, one needs to adjust the file `/usr/share/applications/defaults.list`. Replace all occurences of `gedit.desktop` with the file name that is being associated with your preferred application. The new file name needs to refer to a file that exists in the same directory, e.g.:

- `sublime_text.desktop`
- `code.desktop`
- `vim.desktop`

The following command replaces all occurences of `gedit.desktop` with `code.desktop`, thus making Visual Studio Code the default text editor in most cases.

```
sudo sed -i 's/gedit.desktop/code.desktop/g' /usr/share/applications/defaults.list
```

If this did not work for a a certain file, it might not be covered by the entries in `defaults.list` or it might have been overriden previously. This happens when one changes the default application used for “Open With Other Application” from within the file explorer.

Luckily, these overrides can be controlled with a command-line interface. The following examples re-associate regular text files with Visual Studio Code.

**Prints the current setting**:

```
xdg-mime query default text/plain
```

**Changes the association**:

```
xdg-mime default code.desktop text/plain
```

#### Disable touchpad when mouse is connected

It puzzles me that this is not a setting available in System Settings. The following unfortunately is not very reliable. It also doesn’t communicate the touchpad state to System Settings.

```
gsettings set org.gnome.desktop.peripherals.touchpad send-events disabled-on-external-mouse
```

Right now, this doesn’t work for.

#### Disable account locking when closing the laptops’ lid

Again, why is this not easily configurable?

```
sudo sed -i 's/IgnoreLid=false/IgnoreLid=true/g' /etc/UPower/UPower.conf
service upower restart
```

#### Disable tab/application switching on scroll **(not possible)**

This one is not even configurable at all. This feature is very annoying to me, as use my mouse wheel to open links in a new tab very often. That also makes me switch tabs in Chrome by accident all the time when a slight turn of the wheel occures.

It’s not a good idea to use the mouse wheel turn for any kind of distinct interaction like switching a tab or navigating the browser history, as the metaphor is wrong. A wheel affords turning, adjusting values on a scale. In particular it’s well matched for smooth adjustments to a value (e.g. scrolling, zooming, controlling volume levels).

#### Disable screenshot sound

```
sudo mv /usr/share/sounds/freedesktop/stereo/screen-capture.oga /usr/share/sounds/freedesktop/stereo/screen-capture-disabled.oga
```

#### Disable dots covering the wallpaper in the login screen

If you think your wallpaper should have dots like these on it, edit the graphic, but don’t put them on top of my [beautiful Firewatch wallpaper](http://blog.camposanto.com/post/138965082204/firewatch-launch-wallpaper-when-we-redid-the). Certainly nothing a system should do on my behalf.

```
sudo xhost +SI:localuser:lightdm
sudo su lightdm -s /bin/bash
gsettings set com.canonical.unity-greeter draw-grid false
exit
```

#### Disable mouse wheel click minimizing windows

```
gsettings set org.gnome.desktop.wm.preferences action-middle-click-titlebar 'none'
```

#### Disable global <kbd>Ctrl</kbd>+<kbd>Alt</kbd>+<kbd>Up Arrow</kbd>/<wbr><kbd>Down Arrow</kbd> keybindings

Sublime Text trained my muscle memory, so <kbd>Ctrl</kbd>+<kbd>Alt</kbd>+<kbd>Up Arrow</kbd>/<wbr><kbd>Down Arrow</kbd> are already reserved by me. Ubuntu, you shall obey.

```
gsettings set org.gnome.desktop.wm.keybindings switch-to-workspace-up "['']"
gsettings set org.gnome.desktop.wm.keybindings switch-to-workspace-down "['']"
```

#### Show the date in the menu bar

```
gsettings set com.canonical.indicator.datetime show-date true
```
