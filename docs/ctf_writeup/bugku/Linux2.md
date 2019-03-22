给你点提示吧：key的格式是KEY{}

题目地址：链接: [http://pan.baidu.com/s/1skJ6t7R](http://pan.baidu.com/s/1skJ6t7R) 密码: s7jy

存档：[brave.zip](./problems/brave.zip)

## 解决方案
解压得到一个20000K的brave，直接上foremost，搞出了一张图片：

![Linux2-1.jpg](./img/Linux2-1.jpg)

要提交才发现题目说了格式是KEY{}，得，不用交了，不过：

    strings ./brave | grep KEY{
    
拿到了：

![Linux2-2.png](./img/Linux2-2.png)

    KEY{24f3627a86fc740a7f36ee2c7a1c124a}
