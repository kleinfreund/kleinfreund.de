---
title: "Contributing code with git"
date: 2019-09-01
tags:
- dev
---
You want to contribute code. You use git. How to?

<p class="note note--info">
  This is a completely rewritten version of the article <a href="https://kleinfreund.de/contributing-code/">Contributing code: Besting git, but slowly</a> I published last year. You really don’t need to read it before this one.
</p>

Contributing code to an open source project you don’t own or maintain can be a daunting task if you haven’t done it before. What does contributing code even mean?

Let’s say there is this open source tool you use. It works well for the tasks you use it for, but it has this one flaw that annoys you. You think to yourself “Hey, what if I could make this right?”. You find the project’s repository online and look through its code. After a while, the faulty bit has been identified. You devise a solution, but what now? How do you fix the tool? How do you contribute your code to the project?

In git land, code contributions are commonly done by submitting a pull request. In non-technical terms, a pull request says “Hey, that thing of yours is a bit broken”, and “I’ve made some changes to it”, and finally asks “Do you want to use these changes in your project?”. In this article, we’re going through the process of contributing code to an open source project with git step by step.



## Table of contents

- [The scenario](#the-scenario)
- [Setting up](#setting-up)
- [Doing work](#doing-work)
- [Losing touch](#losing-touch)
- [Keeping a fork up-to-date](#keeping-a-fork-up-to-date)
  - [Updating the local repository](#updating-the-local-repository)
  - [Updating the fork](#updating-the-fork)



## The scenario

First, let’s clarify some terms that I’m going to use. I’ll keep it short and use simplified definitions.

- **Repository**: A directory of files that belong to a project.
- **Remote repository**: A repository that is stored somewhere online.
- **Fork**: A copy of a repository that you manage. You can change things in it.
- **Original**: The original project repository you want to contribute to. You can’t change things in it.
- **Commit**: A commit is a collection of changes that has a unique identifier.
- **Branch**: A repository can have multiple branches. They allow you to work on various things in isolation. You can think of branches as copies of your files.

Now, what _is_ the scenario? You want to contribute code to the original repository. To do that, you create a fork of the original. You manage this copy of the original repository, so you can make changes to it as you wish. You will use this copy later to show your changes to the maintainers of the original repository. To make your changes in the fork, you download a copy of the fork that you can work on locally. In this scenario, there are three different repositories one can talk about: the original (remote), the fork (remote), and the copy of the fork (local).



## Setting up

I will use the repository [github.com/kleinfreund/poll](https://github.com/kleinfreund/poll) as an example for a project to contribute to.

1. Fork the [original repository](https://github.com/kleinfreund/poll).
2. Download the fork. Replace the repository URL below with the one of the fork you just created.

    ```sh
    git clone https://github.com/<YOUR-USERNAME>/poll.git
    ```

3. Navigate to the repository.

    ```sh
    cd poll
    ```

4. Add a reference to the original repository.

    ```sh
    git remote add original https://github.com/kleinfreund/poll.git
    ```

5. Rename the reference to the fork.

    ```sh
    git remote rename origin fork
    ```

    This step is not necessary. I only do that to avoid confusion between the terms “original” and “origin”.

You now have a local copy of the fork. Your local copy knows about the two remote repositories, original and fork, which you can verify by running `git remote -v`:

```
$ git remote --verbose
fork    https://github.com/<YOUR-USERNAME>/poll.git (fetch)
fork    https://github.com/<YOUR-USERNAME>/poll.git (push)
original            https://github.com/kleinfreund/poll.git (fetch)
original            https://github.com/kleinfreund/poll.git (push)
```

There, git lists names of remote repositories and their respective repository URLs.



## Doing work

Before you start changing anything, you should create a new branch that contains your work. This is a very useful habit to develop right away. It creates a kind of checkpoint marking the state of your repository before you changed anything. You can create multiple branches from the main branch of your repository to work on multiple things in isolation. Also, it allows you to go back to the repository’s main branch and start over if you messed something up along the line.

Let’s create a new branch called “fixing-a-thing” to work on:

```sh
git switch --create fixing-a-thing
```

<p class="note note--info">
  Note that I used the <code>git switch</code> command here. If you use a git version prior to 2.23, this command doesn’t exist, yet. Instead, use <code>git checkout -b fixing-a-thing</code>.
</p>

Let’s jump forward in time. You made some changes to fix the flaw described earlier. Let’s upload these changes to the fork so you can show them to the maintainers of the original repository by creating a pull request.


1. Select the changed files you want to upload. As an example, I will select the `poll.ts` file.

    ```sh
    git add src/poll.ts
    ```

2. Confirm the selection with an appropriate message. The message should describe what the changes in the commit accomplish.

    ```sh
    git commit --message "Fixed an issue with over here"
    ```

    This message is useful to identify the purpose of a commit later on.

3. Upload the changes.

    ```sh
    git push fork fixing-a-thing
    ```

    This will upload your changes to a branch named “fixing-a-thing” on the fork. If it doesn’t exist, it will be created. If it exists, your changes will be added to the existing branch.

The fork (the remote repository owned by you) now has a branch called “fixing-a-thing” that contains your work. You can now show your changes to the maintainers of the original repository by creating a pull request. In the request, you should describe the changes and provide a reason for why they are useful or necessary.

<p class="note note--info">
  Pull requests are always based on a branch. Working on branches allows you to create multiple pull requests from the same fork.
</p>



## Losing touch

While working on a pull request, the state of the original repository can change. Over time, the states of the original repository and the fork can become out of sync. The repositories diverge.

This is not always a problem. If in the original, a new file is added, and in the fork, an existing file is changed, the two repositories remain compatible. That is, git is able to integrate the changes from the fork into the original repository safely.

However, imagine this scenario: You pushed changes in `poll.ts` to your fork while in the meantime, the same file was deleted in the original repository. Now, the two repositories are incompatible. It’s no longer possible for git to safely integrate your changes into the original. Attempting to do so will result in a conflict. In such a scenario, git has no way of knowing what to do. What is more important? Deleting the file or changing it? This decision is left to maintainers of the original repository.



## Keeping a fork up-to-date

### Updating the local repository

You can get your fork back into a state where it’s compatible with the original. There are two strategies to accomplish this: merging and rebasing.

#### Merging

With a merge, the changes from two repositories are combined and applied to your branch with a merge commit. This is what happens when you run `git pull`: First, the state of the original repository is downloaded with `git fetch`, and then the original state is combined with your local state via `git merge`. If the two repositories were in a diverged state before running `git merge`, git will add a merge commit after completing the merge step.

```sh
git pull fork fixing-a-thing
```

#### Rebasing

The command `git pull` has an alternative mode that is enabled with the `--rebase` flag. As before, `git pull --rebase` will first download the original repository’s state via `git fetch`. Now instead of combining the two states, your local changes are temporarily removed. Next, git applies the changes of the original repository to your local copy as if you never made your changes. Finally, your changes are applied.

```sh
git pull --rebase fork fixing-a-thing
```

#### Conflict resolution

Unfortunately, at this point, we still have the same problem. The original repository and the fork are incompatible. Both `git pull` and `git pull --rebase` won’t complete without failure. Instead, the command will report that there is a conflict and ask you to resolve that conflict.

In the conflicting files, git will have added markers that look something like this:

```js
<<<<<<< HEAD
if (Array.isArray(results)) {
=======
if (results !== undefined && results.length > 0) {
>>>>>>> fixing-a-thing
  console.info(`Results: ${results.join(', ')}`)
}
```

After the set of less-than signs (`<`), it will show you the parts that were changed in the original; after the set of equals signs (`=`), it will show you the parts you changed. What git asks you is to decide which changes should remain in the file after solving the conflict. More often than not, it’s only a matter of choosing one or the other; however, sometimes you may want to combine the changes:

```js
if (Array.isArray(results) && results.length > 0) {
  console.info(`Results: ${results.join(', ')}`)
}
```

Once you removed the markers, git allows you to continue. It will give you instructions on how to finish the conflict resolution when running `git status`.



### Updating the fork

After successfully updating the branch of the local copy of your fork, it’s necessary to update the branch on the fork as well. This is needed because your pull request is based on the state of the fork’s branch. Updating the fork works the same as before if you used the merge approach:

```sh
git push fork fixing-a-thing
```

If you rebased your local copy, this command will fail. By rebasing the local copy of the repository on top of the state of the original repository, the local copy was made imcompatible with the fork. As a result, git stops you from updating the fork. This sounds pretty bad, but worry not: It’s intentional and prevents you from unintentionally deleting work.

In short: If other people work on the fork, uploading your rebased changes could possibly delete their work.

We can overrule this safety measure by adding the `--force-with-lease` flag. It will instruct git to only upload changes to the fork if there are any new commits on the fork that you don’t have in your local copy. If you work alone on the fork, you’re safe from overriding other people’s work.

```sh
git push fork fixing-a-thing --force-with-lease
```

The fork is now compatible with the original again. It’s now a copy of the original with your work applied on top. Your pull request will be updated accordingly and the project maintainers can review it.



## Git is complex

While writing this, I realized again how much there is to learn about git. This article barely scratches the surface, yet it already involves complex concepts such as merge conflict resolution. It’s a lot. Learning a complex tool takes time. It’s totally fine if all these thing still appear as a mystery to you. Let me know about the things that are unclear in this article, I’m happy to help.
