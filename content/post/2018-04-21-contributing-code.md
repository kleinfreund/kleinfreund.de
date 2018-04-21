---
title: "Contributing code: Besting git, but slowly"
date: 2018-04-21
tags:
- dev
---
We want to contribute code. We use git. How to?

One task where it easily gets complicated is contributing code to an open source project we don’t own or maintain. People need to be able to review our contribution and based on that review accept or reject it. For this purpose, we create a pull request. We ask the maintainers of a project to pull our contribution into their repository.

*Disclaimer*: This article only covers a cross section of what one can and should do with git. I always struggle with remembering the *correct git strategies* when contributing to open source projects. These are my observations and things I learned along the way. git is complicated. I don’t like it very much, but it’s powerful and useful to me. Maybe the following helps you wrap your head around all this overly complex matter.

### Table of contents

- [The scenario](#the-scenario)
- [Setting up](#setting-up)
- [Losing touch](#losing-touch)
- [Synchronizing a fork](#synchronizing-a-fork)
  - [Merging](#merging)
  - [Rebasing](#rebasing)
- [To merge or to rebase?](#to-merge-or-to-rebase)
- [Let it be known](#let-it-be-known)
- [Engage](#engage)
- [TL;DR](#tl-dr)

### The scenario

- **Original**: A repository that we don’t own.
- **Fork**: A (remote) copy of the original. That one we own.
- **Clone**: A (local) copy of the fork. We own this one, too.

What *is* the scenario?

We want to contribute code to a repository (the original). For that purpose, we create a copy of that repository (called a fork). In order for the maintainer of the original to see our contribution, that fork needs to be accessible online (atleast for the scope of this article it has to be). That’s why both the original and the fork are also called remote repositories. They are not on our machine but somewhere remote.

### Setting up

Now, I will just assume that we do not want to work on the fork online. Maybe you have your forks on your own web server with your own git and your own online code editor and you do, but *we* (as in *we*, the people following the scope of this article) don’t. So we need a local copy of the code: A local repository, not remote. These are the steps:

1. Fork the original.
2. Clone the fork.

    ```sh
    git clone https://github.com/$we/reverse-iterable-map.js.git
    ```

3. Reference the original from the clone.

    ```sh
    git remote add original https://github.com/kleinfreund/reverse-iterable-map.js.git
    ```

We can now talk about three repositories that exist: original, fork and clone. git people will often call the original repository “upstream”. I do, too, but thinking about it while writing this, I should be calling it “original” because that makes it clear what it is. Looking at our clone, the fork would be something up the stream as well, wouldn’t it? git people will also often call the fork repository “origin”. I think that’s fine. Maybe I should keep calling it “fork”, though?

Our clone (the local copy) knows about the two upstream repositories (fork and original). Look at the output from `git remote -v`:

```sh
$ git remote -v
origin  https://github.com/$we/reverse-iterable-map.js.git (fetch)
origin  https://github.com/$we/reverse-iterable-map.js.git (push)
original        https://github.com/kleinfreund/reverse-iterable-map.js.git (fetch)
original        https://github.com/kleinfreund/reverse-iterable-map.js.git (push)
```

You know what? If I call it “original”, I shouldn’t use the name “origin” for something that’s not the original or the origin. That’s too similar and potentially confusing.

```sh
git remote rename origin fork
```

### Losing touch

While we work on our contribution, the original will change. The repositories we own will diverge from the original over time.

This process may result in conflicts. We delete a file because we don’t need it, but in the original, someone just updated the contents of said file. The state of our fork just became incompatible with the state of the original. In this case, the two conflicting states need to be merged.

If no conflicts are created, we still have fork that diverged from the original. The states are still different, but this time they are compatible.

Ideally, the difference between the original and the fork are just our contributions. Ideally, our fork is a copy of the original with our contributions added on top. This doesn’t happen all the time. Usually, both the original and the fork diverge from the initial state — the point in time where the fork was created.

To avoid trouble and frustation, it’s important to keep the state of a fork as close as possible to the state of the original.

### Synchronizing a fork

Synchronizing a fork means updating the fork’s diverged state so that it matches the state of the original. But wait, we already worked on our contribution in our local clone. We need to take this into account.

Currently, we have a fork in a certain state plus some contributions we made locally. Now, we want to get everything that has changed in the original since when we created the fork. We want to apply these changes to our fork while keeping our contributions. For this task, there are two distinct strategies. Merging and rebasing. For starters, the operation `git pull` is `git fetch` followed by `git merge` and `git pull --rebase` is `git fetch` followed by `git rebase`.

Let’s get the changes from the original repository:

```sh
git fetch original
```

#### Merging

We could *merge* the two states in order to synchronize our clone with the original.

```sh
git merge original/master
```

(**Note**: “original/master” refers to the original’s master branch. That’s a bad name. The branch should be called something like “main” or “production”.)

After a successful merge, a merge commit will be created, indicating that a merge happened and that it was successful. Some git people don’t like that because it sometimes creates *pointless* commits. In the case of merging two states that are compatible, it seems noisey to have an extra commit saying “Hey, I’m now up-to-date with the original”.

#### Rebasing

We could also *rebase* the state of our clone onto the state of the original.

```sh
git rebase original/master
```

After a successful rebase, our clone looks like we created it from a fork that was just created; thus, it contains all the changes from the original. We act like we just started working on our contribution while already being in possession of all the changes in the original. Some git people don’t like that because it creates a time paradox. Changes from two weeks ago appear as a commit after changes from yesterday. We rewrote the git history.

That’s just a minor issue, but rebasing can lead to dangerous results. To avoid most of the dangerous outcomes, only ever rebase your local state onto the state of the original, not the other way round. The section [“The Golden Rule of Rebasing”](https://www.atlassian.com/git/tutorials/merging-vs-rebasing#the-golden-rule-of-rebasing) from the article [“Merging vs. Rebasing”](https://www.atlassian.com/git/tutorials/merging-vs-rebasing) has a good explanation and example for this scenario.

#### To merge or to rebase?

As a loose rule of thumb, I synchronize a fork with the original by merging if there are conflicts and by rebasing if there are no conflicts.

### Let it be known

Right now, we just synchronized our clone, the local copy of our fork. To finalize our task and synchronize the fork with the original, we need to push our changes from the clone to the fork.

```sh
git push
```

Whoopsie, that didn’t work if you just rebased. We need to forcefully push our changes because we altered the history in our local copy; thus, we effectively created entirely new commits with the exact same changes. From git’s perspective, these commits are different from the ones in the remote repository.

Now, we *could* use `git push --force` to achieve what we want, but there might still be a catch: If multiple people work on the fork, you might overwrite their changes by pushing your changes with force. This can be avoided with the `--force-with-lease` flag.

```sh
git push --force-with-lease
```

If you work alone on the fork and only have one clone, you can use `--force`; otherwise, use `--force-with-lease`.

### Engage

The fork is now up-to-date with the original. We can now submit our contribution in the form of a pull request.

When submitting a pull request, it’s important to describe your contribution. Have you changed critical aspects of the project? Does your pull request depend on another pull request that hasn’t been merged? Be detailed but not verbose. It can be very tedious and hard work to review big contributions.

### TL;DR

**Default**:

```sh
# Fork original and clone fork
git clone https://github.com/$we/reverse-iterable-map.js.git

# Reference original and fork from the clone
git remote add original https://github.com/kleinfreund/reverse-iterable-map.js.git
git remote rename origin fork

# Change something
mkdir changes

# Add and commit changes
git add changes && git commit -m "Implemented this nice change"

# Merge changes from original with the current state
git pull original/master

# Push the changes to the fork
git push fork
```

**Rebasing**:

- Only use rebasing when working alone on a fork
- Avoid rebasing if you already created a pull request. If in doubt, ask the maintainers if they prefer you to incorporate changes in the original via merge or rebase.


```sh
# Same as above, but when pulling changes: use rebase instead of merge
git pull --rebase original/master

# Push the changes to the fork
git push --force-with-lease fork
```
