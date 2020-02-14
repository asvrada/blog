---
title: Docker 入门笔记
layout: post
tags: [code]
---

> [教程链接](https://training.play-with-docker.com)
> 
> [搭建pyhon+nginx](https://www.oschina.net/translate/serving-flask-with-nginx-on-ubuntu)
> 
> [安装nginx](https://www.digitalocean.com/community/tutorials/how-to-install-nginx-on-ubuntu-18-04)

# 控制台指令用法
## 1. exec
执行一条指令。
比如连接到某正在运行的container:

`docker exec -it [name] bash`

常用flag：

`--interactive --tty`

## 2. container run
常用flag:

`--detach --publish --mount`

1. `--publish portA:portB`
	
portA是host的，B是container里的


# Dockerfile
样例：

```
FROM nginx:latest

COPY index.html /usr/share/nginx/html
COPY linux.png /usr/share/nginx/html

EXPOSE 80 443     

CMD ["nginx", "-g", "daemon off;"]
```

内部expose端口之后，运行时还需要绑定到host的端口：
`--publish 80:80`

