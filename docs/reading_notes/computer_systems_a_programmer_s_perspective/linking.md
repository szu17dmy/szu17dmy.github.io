> *链接*（linking）是将各种代码和数据片段收集并组合成为一个单一文件的过程，这个文件可被*加载*（复制）到内存并执行。

## 7.1 编译器驱动程序
> 大多数编译系统提供*编译器驱动程序*（compiler driver），它代表用户在需要时调用语言预处理器、编译器、汇编器和链接器。比如，要用GNU编译系统构造示例程序，我们就要通过在shell中输入下列命令来调用GCC驱动程序：

``` bash
linux> gcc -Og -o prog main.c sum.c
```

> 图7-2概括了驱动程序在将示例程序从ASCII码源文件翻译成可执行目标文件时的行为。（如果你想看看这些步骤，用`-v`选项来运行GCC。）驱动程序首先运行C预处理器（cpp）[^1]，它将C的源程序main.c翻译成一个ASCII码的中间文件main.i：

``` bash
cpp [other arguments] main.c /tmp/main.i
```

> 接下来，驱动程序运行C编译器（cc1），它将main.i翻译成一个ASCII汇编语言文件main.s：

``` bash
cc1 /tmp/main.i -Og [other arguments] -o /tmp/main.s
```

> 然后，驱动程序运行汇编器（as），它将main.s翻译成一个*可重定位目标文件（relocatable object file）*main.o：

``` bash
as [other arguments] -o /tmp/main.o /tmp/main.s
```

> 驱动程序经过相同的过程生成sum.o。最后，它运行链接器ld，将main.o和sum.o以及一些必要的系统目标文件组合起来，创建一个*可执行目标文件（executable object file）*prog：

``` bash
ld -o prog [system object file and args] /tmp/main.o /tmp/sum.o
```

> shell调用操作系统中一个叫做*加载器（loader）*的函数，它将可执行文件prog中的代码和数据复制到内存，然后将控制转移到这个程序的开头。

## 7.2 静态链接
> 向Linux LD程序这样的*静态链接器（static linker）*以一组可重定位目标文件和命令行参数为输入，生成一个完全链接的、可以加载和运行的可执行目标文件为输出。输入的可重定位目标文件由各种




[^1]: 在某些GCC版本中，预处理器被集成到编译器驱动程序中。
