## 题目
Do prepare to see cookies lurking everywhere.

http://159.89.166.12:13500/

## 解决方案
打开网页后，感觉都在提Cookie，F12打开开发者工具看看Cookie。能发现响应头的Set-Cookie在变化，并且查到前两个分别是pc和tf的哈希值：

> bc54f4d60f1cec0f9a6cb70e13f2127a
>
> 114d6a415b3d04db792ca7c0da0c7a55

应该是flag每两个字符去哈希，然后每次响应头的Set-Cookie，是请求头的Cookie对应两位字符的后两位字符的哈希，也就是说只要不断拿返回的新Cookie去请求，就可以拿到全部（我在说什么玩意儿）。

...我还是重新说一遍吧，刚开始没有Cookie，服务器会返回Set-Cookie是pc的哈希值（bc54开头的），然后浏览器再次请求这个页面就会带上bc54开头的Cookie，这时候服务器就会返回pc的后两位也就是tf的哈希值（114d开头的），以此类推，直到又出现pc的哈希值就可以停下了。

于是乎：

``` python
import requests

headers = {
    'Cookie': 'flag=bc54f4d60f1cec0f9a6cb70e13f2127a'
}

while True:
    print(headers['Cookie'])
    res = requests.get('http://159.89.166.12:13500/', headers=headers)
    headers['Cookie'] = res.headers['Set-Cookie']
    if headers['Cookie'] == 'flag=bc54f4d60f1cec0f9a6cb70e13f2127a':
        break

```

应该能得到：
```
flag=bc54f4d60f1cec0f9a6cb70e13f2127a
flag=114d6a415b3d04db792ca7c0da0c7a55
flag=b2984e12969ad3a3a2a4d334b8fb385a
flag=6f570c477ab64d17825ef2d2dfcb6fe4
flag=988287f7a1eb966ffc4e19bdbdeec7c3
flag=0d4896d431044c92de2840ed53b6fbbd
flag=f355d719add62ceea8c150e5fbfae819
flag=12eccbdd9b32918131341f38907cbbb5
flag=639307d281416ad0642faeaae1f098c4
flag=96bc320e4d72edda450c7a9abc8a214f
flag=c716fb29298ad96a3b31757ec9755763
flag=51de5514f3c808babd19f42217fcba49
flag=05cb7dc333ca611d0a8969704e39a9f0
flag=bc781c76baf5589eef4fb7b9247b89a0
flag=ff108b961a844f859bd7c203b7366f8e
flag=2349277280263dff980b0c8a4a10674b
flag=0b1cdc9fe1f929e469c5a54ffe0b2ed5
flag=364641d04574146d9f88001e66b4410f
flag=c758807125330006a4375357104f9a82
flag=fcfdc12fb4030a8c8a2e19cf7b075926
flag=440c5c247c708c6e46783e47e3986889
flag=97a7bf81a216e803adfed8bd013f4b85
flag=c1d12de20210d8c1b35c367536e1c255
flag=a8655da06c5080d3f1eb6af7b514e309
```

一个个去搜好像也不是什么大问题，但是也可以写个脚本生成字典，毕竟都是两位字符的哈希值。最后得到：

    pctf{c0oki3s_@re_yUm_bUt_tHEy_@ls0_r3vEaL_@_l0t}
