以前都在折腾openSUSE，在安装的时候能选择是否`Hardware Clock Set to UTC`，就没太关注这个问题，这回搞了下Ubuntu 19.04发现时间有点小问题，Ubuntu每次开机都会自动同步时间，回到Windows下之后时间就不对了，即使Windows下设置了自动同步也不一定能及时同步。主要原因摘抄一下：

> UTC即Universal Time Coordinated，协调世界时（世界统一时间）
>
> GMT 即Greenwich Mean Time，格林尼治平时
>
> Windows 与 Mac/Linux 看待系统硬件时间的方式是不一样的：
>
> Windows把计算机硬件时间当作本地时间(local time)，所以在Windows系统中显示的时间跟BIOS中显示的时间是一样的。
>
> Linux/Unix/Mac把计算机硬件时间当作 UTC， 所以在Linux/Unix/Mac系统启动后在该时间的基础上，加上电脑设置的时区数（ 比如我们在中国，它就加上“8” ），因此，Linux/Unix/Mac系统中显示的时间总是比Windows系统中显示的时间快8个小时。
>
> 所以，当你在Linux/Unix/Mac系统中，把系统现实的时间设置正确后，其实计算机硬件时间是在这个时间上减去8小时，所以当你切换成Windows系统后，会发现时间慢了8小时。就是这样个原因。
>  
> 作者：滑稽
> 链接：[https://www.zhihu.com/question/46525639/answer/157272414](https://www.zhihu.com/question/46525639/answer/157272414)
> 来源：知乎
> 著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。

为了修复这个问题，可以修改Ubuntu的策略：

``` bash
sudo timedatectl set-local-rtc 1 --adjust-system-clock
```

应该就能解决。其中：

> Since Ubuntu 16.04 timedatectl / timesyncd (which are part of systemd) replace most of ntpdate / ntp.
> 
> timesyncd is available by default and replaces not only ntpdate, but also the client portion of chrony (or formerly ntpd). So on top of the one-shot action that ntpdate provided on boot and network activation, now timesyncd by default regularly checks and keeps your local time in sync. It also stores time updates locally, so that after reboots monotonically advances if applicable.
>
> -- [https://help.ubuntu.com/lts/serverguide/NTP.html](https://help.ubuntu.com/lts/serverguide/NTP.html)

还有：

> --adjust-system-clock
>
> If set-local-rtc is invoked and this option is passed, the system clock is
> synchronized from the RTC again, taking the new setting into account. Otherwise, the
> RTC is synchronized from the system clock.
>
> -- [http://manpages.ubuntu.com/manpages/disco/en/man1/timedatectl.1.html](http://manpages.ubuntu.com/manpages/disco/en/man1/timedatectl.1.html)

另外，还可以修改Windows的策略，（在存在夏令时的时候这样做可能更好 ）：

> 打开命令行程序，在命令行中输入下面命令并回车

```
Reg add HKLM\SYSTEM\CurrentControlSet\Control\TimeZoneInformation /v RealTimeIsUniversal /t REG_DWORD /d 1
```

> 作者：滑稽
> 链接：https://www.zhihu.com/question/46525639/answer/157272414
> 来源：知乎
> 著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。

大概就是这样。主要是某些旧的设定已经失效，并且某些发行版的设置区别较大，特意记录一下给懒人们。
