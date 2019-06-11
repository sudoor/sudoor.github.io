---
title: git简明教程

date: 2017-08-12 18:30:31
update: 2017-08-12 18:30:31

categories:
    - git
tags:
    - git
    
keywords:
    - git
    
vssue-title: Git 简明教程

---

以下内容来自自网站 [Try Git](https://try.github.io) （git简单入门教程网站）

<!-- more -->

# git init
在当前目录初始化一个git仓库

## Directory
- 包含项目文件的文件夹

## Repository
- 包含 `.git` 文件夹的仓库

# git status
检查当前仓库文件状态

## staged
- 已提交的文件
## unstaged
- 已改变但未提交的文件
## untracked
- 未包含在git版本控制里，通常为新文件
## deleted
- 已在git 版本中删除的文件

# git add `<file>`
添加文件到git 版本管理中

## Staging Area
- 暂存区，通常是已更改但未提交的文件存放区域
Commit *提交*

## add all
- 你可以使用 `git add -A .` 添加当前文件夹未被忽略的文件。

# git reset
- 你可以使用 `git reset <filename>` 将文件从暂存区移除


# Commit
 `commit` 用于提交本次更改内容

## git commit -m "msg"
- 更改提示语

## '-a' option
- 提交时自动移除已删除文件

```
git commit -am "msg"
```

# git log
显示至本次提交时的变更日志

## git log --summary
- 显示至本次提交时的变更日志汇总


# git remote

```
git remote add <remote name> <repository URL>
git remote add origin https://github.com/try-git/try_git.git
```

git并不关心你如何命名远端服务，但通常叫 `origin`.

# git push
告诉git 我们的commit已完成 等待推送至远端

```
git push -u <remote name> <branch name>
git push -u origin master
```

`-u` 是为了能让git记住参数，下次我们可以直接使用 `git push`.

# git stash

有时候当你不想提交到本地仓库，但又不得不切换工作副本的时候使用`stash`暂存

使用 `git stash` 暂时存储修改的文件,  `git stash apply` 在工作空间变化之后重新应用暂存信息.

# git pull


```
git push <remote name> <branch name>
git pull origin master
```

检查远端仓库并拉取最新文件

# git diff
展示工作空间的文件变化

## git diff HEAD
- 展示与我们最新一次提交的文件变化 `HEAD` 默认指向最近一次提交

## git diff --staged
- 展示与暂存区文件的差异



# git checkout -- `<target>`
将文件更改为上次提交时的文件，即去掉上次提交后的所有更改

`--`: 向命令行保证在“-”后面没有更多选项，避免切换到同名的分支

# git branch
列出当前存储库的本地分支。

## git branch `<name>`
- 创建新分支

> 当开发人员在处理一个特性或bug时，他们通常会创建一个副本（又名。分支）他们的代码可以单独提交。然后，当它们完成时，它们可以把这个分支合并到主分支中。

## git checkout `<branch>`
- 切换分支

## git checkout -b new_branch
- 切换并创建分支

# git rm `<file>`
不仅从磁盘中删除实际文件，还将为我们从git里删除文件。

## git rm -r folder
- 递归地从给定目录中删除所有文件夹和文件。

# git merge `<branch>`
将给定分支的更改合并到当前分支。

## Merge Conflicts
- 在同一时间对文件进行更改时，可能发生合并冲突，更多内容参考 [冲突是如何产生的](http://git-scm.com/docs/git-merge#_how_conflicts_are_presented).

# Delete Branch

## git branch -d `<branch>`
- 删除一个本地分支 `-d` 不会删除你还未merge的分支

## `-f` and `-D`
- 强制删除包括未合并的分支

>  添加`-f`（--force）选项或使用`-D`组合成一个命令。 等效于`-d -f`

## Delete Remote Branch

```
git branch -r -d <remote name>/<branch name>
git push <remote name>: <branch name>
```
```
git branch -r -d origin/branch-name
git push origin :branch-name
```
