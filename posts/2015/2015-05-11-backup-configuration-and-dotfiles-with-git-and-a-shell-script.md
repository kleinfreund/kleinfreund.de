---
title: Backup configuration and dotfiles with Git and a shell script
date: 2015-05-11
tags:
- dev
---
A few months ago, the harddrive of my previous laptop died on me, but I could work on a Ubuntu partition I prepared for cases like this. Luckily, I kept a backup of all the important configuration files from things like Sublime Text in a [Git repository](https://github.com/kleinfreund/dotfiles). At this point I wanted to improve the process of manually copying the files from the various locations to the repo directory. I wrote a little shell script for that purpose.

Notice, that the script is adjusted to my personal needs and the software I use. It should work on your machine, but I haven’t tested it anywhere apart from my own environments.

### What is the script doing?

The script is meant to be executed from within the target repository containing the configuration files. Thus, it first checks if the directory is actually a Git repository and whether there is a .git directory indicating that we’re indeed at the root of the repo.

```bash
if [[ ! -d .git ]] || ! git rev-parse --git-dir > /dev/null 2>&1; then
  echo "Not a git repository."
  exit 1
fi
```

Now I try to detect which operating system is in use. That’s because I keep the files from various OS’s separated. This might be unnecessary and even a hinderance, but for now I like to stay save here. The path snippet for the operating system is saved in the variable `OS`. Another thing I do here is assigning the location of the Sublime Text configuration to a variable, since these are different from OS to OS. The other files (the dotfiles) usually sit in the home directory of the user.

After that, I create directories for every tool within the repo. For example the Bash files for Ubuntu end up in `${REPO_PATH}linux/bash/`. Finally, general copy commands for every file are issued. Since the files where Sublime Text stores its keybindings in are OS-dependant, I use the `OS` variable I previously assigned to execute the right commands. That’s it, `echo "Completed."`.

### Possible problems

The script _assumes_ the locations of the configuration and dotfiles based on my experience. These might be different on other or future environments. I don’t know of a more reliable way for determining the correct paths, but that’s not too big of a deal breaker.

Also I really could use some sort of map. Bash version 4 has associative arrays, but Git Bash is on version 3. I don’t know whether a future Git installer (which is _still_ sitting on 1.9.5 for Windows) might be using a newer version. Until then I keep associative arrays out of my script to keep it compatible with Windows environments.
