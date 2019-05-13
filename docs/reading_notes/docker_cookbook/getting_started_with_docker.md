## 1.11 在docker中运行Hello World
### 1.11.1 问题
> 你已经拥有一台Docker主机，想运行你的第一个容器。你想学习容器的不同生命周期。比如，你想运行一个容器并在其中打印hello world。

### 1.11.2 解决方案
> 你已经见过了

    $ docker ps

> 命令，该命令用于列出所有运行中的容器。
>
> 首先，你想启动一个容器。让我们立即开始，执行`docker run`命令，如下所示。

    $ docker run busybox echo hello world

> 容器来源于镜像。`docker run`命令与需要一个参数来指定使用哪个镜像。

### 1.11.3 讨论
> 如果列出运行中的容器，你会发现没有容器正在运行。这是因为容器一旦完成了它的工作（输出hello world），就停止了。但是容器并没有完全消失，你可以通过

    $ docker ps -a

> 命令看到这个容器。
>
> 你可以通过

    $ docker rm 8f7089b187e8

> 命令将这个容器永久删除。该容器使用的镜像已经被下载到了本地，

    $ docker image

> 命令将会输出这个镜像的信息。
>
> 如果任何运行中或者已经停止的容器都没有使用这个镜像，你就可以通过

    $ docker rmi busybox

> 命令来删除这个镜像。
>
> 运行echo命令虽然很有趣，但是获得一个终端会话会更好。要想在容器中运行`/bin/bash`，你需要使用`-t`和`-i`参数来获得一个交互式会话，下面以使用Ubuntu镜像为例进行说明。

    $ docker run -t -i ubuntu:14.04 /bin/bash

> 你会看到Docker下载的ubuntu:14.04镜像由多个层组成，然后你得到了一个容器中root权限的会话。提示符也显示了这个容器的ID。一旦你推出这个终端，该容器就会停止运行，就像我们前面的hello world例子一样。

## 1.12 以后台方式运行docker容器
### 1.12.1 问题
> 你已经知道如何以交互方式启动一个容器，但是你想以后台方式运行一个服务。

### 1.12.2 解决方案
> 使用`docker run`的`-d`选项。
>
> 运行下面的命令，将会在容器中启动一个简单的基于Python的HTTP服务器。

    $ docker run -d -p 1234:1234 python:2.7 python -m SimpleHTTPServer 1234

### 1.12.3 讨论
> 这个`-d`参数会让容器在后台运行。你可以通过运行`exec`命令来启动一个bash shell，再次进入到该容器中，如下所示。

    $ docker exec -ti 9d7cebd75dcf /bin/bash

