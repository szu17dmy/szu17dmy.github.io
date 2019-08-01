我就假设你已经要开始部署你的服务到云主机上，让大家来查看你的成果了。另外，我还假设你的技术栈是LNMP。（其实开发过程中用也没啥问题）

在过去，为了部署这些服务，你需要折腾相当一部分命令和配置文件，我知道这可能对一些同学来说是很简单的，但是可能对某些同学来说会很困难。不信？你可以看看Google上有多少关于配置这些东西时候遇到的问题。

这也就是为啥网上会有各种不总是那么靠谱的一键安装脚本之类的东西了。不过，你的云主机提供商也可能为你提供了你需要的已经部署好环境的镜像，这要靠谱得多，你只需要购买他们的云主机产品，一般就能选择到适合自己的镜像然后部署到云主机上。

但是比起镜像，我还是推荐你使用Docker。首先，利用docker-compose，你可以一键快速地部署好应用；其次，一定程度上的隔离能使得服务器上的资源被更好地管理，也更安全；还有，在其他机器上部署、迁移都可以变得相当快。

我就不在这里瞎扯这些优点了，有关这些内容，你可以参阅很多东西：

[Why Docker? | Docker](https://www.docker.com/why-docker)

[Docker 有什么优势？ - 知乎](https://www.zhihu.com/question/22871084)

## 首先你要有个云主机
事实上你可以在本地上安装Docker，并且部署服务。甚至可以在自己的虚拟机上安装。不过，在云主机上拉取镜像、安装依赖都要比本地快得多，问题也少得多。

如果你还没有云主机，我推荐使用这些：

[轻量应用服务器\_Web服务器租赁\_网站服务器价格\_VPS服务器租用\_简单的服务器 - 阿里云](https://cn.aliyun.com/product/swas)

我建议购买香港的服务器，这样就可以免去备案的流程，并且访问也不至于慢。24元/月1C1G25G、34元/月1C2G50G的配置也算相当便宜了。

另外，还有这家也不错：

[DigitalOcean – The developer cloud](https://m.do.co/c/680e3885cb0e)

这个链接内含我的邀请。印象中我刚入学那会儿申请[GitHub Student Developer Pack - GitHub Education](https://education.github.com/pack)可以有一定数额的试用。最低5美元/月，按小时计费。

当然，这个价位的线路必然是一般的那种。如果你想要CN2之类的就自行发掘吧。

你可能知道有10元/月的学生特供主机，不过它在大陆区域内，也就意味着你需要备案才能将域名解析到这个主机上。

## 假设你已经拥有了一个云主机
安装的时候选择一个纯净的系统镜像就可以了。

!!! tip
    安装系统时请注意，建议通过密钥连接而非密码。
    
    你应该会连接你的主机吧？你可以选择通过主机商的WebShell进行连接并进行控制，或是通过SSH使用密钥进行连接。如果你正在使用Windows，我建议使用Xshell通过SSH来连接并控制你的服务器、用Xftp来传输文件。

你可能有一定使用Linux的基础，不过也请不要先急着直接用你的包管理工具直接开始安装Docker。请参阅这里开始安装：

对于CentOS，请查看这里：[Get Docker Engine - Community for CentOS | Docker Documentation](https://docs.docker.com/install/linux/docker-ce/centos/)

其他Linux发行版例如Debian、Ubuntu等，可以在上述链接的左侧目录中找到对应系统的安装指南。

我废话几句翻译一下...主要过程就是删掉旧版：

``` bash
$ sudo yum remove docker \
                  docker-client \
                  docker-client-latest \
                  docker-common \
                  docker-latest \
                  docker-latest-logrotate \
                  docker-logrotate \
                  docker-engine
```

然后安装依赖：

``` bash
$ sudo yum install -y yum-utils \
  device-mapper-persistent-data \
  lvm2
```

然后添加repo（其它版本参阅官方文档）：

``` bash
$ sudo yum-config-manager \
    --add-repo \
    https://download.docker.com/linux/centos/docker-ce.repo
```

然后就可以安装Docker了：

``` bash
$ sudo yum install docker-ce docker-ce-cli containerd.io
```

其中GPG key目前应当是`060A 61C5 1B55 8A7F 742B 77AA C52F EB6B 621E 9F35`，否则可能很危险。

注意，这个时候还需要安装一下`docker-compose`：

``` bash
$ sudo yum install docker-compose
```

这样应该就完成了。你需要启动Docker才能开始使用：

``` bash
$ sudo systemctl start docker
```

有关Docker的一些基本概念例如image、container，和一些基本操作例如run、exec，请参阅官方文档：

[docker run | Docker Documentation](https://docs.docker.com/engine/reference/commandline/run/)

有本书不错：[Docker Cookbook - O'Reilly Media](http://shop.oreilly.com/product/0636920036791.do)。中文版书名是**Docker经典实例**。

## 启动
好的我特意写了一个很基础的、甚至没有HTTPS的、但是含有PHP和MySQL的很简单的LNMP的docker-compose：

[szu17dmy/docker-compose-lnmp](https://github.com/szu17dmy/docker-compose-lnmp)

顺便说一下...如果想要HTTPS也很简单，稍微加点东西就可以了，有空再搞。不过我一般没让docker上HTTPS，并且只允许localhost访问，然后再用本地主机上的nginx反向代理它们。

好了直入正题。如果你的主机上有git的话（希望你不用问我没有怎么办...没有就装啊...用包管理器直接装就好了），你就可以直接：

``` bash
git clone https://github.com/szu17dmy/docker-compose-lnmp.git && cd ./docker-compose-lnmp
```

然后就可以来启动服务了：

``` bash
docker-compose up -d
```

这将按照`docker-compose.yml`中的内容来后台启动。正常情况下，你能通过：

``` bash
docker ps -a
```

来查看各容器的运行情况。这个时候，如果你已经通过例如SFTP或是nc等方式将你的代码传到了`www`文件夹下，你可以通过：

``` bash
curl localhost/YOUR_WEB_PAGE_HERE
```

来查看你的主页是否能正常显示。或是直接在你的浏览器里直接访问这台主机的IP和相应的URI。

想改动你的代码？你只需要进入`www`的文件夹，改动里面的代码之后再刷新浏览器就可以了。

## 域名解析
突然发现我忘记提一下这个环节了...

你一定不想每次访问你的网站或是向同学展（xuan）示（yao）都要输一长串IP地址吧，这个时候该来把一个域名解析到你的服务器上了。

根据你的需求和经济条件，选择一个适合自己的域名。托管网站有很多，[阿里云](https://wanwang.aliyun.com/)、[腾讯云](https://dnspod.cloud.tencent.com/)、[GoDaddy](https://www.godaddy.com/)、[name.com](https://www.name.com/)等等，自行选择即可。买下一个域名后，就可以到域名控制台里添加解析记录了。你可以尝试着添加一条指向你的服务器IP的记录，一旦添加成功，你应该就可以通过域名来访问你的服务器了。

在这之后，你可以尝试一下申请免费的SSL证书，来开启你的站点的HTTPS访问。并且，你还可以尝试一下使用[Cloudflare](https://www.cloudflare.com/)的服务来保护你的网站的安全，或是一定程度上降低你的服务器的压力。
