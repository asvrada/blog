---
title: 如何发布博客
layout: post
thumbnail: "assets/img/blogs/ifttt-banner.png"
tags: [code]
---

静态博客并不能像微信公众号那样主动推送更新到用户手里，也不能像微博那样将更新消息发布出来，只能依靠基本没人用的RSS或者用户手动访问网站来发现更新。

这可不太好。如果有什么办法能自动将更新推送到各大社交平台，让小伙伴们第一时间看到，岂不美哉。我们知道可以通过RSS获取最新消息，如果有什么应用能够根据RSS同步推送通知就好了。

解决办法当然是有的：[**IFTTT**](https://ifttt.com/)
![ifttt-banner]({{ site.baseurl }}/assets/img/blogs/ifttt-banner.png)

---

这个应用能干什么，各位自行查阅网上相关教程就够了，我在此不重复介绍。直接介绍如何通过该应用同步发布博客更新消息。

## 创建 Applets 流程

打开应用后，新建一个Applets。

首先设置触发项 “this”，我们需要在RSS更新时触发该规则。搜索RSS，点进去后选择"New feed item"；

找到自己博客的RSS链接，通常为`www.xxxx.com/feed.xml`，填进来。

![ifttt2]({{ site.baseurl }}/assets/img/blogs/ifttt2.jpg)

接下来设置触发后动作 “that”，这里的选择很多，我就选择发布到Twitter吧（发布到微博的选项似乎不能正常使用）。配置完成

## 运行效果

最新博客自动发布到了Twitter上。
![ifttt-result]({{ site.baseurl }}/assets/img/blogs/ifttt-result.jpg)

这样就可以主动的通知别人，自己的站点更新了。

~~然而并没有人看~~