> 在官方文档（[https://docs.docker.com/reference/run/](https://docs.docker.com/reference/run/)）[^1]中还有`docker run`的其他很多选项。

[^1] 原文如此，现在应该是[https://docs.docker.com/engine/reference/commandline/run/](https://docs.docker.com/engine/reference/commandline/run/)

## 1.13 创建、启动、停止和移除容器
### 1.13.1 问题
> 你已经知道如何启动一个容器并让它在后台运行。你希望学习基本命令来管理容器的整个生命周期。
   
### 1.13.2 解决方案
> 使用 Docker 命令行的`create`、`start`、`stop`、`kill`和`rm`命令。你可以在这些命令后面加上`-h`或者`——h`选项来查看它们的使用方法，或者只输入命令而不指定任何参数（比如`docker create`）。

### 1.13.3 讨论
> 在范例 1.12 中，你通过`docker run`自动启动了一个容器。你也可以通过`docker create`命令来创建一个容器。继续使用上面简单的HTTP服务器的例子，唯一的区别就是这里没有指定`-d`选项。当创建容器之后，你需要运行`docker start`来启动这个容器，如下所示。

    $ docker create -P ——expose=1234 python:2.7 python -m SimpleHTTPServer 1234
    $ docker ps -a
    $ docker start a842945e2414
    $ docker ps
   
> 要想停止一个正在运行中的容器，可以选择使用`docker kill`（这个命令会发送SIGKILL信号到容器）或者`docker stop`（这个命令会发送SIGTERM到容器，如果在一定时间内容器还没有停止，则会再发送SIGKILL信号强制停止）。这两个命令最终的结果是停止容器的运行，该容器将不会出现在`docker ps`返回的运行中容器列表中。但是，容器还没有完全消失（比如容器的文件系统还在）。你可以通过`docker restart`来重启这个容器，或者通过`docker rm`移除这个容器，如下所示。

    $ docker restart a842945e2414
    $ docker ps
    $ docker kill a842945e2414
    $ docker rm a842945e2414
    $ docker ps -a

> 如果你有很多停止中的容器待删除，可以在一条命令中使用嵌套的 shell 来删除所有容器。`docker ps`的`-q`选项只会返回容器的 ID 信息，如下所示。
    
    $ docker rm $(docker ps -a -q)

## 1.14 使用Dockerfile构建Docker镜像
### 1.14.1 问题
> 你知道了如何从公有的Docker registry下载镜像，但是你想构建自己的Docker镜像。

### 1.14.2 解决方案
> 使用Dockerfile构建镜像。Dockerfile是一个文本文件，它记述了Docker构建一个镜像所需要的过程，包括安装软件包、创建文件夹、定义环境变量以及其他一些操作。在第2章中我们会对Dockerfile和构建镜像做更深入的说明。本范例中只会涉及构建镜像的基本概念。
>
> 作为一个简单例子，我们假设你要基于 busybox 镜像创建一个新镜像，并定义一个环境变量。busybox 镜像是一个包含了 busybox（[http://www.busybox.net/about.html](http://www.busybox.net/about.html)）二进制文件的 Docker 镜像，这个二进制文件将很多 Unix 实用工具打包到了一个单一的二进制文件中。在一个空文件夹下创建一个名为 Dockerfile 的文件，如下所示。

    FROM busybox
    ENV foo=bar

> 可以通过`docker build`命令来构建一个新镜像，并命名为`busybox2`，如下所示。
   
    $ docker build -t busybox2 .

> 构建结束之后，你就能通过`docker images`命令看到新构建的镜像了。可以基于这个新镜像启动一个容器，检查一下其中是否有一个名为`foo`的环境变量，并且其值被设置为了`bar`，如下所示。
    
    $ docker images
    $ docker run busybox2 env | grep foo

### 1.14.3 参考
> Dockerfile 参考指南（[https://docs.docker.com/reference/builder/](https://docs.docker.com/reference/builder/)）[^1]
>
> 第 2 章，其中会对创建镜像和共享镜像进行说明

[^1] 现在是[https://docs.docker.com/engine/reference/builder/](https://docs.docker.com/engine/reference/builder/)

## 1.15 在单一容器中使用Supervisor运行WordPress
### 1.15.1 问题
> 你已经知道了如何将两个容器链接到一起（参见范例1.16），不过你希望在一个容器中运行应用程序所需的所有服务。以运行WordPress为例，你想在一个容器中同时运行MySQL和HTTPD服务。由于Docker运行的是前台进程，所以你需要找到一种同时运行多个“前台”进程的方式。
### 1.15.2 解决方案
> 使用Supervisor（[http://supervisord.org/index.html](http://supervisord.org/index.html)）来监控并运行MySQL和HTTPD。Supervisor不是一个init系统，而是一个用来控制多个进程的普通程序。
>
> 本范例是一个在容器中使用Supervisor同时运行多个进程的例子。你可以以此为基础在一个Docker镜像中运行多个服务（比如SSH、Nginx）。本范例中，WordPress的配置是一个最精简的可行配置，并不适用于生产环境。
>
> 示例中的文件可以在GitHub（[https://github.com/how2dock/docbook/tree/master/ch01/supervisor](https://github.com/how2dock/docbook/tree/master/ch01/supervisor)）下载。这些文件中包括一个用于启动虚拟机的Vagrantfile，Docker运行在该虚拟机中，还包含一个Dockerfile来定义要创建的镜像，此外还有一个Supervisor的配置文件（supervisord.conf）和一个WordPress的配置文件（wp-config.php）。
>
> 如果你不想使用Vagrant，也可以使用其中的Dockerfile、supervisord和WordPress的配置文件，在自己的Docker主机上来安装。
>   
> 为了运行WordPress，你需要安装MySQL、Apache 2（即httpd）、PHP以及最新版本的WordPress。你将需要创建一个用于WordPress的数据库。在该范例的配置文件中，WordPress数据库用户名为root，密码也是root，数据库名为wordpress。如果你想对数据库的配置进行修改，需要同时修改wp-config.php和Dockerfile这两个文件，并让它们的设置保持一致。
>
> Dockerfile文件用来描述一个Docker镜像是如何构建的，后面章节会有关于Dockerfile的详细说明。如果这是你第一次使用Dockerfile文件，那么你可以直接使用下面的文件，以后再学习Dockerfile（参见范例2.3对Dockerfile的介绍）。

``` dockerfile
FROM ubuntu:14.04
RUN apt-get update ＆＆ apt-get -y install \
  apache2 \
  php5 \
  php5-mysql \
  supervisor \
  wget
RUN echo 'mysql-server mysql-server/root_password password root' | \
  debconf-set-selections ＆＆ \
  echo 'mysql-server mysql-server/root_password_again password root' | \
  debconf-set-selections
RUN apt-get install -qqy mysql-server
RUN wget http://wordpress.org/latest.tar.gz ＆＆ \
  tar xzvf latest.tar.gz ＆＆ \
  cp -R ./wordpress/* /var/www/html ＆＆ \
  rm /var/www/html/index.html
RUN (/usr/bin/mysqld_safe ＆); sleep 5; mysqladmin -u root -proot create wordpress
COPY wp-config.php /var/www/html/wp-config.php
COPY supervisord.conf /etc/supervisor/conf.d/supervisord.conf
EXPOSE 80
CMD ["/usr/bin/supervisord"]
```
> Supervisor的配置文件supervisord.conf如下所示。
    
    [supervisord]
    nodaemon=true
    [program：mysqld]
    command=/usr/bin/mysqld_safe
    autostart=true
    autorestart=true
    user=root
    [program：httpd]
    command=/bin/bash -c "rm -rf /run/httpd/* ＆＆ /usr/sbin/apachectl -D FOREGROUND"

> 这里定义了两个被监控和运行的服务：mysqld和httpd。每个程序都可以使用诸如autorestart和autostart等选项。最重要的指令是command，其定义了如何运行每个程序。在这个例子中，Docker容器只需要运行一个前台进程：supervisord。从Dockerfile中的`CMD ["/usr/bin/supervisord"]`这一行也能看出来。

> 在你的Docker主机上，构建该镜像并启动一个后台容器。如果按照例子中的配置文件使用了基于Vagrant的虚拟机，可以执行如下命令。

    $ cd /vagrant
    $ docker build -t wordpress .
    $ docker run -d -p 80：80 wordpress

> 容器启动后还会在宿主机和Docker容器之间为80端口进行端口映射。现在只需要在浏览器中打开http://＜ip_of_docker_host＞，就可以进入到WordPress的配置页面了。

### 1.15.3 讨论
> 尽管通过Supervisor在一个容器内同时运行多个应用服务工作起来非常完美，但是你最好还是使用多个容器来运行不同的服务。这能充分利用容器的隔离优势，也能帮助你创建基于微服务设计思想的应用（参见《微服务设计》）。最终这也将会使你的应用更具弹性和可扩展性。

### 1.15.4 参考
> Supervisor 文档（[http://supervisord.org/index.html](http://supervisord.org/index.html)）
>
> Docker Supervisor 文档（[https://docs.docker.com/articles/using_supervisord/](https://docs.docker.com/articles/using_supervisord/)）

## 1.16 使用两个链接在一起的容器运行 WordPress 博客程序
### 1.16.1 问题
> 你希望通过容器来运行一个WordPress网站（[http://wordpress.com/](http://wordpress.com/)），但是你不想让MySQL和WordPress在同一个容器中运行。你时刻谨记对关注点进行分离的原则，并尽可能地对应用程序的不同组件进行解耦。

### 1.16.2 解决方案
> 启动两个容器：一个运行来自Docker Hub（[http://hub.docker.com/](http://hub.docker.com/)）的官方WordPress，另一个运行MySQL数据库。这两个容器通过Docker命令行工具的`——link`选项链接在一起。
>
> 开始下载最新的WordPress（[https://hub.docker.com/_/wordpress](https://hub.docker.com/_/wordpress)）和MySQL（[https://hub.docker.com/_/mysql/](https://hub.docker.com/_/mysql/)）镜像，如下所示。
    
    $ docker pull wordpress:latest
    $ docker pull mysql:latest
    $ docker images

