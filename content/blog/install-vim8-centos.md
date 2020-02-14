---
date: '2019-07-18'
title: CentOS 上安装 Vim 8
---

> 来源：[简书](https://www.jianshu.com/p/86298c721111)

新建脚本文件并输入以下内容：

```
rpm -Uvh http://mirror.ghettoforge.org/distributions/gf/gf-release-latest.gf.el7.noarch.rpm
rpm --import http://mirror.ghettoforge.org/distributions/gf/RPM-GPG-KEY-gf.el7
yum -y remove vim-minimal vim-common vim-enhanced sudo
yum -y --enablerepo=gf-plus install vim-enhanced sudo
```

执行脚本文件即可。

> 由于涉及到sudo的安装与删除，所以必须通过脚本文件的方式一齐执行，不然第三行命令删掉sudo后，你就没办法 sudo yum install sudo 了。。。