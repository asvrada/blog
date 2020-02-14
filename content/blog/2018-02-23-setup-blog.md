---
layout: post
title: 搭建博客记录
tags: [code]
---

使用 GitHub Page 搭建静态博客等网站的关键是一个名叫 jekyll 的软件，该软件能够将纯文本文件转换成HTML页面，之后将这些HTML页面上传到github，便能通过浏览器访问。

其实由于 GitHub 提供 jekyll 支持，你若想通过 GitHub Page 部署静态博客的话，本机都不用安装 jekyll。你上传的文件会被 github 自动编译成相应网页文件。

因此我们只需要找到自己喜欢的博客主题，自定义主题内容，再放上自己的博客文章，上传到 GitHub，配置好 GitHub Page，就ok了。

### 具体流程

#### 1. 准备 blog 相关文件

我这个blog使用了 [Type-on-Strap](https://github.com/Sylhare/Type-on-Strap) 这个主题，纯粹是因为这个主题比较顺眼。

下载该主题后可编辑 `_config.yml` 文件，以自定义主题外观。

之后便是把自己的markdown文件丢进 `_posts` 文件夹，将整个项目上传到GitHub，完成。剩下的事就交给GitHub了。

#### 2. GitHub 相关设置

前往该 blog repo 的设置页面，找到 `GitHub Pages` 的设置区域，来源(source)选择为 master 分支，就OK了。

