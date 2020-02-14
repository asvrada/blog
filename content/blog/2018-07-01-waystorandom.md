---
title: 随机在数组中取k项的几种做法
layout: post
tags: [code]
---

最近在做网页版扫雷小游戏，遇到一个要求是，从一个大小为n的雷区中随机选取k个不重复的方块，用来放置地雷。看似是一个很简单的问题，但是我在写的时候发现有不少思路不同的实现，决定记一下最好的方法，以便日后查看。

先贴上我最终的代码：

```javascript
/**
 * 大致思路：乱序排列一个数组，并取前k个作为地雷
 * todo: make this for-free
 */
generateMines() {
    // 这个是所有地雷位置（用数字表示）的集合
    const setMines = this.setMines;

    // 初始化一个1到n的数组
    let arr = [];
    for (let lop = 0; lop < this.gameboard.length; lop++) {
        arr.push(lop);
    }
    // 随机打乱数组元素的顺序
    shuffle(arr);

    // 将乱序数组的前k个元素当作地雷的位置，放入集合
    for (let lop = 0; lop < this.numMines; lop++) {
        setMines.add(arr[lop]);
    }
}
```

---

接下来讲下其他几种做法。

## 不要这么写
最开始我的思路是这样的：（伪代码）

```javascript
while(setMines.length != numMines) {
    let mine = Math.random();
    if (setMines.has(mine)) {
        continue;
    }

    setMines.add(mine);
}
```
    
大致意思是，不停的随机，直到集合中放满了k个地雷。这样做的缺点显而易见：运行时间不固定，很可能一直随机到已有的元素，导致循环迟迟不能结束。特别是当地雷数量k接近雷区n的时候，每次随机大概率会随机到已经是地雷的数字，造成“死循环”。

## 比上面那个好点
为了解决上一个死循环的问题，我又想了新的方法：

```javascript
generateMinesTheDullWay() {
    const setMines = this.setMines;

     // 循环次数固定
    for (let lop = 0; lop < this.numMines; lop++) {
        // generate a random number range in [0, length)
        let mine = Math.floor(Math.random() * this.gameboard.length);

        while (setMines.has(mine)) {
            // 如果重复了，就顺移到下一个位置
            mine = (mine + 1) % this.gameboard.length;
        }

        setMines.add(mine);
    }
}
```
   
这个方法的运行时间稳定，且随机效果也不错，拿去用足够了。但是这么做还不够抽象，我们可以把该类问题用如下方法解决。

## 抽象做法
对于从n个元素里随机取k个的问题，可以将n个元素各自放入一个集合，然后随机取k次，每取一个元素，就将其从集合中去除，这样便不会重复。

> Credit: [栋神](http://www.cnblogs.com/kirai/)