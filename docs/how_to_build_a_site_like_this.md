好多人来问我，要怎么搭一个这样的网站，其实挺简单的。

这个站点是使用[mkdocs-material](https://squidfunk.github.io/mkdocs-material/)构建的，评论区依赖于[Gitalk](https://github.com/gitalk/gitalk)。事实上，用于构建本站点的源码都可以点击右上角的仓库链接来获取。也就是说，你只要看着mkdocs的文档依葫芦画瓢就可以了。

## 准备
当前考虑你在自己的电脑上构建这个文档的情况。首先你应当有Python环境。出于个人习惯，我更喜欢Virtual Environment或是Pipenv。运行：

``` bash
pip install mkdocs-material
```

来安装。具体细节可以参考[Getting started - Material for MkDocs](https://squidfunk.github.io/mkdocs-material/getting-started/)。

你也能看到文档中包含了利用Docker进行构建的指引。

## 构建
你会看到
