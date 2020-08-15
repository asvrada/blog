---
date: '2020-08-14'
title: 工作中使用git的一点心得 - 2
---

> 上一章: [工作中使用git的一点心得 - 1](/work-with-git/)

一年多过去了，再次总结一下工作中常见的 git 使用场景及指令。

## 将 commit 移到其他 branch

如何将某 branch 的 commit A 移到一个新的 branch？

```
xxxx -> commit A         master

变为

xxxx                     master
  ⤷ commit A             feature_branch
```

大致思路是在当前commit创建branch，然后将master移回origin/master

```bash
git checkout -b {branch name}
git checkout master
git reset --hard {commit you want HEAD to be}
```

### git reset

`git reset` 有三种常见模式 `--soft --hard --mixed`，下表列出各个模式的具体效果（`git reset -h` 可显示下表）

```
--mixed               reset HEAD and index
--soft                reset only HEAD
--hard                reset HEAD, index and working tree
```

其中 index 是用于存放将会被commit的改动。working tree 指当前所在 branch（？不确定）。

下表列出各个模式对文件/改动的影响

| Mode              | Description                        | Use case                                             | How this mode affects changes... | Already committed         | To be committed           | Not staged for commit | Untracked files |
|-------------------|------------------------------------|------------------------------------------------------|----------------------------------|---------------------------|---------------------------|-----------------------|-----------------|
| --mixed (default) | reset HEAD and index               | I want to un-commit and un-add changes               |                                  | Now not staged for commit | Now not staged for commit | Unaffected            | Unaffected      |
| --soft            | reset only HEAD                    | I want to un-commit                                  |                                  | Now to be committed       | Now to be committed       | Unaffected            | Unaffected      |
| --hard            | reset HEAD, index and working tree | I want to delete my commits and all work in progress |                                  | Gone                      | Gone                      | Gone                  | Unaffected      |

### git stash

```
git stash          Create a stack and store all changes not committed
git stash apply    Pop and apple the change from most recent stack
git stash drop     Discard the most recent stack
```

## squash before merge

todo

## rebase

todo
