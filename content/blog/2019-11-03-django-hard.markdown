---
title: 部署个django真费劲
layout: post
tags: [note]
---

做了一个前后端分离的博客应用，做到一半准备赶鸭子上架先部署到自己的vps上去看看效果。结果干了一晚上还没搞定。。。来写一下过程发泄一下。

## 前端
前端很简单，用react写完一build，就只是一堆静态文件而已，丢到服务器上再用nginx做服务器，网页部分就部署完成了。这里有个小坑就是我这react应用自带router的，所有应用逻辑都从`index.html`开始，需要额外配置一下nginx`try $url index.html`啥的让其去找`index.html`开始。

## 后端
痛苦开始了。后端使用Django框架，我心想这么流行的工具肯定部署这方面已经很成熟了。但是。。。这不对啊。首先测试时使用的`python manage.py runserver`肯定是不能拿到production环境来用的。由于好久没搞过服务器了，搜了半天才醒悟需要`WSGI`来连接nginx和django。整体信息传递如下

`client - 通过HTTPS -> nginx - 通过socket/port -> wsgi -> django`

在找wsgi服务器这块就浪费了绝大部分的时间。一开始我直接用uWSGI，但是怎么都设置不好，于是转去一个网上老是提及的应用gunicorn。但是我设置完了面对SSL ERROR才醒悟，这玩意自己似乎就是个服务器，导致整个流程变成了这个样子

`client -> nginx -proxy-> gunicorn -> wsgi -> django`

由于我服务器配置了HTTPS，而简单的一个proxy导致HTTPS相关的证书啥啥的不正确。我发现这么做不行的时候心态已经有点崩了，目前没心情去自己了解SSL证书相关的东西。总之proxy+gunicorn不行。还是得回到手动运行uwsgi的老路上。

用WSGI的问题就是这玩意根本不知道该怎么配置，nginx里配置应该长这个样子

```
server {
    listen 8000;
    location / {
        wsgi_pass xxxxx.sock;
        include_param xxxxx.conf;
    }
}
```

但是这个配置文件我还没心情去看怎么写，因为我在尝试运行wsgi服务的时候心态又炸了。uwsgi只能通过pip安装，由于我用虚拟环境管理python版本，pip会把这玩意装到机器上的python虚拟环境里。导致目前启动这服务这方面还有点问题。今晚已经不想搞了。从吃完晚饭开始一直在配服务配环境，太上头连本该写的作业都没写。太难受了。