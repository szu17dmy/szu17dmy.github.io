这回我们来讨论一下Linux下通过SSH来git clone。还是写给小白看的，大佬们可以无视了。

现在的环境是openSUSE Tumbleweed（其实这并不重要，也适用于macOS等操作系统），代码托管站点是Azure DevOps（每个站点的具体操作应该大同小异，网站一般会提供相应的文档）。另外，如果你在使用一些利用SSH key进行连接的主机上遇到问题，可能也可以参考这里。

我还是/\*很懒地\*/先把文档先放上来：[Use SSH key authentication](https://docs.microsoft.com/en-us/azure/devops/repos/git/use-ssh-keys-to-authenticate?view=azure-devops)

这里的原理大概是这样的（首先你可能要对[公开密钥加密](https://zh.wikipedia.org/wiki/%E5%85%AC%E5%BC%80%E5%AF%86%E9%92%A5%E5%8A%A0%E5%AF%86)的原理有稍微的理解）：你需要先生成一对公钥和私钥，公钥用来加密、可以随意公开，但是信息一旦被公钥加密，只有持有对应的私钥才能解开，当然，私钥需要妥善保管。

所以我们现在需要做的就是生成密钥对，将公钥添加到服务器上，在本地保存好私钥并将私钥路径添加到ssh配置文件中，这样每次都可以“自动”进行连接了。

## 如果你还没有添加SSH key
如果你的管理员已经为用户（你）提供了private key，请妥善保管，然后跳过这一章节。

如果你是管理员并且你的organization还没有添加public key，请根据上述[文档中的第一步](https://docs.microsoft.com/en-us/azure/devops/repos/git/use-ssh-keys-to-authenticate?view=azure-devops#step-1-create-your-ssh-keys)，使用

    ssh-keygen

来生成密钥对。拥有.pub后缀的文件是你的public key，请根据[文档中的第二步](https://docs.microsoft.com/en-us/azure/devops/repos/git/use-ssh-keys-to-authenticate?view=azure-devops#step-2--add-the-public-key-to-azure-devops-servicestfs)来将它上传到服务器上。

好了，我们可以准备来连接了。

## git clone

!!! failure
    我猜这个时候已经有同学去直接去git clone了然后发现还是要输入密码（或者报一些奇奇怪怪的错）...

现在我们来把private key的路径填入ssh的一个配置文件。但在这之前，我们需要来保证private key的权限是仅有自己可读的，否则你应该会得到一个错误提示private key权限不安全。你可以通过

    ls -l

来查看当前目录下文件的权限，然后通过

    chmod 600 filename

来把某个文件（应该不用我说上面的filename要改成你想改的文件的文件名吧）的权限改为仅owner可读可写。

然后我们就可以来把路径填到配置文件里了，你可以通过nano来编辑：

    nano ~/.ssh/config

然后加入如下内容，比如这样：

    Host ssh.dev.azure.com
        Hostname ssh.dev.azure.com
        User git
        IdentityFile private_key_path

这个可就要根据实际情况灵活变通了，可别照抄出了问题。如果你使用的是nano，你可以**Ctrl+X**退出，然后**y**确认保存，**Enter**写入。

这个时候，你应该可以正常地进行git clone（通过SSH）了。

## 最后的废话
如果你对密码学感兴趣的话，有很多不错的资料，比如...[图解密码技术](https://item.jd.com/11942019.html)，[密码学简介 - CTF Wiki](https://ctf-wiki.github.io/ctf-wiki/crypto/introduction/)之类的，想了解更多请去找优秀的资料，最好别在这里看我瞎扯...（虽然好像和本文没啥关联）
