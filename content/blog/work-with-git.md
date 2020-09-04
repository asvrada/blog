---
date: '2019-07-24'
title: 工作中使用git的一点心得
---

> 推荐 git 互动式教程：[learn git branching](https://learngitbranching.js.org)

公司使用常用的git来管理代码，自然是有不少在工作中应用git的机会。在此总结一下常见的操作流程。

## 取得源代码，创建feature的branch
```
git clone xxx
git checkout -b {name}
```

## 进行开发，提交变更
这一步有时会遇到很多情况。最常见的就是添加变更并commit: 

```
git add xxx
git commit
```

我一般不传入评论 `-m` 而直接运行 `git commit`，这样可以打开文本编辑器输入详细变更。毕竟是公司的代码库，得把做了什么都写清楚。

其他时间，我都花在寻找如何补救误操作了。

1. 还未stage，取消更改：`git checkout -- file`
2. 更改上个commit：`git commit --amend`
3. 在错误的branch上开发：`git stash; git stash pop`

> 虽然不知道为什么，但是最好不要修改已push到服务器的commit。

## 提交更改
首先需要为local branch设置一个对应的服务器上的branch：
`git push --set-upstream origin {local branch}`
然后`git push`来推送任何commit。

如果需要在不同的branch间同步commit，可以使用rebase或者merge。

### rebase
一般用来把自己的branch rebase到最新的master上。

`git rebase {other}` 用于把当前 branch 所做的 commit 移到 other 这个 branch 上。说是移动，其实是replay提交记录，重新应用变动，因此其实是不同的commit，hash是不一样的。

### merge
`git merge {other}` 用于把 other 这个 branch 上的新 commit 同步到当前 branch 上。

## pull request
有conflict就修改。

## 完成开发，删除branch
确认pull request已接受，branch 合并到 master，该分支所做变更已经彻底提交后，可以先删除remote branch:
`git push origin --delete {branch}`

再删除本地分支: `git branch -D {branch}`