---
title: 用一行指令快速完美下载YouTube视频
layout: post
tags: [code]
---

> 本文仅注重`youtude-dl`的实际使用。有关该工具的下载与安装，还请查阅他人的文章。

## 配置

```bash
youtube-dl -f "bestvideo+bestaudio[ext=m4a]" --recode-video mp4 --proxy [具体内容请看下文]
```

推荐创建一个alias，这样使用时不用每次都复制这么一长串的指令：
打开控制台的配置文件(我使用zsh，所以是~/.zshrc), 写入以下命令：

```bash
alias youtube='youtube-dl -f "bestvideo+bestaudio[ext=m4a]" --recode-video mp4 --proxy [具体内容请看下文]'
```

以后使用时直接在控制台输入`youtube [YouTube URL]`就可以了。

## 解释
下面简要介绍一下各个参数的意义。

```bash
-f "bestvideo+bestaudio[ext=m4a]"
```

总是选取最高质量的视频+最高质量的m4a格式的音频。

m4a格式大概是兼容性比较好，无需转码就可以丢进mp4容器里。因此优先选择这个格式。

```bash
--recode-video mp4
```

下载的视频不是mp4格式时，将视频重新编码为mp4格式。

这个没什么好说的了，mp4格式兼容性好，可直接复制到移动端进行播放。需要注意的是，重新编码是非常慢的，请为此预留时间。

```bash
--proxy [翻墙软件的代理地址]
```

这个参数通常是我们用来番蔷的。墙内酸酸用户需要填写这个，以实现正常下载。

* macOS 用户
    * 打开酸酸的配置窗口，根据该窗口内容填写：
	   
       ![](https://i.loli.net/2018/08/07/5b6927d531238.png)
	
    * 比如根据上图，代理地址为`127.0.0.1:1087`

* window 用户
    * 我手上没有window电脑，因此无法给出详细教程。但是我记得酸酸的默认监听地址为`127.0.0.1:1080`，可以试试这个地址。

	
找到自己软件的代理地址后，填写进参数就行了。如下：

```bash
# 每个人的地址可能不同，以下仅供参考
--proxy 127.0.0.1:1087
```

## 示例

以YouTube视频 Cyberpunk 2077 E3 2018 宣传片为例（因为这很cooool）

视频地址为：`https://www.youtube.com/watch?v=8X2kIfS6fb8`

命令行命令便是：
```bash
youtube-dl -f "bestvideo+bestaudio[ext=m4a]" --recode-video mp4 --proxy 127.0.0.1:1087 https://www.youtube.com/watch?v=8X2kIfS6fb8
```

下载完成后我便得到了一个171MB的mp4视频文件，分辨率为该视频的最高分辨率：4K。

![](https://i.loli.net/2018/08/07/5b692a5cd50cf.png
)
