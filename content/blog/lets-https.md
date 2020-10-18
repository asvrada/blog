---
date: '2018-11-16'
title: 搭建HTTPS记录
category: note
---

闲来无事，我又双叒叕创了个服务器。这次我决定走的远一点，给他上个SSL玩玩，毕竟纯HTTP的请求已经开始被时代所抛弃。

我这服务器使用了以下配置：

1. Ubuntu 18.04 LTS
2. nginx （apt install的）
3. Google Domain: [kksk.biz](http://kksk.biz)

# 获取证书

我使用的免费的 [Let's Encrypt](https://letsencrypt.org)。  
具体流程根据其网站的说明进行，完成后你的服务器上应该就有这么几个文件了：

```bash
xxx@xxx:/etc/letsencrypt/live/[you.website.com]# l
cert.pem@  chain.pem@  fullchain.pem@  privkey.pem@  README
```

# 安装证书
我使用的服务器是nginx，因此找到nginx站点的配置文件（位于`/etc/nginx/sites-available`）

编辑实例如下：  

```bash
server {
	listen 80 default_server;
	listen [::]:80 default_server;
	return 301 https://$host$request_uri;
}

server {
	# SSL configuration
	#
	listen 443 ssl default_server;
	listen [::]:443 ssl default_server;

	ssl_certificate /etc/letsencrypt/live/kksk.biz/fullchain.pem;
	ssl_certificate_key /etc/letsencrypt/live/kksk.biz/privkey.pem;

	ssl_protocols       TLSv1 TLSv1.1 TLSv1.2;
	ssl_ciphers         HIGH:!aNULL:!MD5;
```

第一个server block用于将http的请求全部转为https。

重启后服务器打开浏览器验证，kksk！

![https](https://i.imgur.com/PdEPcQI.png)

---

nginx的ssl配置有挺多门道的，要用于正式环境的话这么简单的配置估计是不够的，延伸阅读如下：

1. [Wildcard SSL cert](https://medium.com/@utkarsh_verma/how-to-obtain-a-wildcard-ssl-certificate-from-lets-encrypt-and-setup-nginx-to-use-wildcard-cfb050c8b33f)
2. [optimizing https nginx](https://bjornjohansen.no/optimizing-https-nginx)
3. [Redict http to https](https://bjornjohansen.no/redirect-to-https-with-nginx)
4. [Conf https servers](http://nginx.org/en/docs/http/configuring_https_servers.html)