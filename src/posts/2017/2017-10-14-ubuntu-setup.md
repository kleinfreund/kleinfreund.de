---
title: ubuntu-setup.md
date: 2017-10-14
tags:
- dev
---
I find it enjoyable to setup a new operating system. For the most part. All is still fresh. But some things need to be *exactly* like they were before. For a while now I’ve been keeping a backup of my configuration files in a [dotfiles repository](https://github.com/kleinfreund/dotfiles). This helps me getting up and running fairly quickly. However, that’s only half the trick.

Setting up Ubuntu is tedious. It doesn’t do a good job of getting out of your way. Rather, it gets in your way. Changing some interface behavior or installing software is rarely obvious. What I found myself doing more than anything was hitting up a search engine with questions like these:

- *“How to install <var>$SOFTWARE</var> on Ubuntu?*
- *“How to stop Ubuntu from doing <var>$THING</var>?”*

In order to answer these questions, I took notes and put them in a text document inside my home directory. Here is my `ubuntu-setup.md`.

## Table of Contents

- [Software](#software)
  - [Google Chrome](#google-chrome)
  - [Git](#git)
  - [Visual Studio Code](#visual-studio-code)
  - [Sublime Text](#sublime-text)
  - [Gnome Tweak Tool](#gnome-tweak-tool)
- [General settings](#general-settings)
  - [Global file associations](#global-file-associations)
  - [Disable touchpad when mouse is connected](#disable-touchpad-when-mouse-is-connected)
  - [Disable account locking when closing the laptops’ lid](#disable-account-locking-when-closing-the-laptops-lid)
  - [Disable tab/application switching on mouse wheel](#disable-tab-application-switching-on-mouse-wheel) **(not possible)**
  - [Disable screenshot sound](#disable-screenshot-sound)
  - [Disable dots covering the wallpaper in the login screen](#disable-dots-covering-the-wallpaper-in-the-login-screen)
  - [Disable mouse wheel click minimizing windows](#disable-mouse-wheel-click-minimizing-windows)
  - [Disable global <kbd>Ctrl</kbd>+<kbd>Alt</kbd>+<kbd>Up Arrow</kbd>/<kbd>Down Arrow</kbd> keybindings](#disable-global-kbd-ctrl-kbd-kbd-alt-kbd-kbd-up-arrow-kbd-wbr-kbd-down-arrow-kbd-keybindings)

## Software

### Google Chrome

```
wget -qO - https://dl-ssl.google.com/linux/linux_signing_key.pub | sudo apt-key add -
echo 'deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main' | sudo tee /etc/apt/sources.list.d/google-chrome.list
sudo apt update
sudo apt install google-chrome-stable
```

(Source: [Ask Ubuntu: How to install Google Chrome](https://askubuntu.com/a/510186))

### Git

```
sudo add-apt-repository ppa:git-core/ppa
sudo apt-get update
sudo apt-get install git
```

(Source: [Ask Ubuntu: How do I install the latest version of Git with apt?](https://askubuntu.com/a/568596/337853))

### Visual Studio Code

Open [code.visualstudio.com/Download](https://code.visualstudio.com/Download) and download the `.deb` file. Install it with `dpkg` as shown below. You have to adjust the file name.

```
sudo dpkg --install code_1.16.1-150540649x_amd64.deb
```

### Sublime Text

Follow [the instructions on the Sublime Text website](https://www.sublimetext.com/docs/3/linux_repositories.html).

In order to use a dev build but also get a potentially newer stable release, I added both channels like below.

```
wget -qO - https://download.sublimetext.com/sublimehq-pub.gpg | sudo apt-key add -
echo "deb https://download.sublimetext.com/ apt/stable/" | sudo tee /etc/apt/sources.list.d/sublime-text.list
echo "deb https://download.sublimetext.com/ apt/dev/" | sudo tee /etc/apt/sources.list.d/sublime-text.list
sudo apt update
sudo apt install sublime-text
```

### Gnome Tweak Tool

```
sudo apt update
sudo apt install gnome-tweak-tool
```


## General Settings

### Global file associations

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

### Disable touchpad when mouse is connected

It puzzles me that this is not a setting available in the settings. The following unfortunately is not very reliable. It also doesn’t communicate the touchpad state to System Settings.

```
gsettings set org.gnome.desktop.peripherals.touchpad send-events disabled-on-external-mouse
```

Right now, this doesn’t seem to work.

**Undo**:

```
gsettings reset org.gnome.desktop.peripherals.touchpad send-events
```

**List touchpad-related settings**:

```
gsettings list-recursively org.gnome.desktop.peripherals.touchpad
```

### Disable account locking when closing the laptops’ lid

Again, why is this not easily configurable?

```
sudo sed -i 's/IgnoreLid=false/IgnoreLid=true/g' /etc/UPower/UPower.conf
service upower restart
```

**Undo**:

```
sudo sed -i 's/IgnoreLid=true/IgnoreLid=false/g' /etc/UPower/UPower.conf
service upower restart
```

### Disable tab/application switching on mouse wheel

This one isn’t currently possible. This feature is very annoying to me, as I use my mouse wheel to open links in a new tab very often. This behavior makes me switch browser tabs by accident just by turning the mouse wheel a little.

It’s not a good idea to use the mouse wheel turn for any kind of distinct interaction like switching a tab or navigating the browser history because the metaphor is wrong. A wheel affords turning, adjusting values on a scale. Instead, it works well for smooth adjustments to a value (e.g. scrolling, zooming, controlling volume levels).

### Disable screenshot sound

```sh
sudo mv /usr/share/sounds/freedesktop/stereo/screen-capture.oga \
        /usr/share/sounds/freedesktop/stereo/screen-capture-backup.oga
```

**Undo**:

```sh
sudo mv /usr/share/sounds/freedesktop/stereo/screen-capture-backup.oga \
        /usr/share/sounds/freedesktop/stereo/screen-capture.oga
```

### Disable dots covering the wallpaper in the login screen

If you think your wallpaper should have dots on a grid, edit the graphic itself, but don’t put them on top of my [beautiful Firewatch wallpaper](http://blog.camposanto.com/post/138965082204/firewatch-launch-wallpaper-when-we-redid-the). That’s certainly nothing an operating system should do on my behalf.

```
sudo xhost +SI:localuser:lightdm
sudo su lightdm -s /bin/bash
gsettings set com.canonical.unity-greeter draw-grid false
exit
```

**Undo**:

```
sudo xhost +SI:localuser:lightdm
sudo su lightdm -s /bin/bash
gsettings reset com.canonical.unity-greeter draw-grid
exit
```

### Disable mouse wheel click minimizing windows

```
gsettings set org.gnome.desktop.wm.preferences action-middle-click-titlebar 'none'
```

**Undo**:

```
gsettings reset org.gnome.desktop.wm.preferences action-middle-click-titlebar
```

### Disable global <kbd>Ctrl</kbd>+<kbd>Alt</kbd>+<kbd>Up Arrow</kbd>/<wbr><kbd>Down Arrow</kbd> keybindings

Sublime Text trained my muscle memory, so <kbd>Ctrl</kbd>+<kbd>Alt</kbd>+<kbd>Up Arrow</kbd> and<kbd>Down Arrow</kbd> are already reserved. Ubuntu, you shall obey.

```
gsettings set org.gnome.desktop.wm.keybindings switch-to-workspace-up "['<Super>Page_Up']"
gsettings set org.gnome.desktop.wm.keybindings switch-to-workspace-down "['<Super>Page_Down']"
```

**Undo**:

```
gsettings reset org.gnome.desktop.wm.keybindings switch-to-workspace-up
gsettings reset org.gnome.desktop.wm.keybindings switch-to-workspace-down
```
