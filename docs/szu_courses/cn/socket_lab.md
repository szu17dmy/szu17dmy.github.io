其实没啥好写的，就是整理一下代码。

## 4-1
### 使用InetAddress类的方法获取本地机的名称和IP地址
这个没啥好说的。

``` java
package ipAddr;

import java.net.InetAddress;
import java.net.UnknownHostException;

public class Local {

    public static void main(String[] args) {
        new Local();
    }

    private Local() {
        try {
            InetAddress inetAddress = InetAddress.getLocalHost();
            System.out.println(inetAddress.getHostName());
            System.out.println(inetAddress.getHostAddress());
        } catch (UnknownHostException e) {
            e.printStackTrace();
        }
    }

}

```

可以得到：

```
linux-521z
192.168.2.209
```

### 使用InetAddress类的方法获取网站www.csdn.net的IP地址
> 如果存在多个IP地址，要求全部返回。
  
道理和上面差不多。

``` java
package ipAddr;

import java.net.InetAddress;
import java.net.UnknownHostException;

public class Remote {

    public static void main(String[] args) {
        new Remote("www.csdn.net");
    }

    private Remote(String URL) {
        try {
            InetAddress[] inetAddress = InetAddress.getAllByName(URL);
            for (InetAddress i : inetAddress) {
                System.out.println(i);
            }
        } catch (UnknownHostException e) {
            e.printStackTrace();
        }
    }

}

```

可以得到：

```
www.csdn.net/47.95.164.112
```

### 使用URL类下载深圳大学首页http://www.szu.edu.cn
> 并统计下载得到网页文件的大小

``` java
package ipAddr;

import java.io.*;
import java.net.URL;
import java.net.URLConnection;

public class Request {

    public static void main(String[] args) {
        new Request("https://www.szu.edu.cn");
    }

    private URLConnection urlConnection;

    private Request(String URL) {
        try {
            connect(URL);
            downloadCurrentURL();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    private void connect(String URL) throws IOException {
        URL url = new URL(URL);
        urlConnection = url.openConnection();
        System.out.println(urlConnection.getContentLength());
    }

    private void downloadCurrentURL() throws IOException {
        File file = new File("./download.html");
        FileOutputStream fileOutputStream = new FileOutputStream(file);
        DataInputStream dataInputStream = new DataInputStream(urlConnection.getInputStream());
        byte[] buffer = new byte[1024];
        int length, offset = 0;
        while ((length = dataInputStream.read(buffer, offset, buffer.length)) != -1) {
            fileOutputStream.write(buffer, offset, length);
            fileOutputStream.flush();
        }
    }

}

```

控制台将会输出：

```
58929
```

并且会得到一个`download.html`。

## 4-2
### 
