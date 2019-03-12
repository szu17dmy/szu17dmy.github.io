## 题目
My friend Alex needs your help very fast. He has been possessed by a ghost and the only way to save him is if you tell the flag to the ghost. Hurry up, time is running out!

Hint: We need a very quick response from you so that you can save him from the ghost by exorcizing it with the flag.

[encoded.txt](./problems/encoded.txt)

## 解决方案
下载到一个只有0和1的文本文档，刚好10000行，猜测可能是100×100的字符画。于是使用OpenCV画图：

``` cpp
#include <iostream>
#include <fstream>
#include <opencv2/opencv.hpp>

int main() {
    std::ifstream inputFileStream("./encoded.txt");
    cv::Mat qr(100, 100, CV_8UC1);

    for (int ir = 0; ir < 100; ++ir) {
        for (int ic = 0; ic < 100; ++ic) {
            uchar pixel;
            inputFileStream >> pixel;
            qr.at<uchar>(ir, ic) = (pixel == '1' ? cv::saturate_cast<uchar>(255) : cv::saturate_cast<uchar>(0));
        }
    }

    cv::imshow("QR", qr);
    cv::imwrite("./qr.png", qr);
    cv::waitKey(0);

    return 0;
}

```

得到一个二维码：

![EXORCISM-1.png](./img/EXORCISM-1.png)

扫码可以得到一个字符串：

    160f15011d1b095339595138535f135613595e1a

题目标题像是提示需要异或，受护网杯2018-迟来的签到题启发，我们先将前5位和**pctf{**异或：

> 0001 0110 0000 1111 0001 0101 0000 0001 0001 1101 - 160f15011d
>
> 0111 0000 0110 0011 0111 0100 0110 0110 0111 1011 - pctf{
>
> 0110 0110 0110 1100 0110 0001 0110 0111 0110 0110 - flagf

有发现！竟然出现了**flag**这个单词，也许我们只需要把字符串和flag异或就会有答案：

![EXORCISM-2.png](./img/EXORCISM-2.png)
