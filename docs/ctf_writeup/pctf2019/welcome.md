## 题目
Do you think this is a normal image? No! Dig deeper to find out more.....

[welcome.jpeg](./problems/welcome.jpeg)

## 解决方案
下载到一个welcome.jpeg，尝试binwalk。

![WELCOME-1.png](./img/WELCOME-1.png)

内含一个zip文件，提取出来：

![WELCOME-2.png](./img/WELCOME-2.png)

得到两个zip文件（？），2968.zip和d.zip，其实解压2968.zip后还是得到一个和d.zip哈希一样的文件，于是关注d.zip。

![WELCOME-3.png](./img/WELCOME-3.png)

解压d.zip，得到a.zip和一个secret.bmp，其中a.zip里有一个a.png但是压缩包加密了。

![WELCOME-4.png](./img/WELCOME-4.png)

先关注secret.bmp，可能含有解开a.zip的密码。但是图片不能打开，于是先看看十六进制：

![WELCOME-5.png](./img/WELCOME-5.png)

有两个等号引人注意，先拿出来尝试BASE64解密。

> dGhlIHBhc3N3b3JkIGlzOiBoMzExMF90aDNyMyE==
>
> the password is: h3110_th3r3!

拿去解压a.zip，成功得到一个a.png，启动StegSolve就很容易看到FLAG：

![WELCOME-6.png](./img/WELCOME-6.png)
