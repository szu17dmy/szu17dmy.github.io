打开网页，有三个色块，暂时看不到其它内容。Ctrl+U查看源码，有发现：

``` html
<form action='#' method = "GET" target="resultFrame">
    Upload Your Profile Picture : <input type="file" name="profile_pic" >
    <input type="submit" value="Upload Image" name="submit">
</form>
```

竟然有个上传文件的表单。随便选了个文件上传，跳转到一个新页面，有个字符串：

> VGhlX3Njcm9sbF9zYXlzPXRoZV9uaWdodF9raW5nVlN2YWx5cmlhbi50eHQ==
>
> The_scroll_says=the_night_kingVSvalyrian.txt

尝试请求the_night_kingVSvalyrian.txt：

    pctf{You_L00K_Wi3Rd_IN_H3R3}
