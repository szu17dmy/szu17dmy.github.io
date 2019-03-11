这大概是记录一下自己使用vector容器的经历吧，希望可以对大家有所启发。如果你还不会使用vector容器，你可以找到很多非常好的资源，不管是从书上还是从互联网上。

没有办法把所有的方法都写一遍，你可以看[参考手册](http://www.cplusplus.com/reference/vector/)或其他资料。下述代码在openSUSE Tumbleweed + JetBrains CLion 2018.3.4 + gcc 8.2.1上构建并测试运行通过。

更新：对不起，忘记说了，项目标准是C++11：
```
set(CMAKE_CXX_STANDARD 11)
```

## 刚开始学习的时候
大概是能勉强使用一些基本的成员函数，比如：
``` cpp
#include <iostream>
#include <vector>

int main() {
    std::vector<int> vector;
    vector.push_back(0);
    vector.push_back(1);
    vector.push_back(2);
    vector.push_back(3);
    vector.push_back(4);
    vector.push_back(5);

    std::cout << vector.front() << *(vector.begin() + 1) << vector[2]
              << vector.at(3) << *(vector.end() - 2) << vector.back()
              << vector.size() << std::endl;

    return 0;
}

```
构建并运行可以得到：
```
/home/domain/CLionProjects/untitled_cpp11/cmake-build-debug/untitled_cpp11
0123456

Process finished with exit code 0

```

还有其它的一些例如插入、删除等操作：
``` cpp
#include <iostream>
#include <vector>

template <typename T>
void println(const std::vector<T> &vector) {
    for (size_t i = 0; i < vector.size(); ++i) {
        std::cout << vector[i] << ' ';
    }
    std::cout << std::endl;
}

int main() {
    std::vector<int> vector;
    vector.push_back(0);
    println(vector);
    vector.insert(vector.begin(), -1);
    println(vector);
    vector.erase(vector.end() - 1);
    println(vector);
    vector.clear();
    std::cout << (vector.empty() ? "TRUE" : "FALSE") << std::endl;

    return 0;
}

```
构建并运行可以得到：
```
/home/domain/CLionProjects/untitled_cpp11/cmake-build-debug/untitled_cpp11
0 
-1 0 
-1 
TRUE

Process finished with exit code 0

```

## 学会使用一些算法
使用一些排序等算法：
``` cpp
#include <iostream>
#include <vector>
#include <algorithm>

template <typename T>
void println(const std::vector<T> &vector) {
    for (size_t i = 0; i < vector.size(); ++i) {
        std::cout << vector[i] << ' ';
    }
    std::cout << std::endl;
}

int main() {
    std::vector<int> vector;
    vector.push_back(3);
    vector.push_back(2);
    vector.push_back(1);
    println(vector);
    std::sort(vector.begin(), vector.end());
    println(vector);
    std::reverse(vector.begin(), vector.end());
    println(vector);

    return 0;
}

```
可以得到：
```
/home/domain/CLionProjects/untitled_cpp11/cmake-build-debug/untitled_cpp11
3 2 1 
1 2 3 
3 2 1 

Process finished with exit code 0

```
还有大量算法可以在[这里](http://www.cplusplus.com/reference/algorithm/)查阅。

## 构造函数
最早大概是这样子糊弄一维数组的：
``` cpp
#include <iostream>
#include <vector>

int main() {
    std::vector<int> vector;
    for (int i = 0; i < 5; ++i) {
        vector.push_back(0);
    }

    return 0;
}

```
看到IDE的建议，于是Alt+Enter，为vector预留空间：
``` cpp
#include <iostream>
#include <vector>

int main() {
    std::vector<int> vector;
    vector.reserve(5);
    for (int i = 0; i < 5; ++i) {
        vector.push_back(0);
    }

    return 0;
}

```
但是到后来才知道应该利用构造函数：
``` cpp
#include <iostream>
#include <vector>

int main() {
    std::vector<int> vector(5, 0);

    return 0;
}

```
具体可查看[参考](http://www.cplusplus.com/reference/vector/vector/vector/)。对，即使是这样，也还是有黑历史，比如二维数组：(反例请勿模仿)
``` cpp
#include <iostream>
#include <vector>

int main() {
    std::vector<std::vector<int> > vector;
    std::vector<int> vec;
    vec.reserve(5);
    for (int ic = 0; ic < 5; ++ic) {
        vec.push_back(0);
    }
    vector.reserve(5);
    for (int ir = 0; ir < 5; ++ir) {
        vector.push_back(vec);
    }

    return 0;
}

```
后来才慢慢悟出应该这样：
``` cpp
#include <iostream>
#include <vector>

int main() {
    std::vector<std::vector<int> > vector(5, std::vector<int>(5, 0));

    return 0;
}

```
未完待续
