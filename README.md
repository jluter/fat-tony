
# Git Cheat Sheet

The purpose of this cheat sheet is to provide a quick rundown of the necessary Git commands to organize files using Fat Tony.

## Installation

You will need to install Git for your OS, along with your personal preference for IDE.
For this project, I utilized VS Code and Git Bash as my command-line interface which comes with Git for Windows.  

Git Installation guide: https://git-scm.com/book/en/v2/Getting-Started-Installing-Git
VS Code download: https://code.visualstudio.com/download 

## First Steps
Once git is installed, I recommend opening Git Bash (or other CLI) and going through setup. 

```bash
git config --global user.name "[firstname lastname]"
git config --global user.email "[user-email]"
git config --global color.ui auto
```

Once this is done, open a new folder in your IDE. From your IDE open the terminal in that folder and select your Git CLI, then run: 
```bash
git clone https://github.com/jluter/fat-tony 
```
You should now have all the most recent files for this project on your local machine.

## Most Common Commands
The most common commands for Fat Tony are likely are status, pull, add, commit, and push.

| Command | Example     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `status`      | `git status` | View all files in local repository that have been edited, staged, or committed.|
| `pull`      | `git pull origin` | **pull** is a combo of two other commands, **fetch** and **merge**, that updates your local files with the most recent remote files.|
| `add`      | `git add my_file.example` | Stages your file to be added to the remote repository. For all files, replace the file example with just "**.**". |
| `commit`      | `git commit -m "My first commit!"` | Commit your changes with a descriptive message in quotation marks. |
| `push`      | `git push origin main` | Push your changes to the remote repository on Github. |

**Note:** your first "push" command needs the -u flag, which tells Git to track changes between your local repo and the remote one. 
Example:
```bash
git push -u origin main
```

The most common workflow will look something like this: 
```bash
git pull origin
git add .
git commit -m "Updated README.md"
git push origin main
```

## Git branching intro
Branching in git can get complex. For the most part, we will not worry about it on this project and just work off the main/master branch. 

If you do want to create your own branch (maybe for making changes that don't affect the main project) then you can use these few commands: branch, checkout, merge.

| Command | Example     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `branch`      | `git branch` | List all your branches.|
| `branch -b`      | `git branch -b my-new-branch` | Create a new branch named "my-new-branch" and switch to it.|
| `checkout`      | `git checkout some-other-branch` | Checkout another existing branch. In this case, "some-other-branch". |
| `merge`      | `git merge other-branch` | Merge "other-branch" to the branch your are currently on. |

**Note:** Of all of these, be most careful with `merge`, as it will overwrite changes.

For a more in-depth breakdown of the basics on git branching: https://git-scm.com/book/en/v2/Git-Branching-Basic-Branching-and-Merging 