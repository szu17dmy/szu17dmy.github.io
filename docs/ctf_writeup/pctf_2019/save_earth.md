## 题目
In the mid 21st century, Ex-NASA pilot Cooper leaves his little daughter and goes an interstellar journey around the space to find an alternative planet (PLAN A) or to capture gravitational data and send it back to earth, which Scientists will use to save Earth. However Cooper finds himself stuck in a tesseract that spans across time, there is only one way he could transmit the data to his little girl.

We have obtained parts of what Cooper sent to his daughter, can you find the flag and save the earth?

Note: This question does not follow the flag format

题目存档：[SaveEarth.pcap](./problems/SaveEarth.pcap)

## 解决方案
我已经不知道该怎么解释了，反正我做不出来...翻过协议的文档，也尝试过各种办法都没有收获。赛后看别人的文章，发现需要关注数据包中的Leftover Capture Data。于是：

    tshark -r /mnt/c/Users/domain/CTF/pctf2019/SaveEarth.pcap -V | grep "Leftover Capture Data"

就可以得到：

    Leftover Capture Data: 0102000000000000
    Leftover Capture Data: 0104000000000000
    Leftover Capture Data: 0102000000000000
    Leftover Capture Data: 0104000000000000
    Leftover Capture Data: 0101000000000000
    Leftover Capture Data: 0102000000000000
    Leftover Capture Data: 0101000000000000
    Leftover Capture Data: 0104000000000000
    Leftover Capture Data: 0104000000000000
    Leftover Capture Data: 0102000000000000
    Leftover Capture Data: 0104000000000000
    Leftover Capture Data: 0101000000000000
    Leftover Capture Data: 0104000000000000
    Leftover Capture Data: 0104000000000000
    Leftover Capture Data: 0104000000000000
    Leftover Capture Data: 0101000000000000
    Leftover Capture Data: 0104000000000000
    Leftover Capture Data: 0104000000000000
    Leftover Capture Data: 0104000000000000
    Leftover Capture Data: 0104000000000000
    Leftover Capture Data: 0102000000000000
    Leftover Capture Data: 0101000000000000
    Leftover Capture Data: 0104000000000000
    Leftover Capture Data: 0104000000000000
    Leftover Capture Data: 0104000000000000
    Leftover Capture Data: 0102000000000000
    Leftover Capture Data: 0101000000000000
    Leftover Capture Data: 0104000000000000
    Leftover Capture Data: 0104000000000000
    Leftover Capture Data: 0104000000000000
    Leftover Capture Data: 0102000000000000
    Leftover Capture Data: 0102000000000000
    
可以尝试摩斯电码，于是把上文中的0101当作空格，把0102当作-，把0104当作.：
``` cpp
#include <iostream>

int main() {
    while (!std::cin.eof()) {
        char buf[64] = {};
        std::cin.getline(buf, 64);
        std::string string(buf);
        switch (string[26]) {
            case '1':
                std::cout << ' ';
                break;
            case '2':
                std::cout << '-';
                break;
            case '4':
                std::cout << '.';
                break;
            default: ;
        }
    }

    return 0;
}

```

可以得到：

    -.-. - ..-. ... ....- ...- ...--    

解得：

    CTFS4V3
    
这个...毕竟是赛后复现，没有提交过，要是出现什么差错麻烦告诉我...
