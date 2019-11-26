## 题目
someone want a girlfriend.....

## 解决方案
下载到一个压缩包，解压后是一个512MB的.raw文件。

file一下说是data。binwalk能检出大量文件，根据文件大小和strings的结果猜测这个文件是个内存转储镜像。

直接上[Volatility Framework - Volatile memory extraction utility framework](https://www.volatilityfoundation.org/)，GitHub地址[点此](https://github.com/volatilityfoundation/volatility)。

```
.\volatility_2.6_win64_standalone.exe imageinfo -f '.\Advertising for Marriage.raw'
```

能得到：

```
PS D:\CTF\redhat2019> .\volatility_2.6_win64_standalone.exe imageinfo -f '.\Advertising for Marriage.raw'
Volatility Foundation Volatility Framework 2.6
INFO    : volatility.debug    : Determining profile based on KDBG search...
          Suggested Profile(s) : WinXPSP2x86, WinXPSP3x86 (Instantiated with WinXPSP2x86)
                     AS Layer1 : IA32PagedMemoryPae (Kernel AS)
                     AS Layer2 : FileAddressSpace (D:\CTF\redhat2019\Advertising for Marriage.raw)
                      PAE type : PAE
                           DTB : 0xaf9000L
                          KDBG : 0x80545ce0L
          Number of Processors : 1
     Image Type (Service Pack) : 2
                KPCR for CPU 0 : 0xffdff000L
             KUSER_SHARED_DATA : 0xffdf0000L
           Image date and time : 2019-10-31 07:15:35 UTC+0000
     Image local date and time : 2019-10-31 15:15:35 +0800
```


