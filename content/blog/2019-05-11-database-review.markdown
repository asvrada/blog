---
title: 数据库项目总结
layout: post
tags: [code]
---

> 该文章总结了数据库大作业的实现方法，并介绍了未来可能的性能提升方法。  
> 代码在：[GitHub](https://github.com/asvrada/CollegeProj-Database)

# 实现

## 载入数据

载入数据的部分比较简单，仅仅是将代表数字的字符串转成32位的整型数字，并以column为单位存到硬盘上，即一个relation的一列存为一个二进制文件。

## 执行SQL

我将SQL操作分成了三步按次序进行：

select/filter --符合的行号--> join --符合的行号--> sum  

对于每一步的中间结果，我使用一个数组储存符合条件的行号。比如 `[0, 5, 9]` 代表relation里的第1，6，20行符合要求。

### select

简单的过一遍一个relation的所有行，检查是否符合filter，适合便记录其行号。

### join

首先join order经过selinger's algorithm进行优化。

其次采用left deep join。

对于每次join，我使用了 sorted + binary search。简单的来说，sort左表，并对每一个右表的数，使用二分搜索在左表找到一样的数字，并记录左右表的该数字的行号。

如果左右表大小分别为m, n，则一次join的时间复杂度为 `O(m logm + n logm)`。可以看出如果我们sort尺寸较小的那个表，能省不少时间。但是我并没有来得及实现这个。

### sum

很简单的过一遍所有符合条件的行，并求和。

# 提升

经过profile可以发现，join几乎占据了所有的程序运行时间。因此未来重点应该是优化join。

## tuple a time

由于C语言没有好用的generator，所以我并没有采用常见的a tuple a time 的做法，而是转而记录符合条件的行号，虽然这样让本次作业勉强通过了内存限制，但是如果数据量真的大的话，这样做是不行的。未来可以切换到 a tuple a time。

## join

不采用 tuple 的做法的话，最简单提升性能的方法便是在join的时候，对较小的表进行sort。

若要采用 tuple 的做法，则得在读取csv文件时对数据进行索引，这样寻找含有某个数字的行时将快很多。

拥有索引之后，我们可以去右表搜索左表的每一个数字，如果有，则将这一行作为tuple输出。索引只需一次，不用每次join时都排序。