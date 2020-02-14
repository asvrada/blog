---
title: 给你的IDE提提速
layout: post
thumbnail: "assets/img/blogs/jetbrains.png"
tags: [note]
---

> 以下“教程”仅适用于[JetBrains](https://www.jetbrains.com/)系列IDE

说到写代码，程序员标配大概率会是轻量级的文本编辑器加上功能齐全的IDE。前者用于小项目的快速开发，后者用于“严肃”的项目开发。

至于IDE，JetBrains家的一系列产品：CLion, PyCharm, WebStorm 等等均为饱受好评的选择。然而由于他们功能齐全， 启动的时候可一点也不快，因此轻巧的文本编辑器也成为不少人不需要IDE那些复杂功能时的替代品。

其实仅需简单点击几下，禁用一些插件，JetBrains系列IDE在启动时就能快上不少。以下教程以WebStorm为例：

---

打开IDE，进入设置界面，找到"Plugins(插件）"选项

[![plugins]({{ site.baseurl }}/assets/img/blogs/plugins.png)]({{ site.baseurl }}/assets/img/blogs/plugins.png)

可以看到这里有N多个启用的插件，而且其中大部分你都是用不到的，可酌情禁用。

具体来说，我推荐禁用掉除Git以外的版本控制系统的插件，反正非特殊情况我们都用的Git。他们有：  
1. CVS  
2. Mercurial  
3. Subversion  

除此之外，还有其他很多辅助工具的插件可以禁用，还请大家自行选择。禁用掉数量可观的插件后，我是能直观感觉到IDE启动速度变快了。
