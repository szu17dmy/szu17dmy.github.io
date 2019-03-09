# 游园会的集章卡片

## 题目
提示：flag 仅由 0154agflPYHMGRCNE_{} 这些字符组成。

我们经常被问一个问题：你们是从什么时候开始为 Hackergame 出题的？

其实我们全年都在出题，命题组成员来自各种各样的专业，在各种各样的地方，有各种各样不同的工作，闲暇之余（或者工作不饱和的时候，这个最好删掉）我们最大的乐趣就是互相出题给对方玩。

为了找到有趣的题目，我们需要源源不断的灵感，不管是在巴蜀人家二楼包厢 LUD（[注 1](https://lug.ustc.edu.cn/wiki/lug/events/start?s%5B%5D=lud)） 时，还是在北京食宝街的分米鸡，甚至是在武汉开往合肥的 D2256 列车上，我们会把讨论到的有趣的想法记录下来，作为下一次 Hackergame 的题目。

比如前几天，中国科学技术大学学生 Linux 用户协会在中区游园会摆摊招新（[注 2](https://lug.ustc.edu.cn/wiki/lug/contribute)），发现学校居然为每个参加游园会的同学准备了一张精美的集章卡片：

![CARD](./img/CARD.png)

到每个社团的摊位上收集盖章，到达一定数量就有礼品赠送。

突然一位同学灵机一动，不如写上 flag 然后撕碎！

附件就是撕碎的 flag，相信对中国科学技术大学校徽了如指掌的你很快就能将它还原。

## 解决方案
这个...可以有无数种方法把图片拼好。我的选择是HTML，由于IDEA可以提示文件名，所以这样做相当快。

<div style="height: 125px; ">
  <img src="../img/fragments/o71CmLXGTOMwC.png" alt="11"><!--
  --><img src="../img/fragments/bQ94Fx1mjP79C.png" alt="12"><!--
  --><img src="../img/fragments/gAf5weYdrA6UT.png" alt="13"><!--
  --><img src="../img/fragments/F6Hv0FJzoeScU.png" alt="14"><!--
  --><img src="../img/fragments/iBW71GAIUZWtN.png" alt="15">
</div>
<div style="height: 125px; ">
  <img src="../img/fragments/v2zMgTUijziLb.png" alt="21"><!--
  --><img src="../img/fragments/IGFavhnGQCxcN.png" alt="22"><!--
  --><img src="../img/fragments/qKqe06UDsBolc.png" alt="23"><!--
  --><img src="../img/fragments/FbyDcnN2nY7FV.png" alt="24"><!--
  --><img src="../img/fragments/06qjXv4T4ebcp.png" alt="25">
</div>
<div style="height: 125px; ">
  <img src="../img/fragments/ZFaDt5hcIq5PL.png" alt="31"><!--
  --><img src="../img/fragments/WAzaH5Tph7dsg.png" alt="32"><!--
  --><img src="../img/fragments/D9gPE3nJvpEXF.png" alt="33"><!--
  --><img src="../img/fragments/DZ1ujfw3qFAbk.png" alt="34"><!--
  --><img src="../img/fragments/tHclhSFyyORg4.png" alt="35">
</div>
<div style="height: 125px; ">
  <img src="../img/fragments/VfwN00osf0wTa.png" alt="41"><!--
  --><img src="../img/fragments/ZZWbAdGNDspdr.png" alt="42"><!--
  --><img src="../img/fragments/T0Kang6OWFdYC.png" alt="43"><!--
  --><img src="../img/fragments/Gd8zpdNfjxJZK.png" alt="44"><!--
  --><img src="../img/fragments/uPgc8rK5RlZ2s.png" alt="45">
</div>
<div style="height: 125px; ">
  <img src="../img/fragments/sOaGS0J08Mg0f.png" alt="51"><!--
  --><img src="../img/fragments/tU2Plsy7JetUr.png" alt="52"><!--
  --><img src="../img/fragments/9ooh29IcoQ4CC.png" alt="53"><!--
  --><img src="../img/fragments/d5NNCCjyDVU8X.png" alt="54"><!--
  --><img src="../img/fragments/pHO62EQBMSyeQ.png" alt="55">
</div>

其实上面这个图就是拼起来的，不信你可以按下F12审查一下这个图是不是25个img元素。不过...你可能会发现，自己写的HTML里img元素并不是紧密排列的，或者你发现下面的代码里img元素之间总是有一个奇怪的注释。由于inline-block间会有间距，为什么会有和怎么去除的问题，你可以在网上找到非常多的相关资料，去除它的一个比较粗暴的办法是去掉img元素之间的回车和空格等空白字符，为了不让一行看上去太可怕于是我把它们分开了，然后中间打上注释就好了，你可以在下面看到。至于行间的空白，这里图片都是125px的高度，于是直接对div元素设置高度125px就可以啦。

``` html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>card</title>
  <style>
    div {
      height: 125px;
    }
  </style>
</head>
<body>
<div>
  <img src="fragments/o71CmLXGTOMwC.png" alt="11"><!--
  --><img src="fragments/bQ94Fx1mjP79C.png" alt="12"><!--
  --><img src="fragments/gAf5weYdrA6UT.png" alt="13"><!--
  --><img src="fragments/F6Hv0FJzoeScU.png" alt="14"><!--
  --><img src="fragments/iBW71GAIUZWtN.png" alt="15">
</div>
<div>
  <img src="fragments/v2zMgTUijziLb.png" alt="21"><!--
  --><img src="fragments/IGFavhnGQCxcN.png" alt="22"><!--
  --><img src="fragments/qKqe06UDsBolc.png" alt="23"><!--
  --><img src="fragments/FbyDcnN2nY7FV.png" alt="24"><!--
  --><img src="fragments/06qjXv4T4ebcp.png" alt="25">
</div>
<div>
  <img src="fragments/ZFaDt5hcIq5PL.png" alt="31"><!--
  --><img src="fragments/WAzaH5Tph7dsg.png" alt="32"><!--
  --><img src="fragments/D9gPE3nJvpEXF.png" alt="33"><!--
  --><img src="fragments/DZ1ujfw3qFAbk.png" alt="34"><!--
  --><img src="fragments/tHclhSFyyORg4.png" alt="35">
</div>
<div>
  <img src="fragments/VfwN00osf0wTa.png" alt="41"><!--
  --><img src="fragments/ZZWbAdGNDspdr.png" alt="42"><!--
  --><img src="fragments/T0Kang6OWFdYC.png" alt="43"><!--
  --><img src="fragments/Gd8zpdNfjxJZK.png" alt="44"><!--
  --><img src="fragments/uPgc8rK5RlZ2s.png" alt="45">
</div>
<div>
  <img src="fragments/sOaGS0J08Mg0f.png" alt="51"><!--
  --><img src="fragments/tU2Plsy7JetUr.png" alt="52"><!--
  --><img src="fragments/9ooh29IcoQ4CC.png" alt="53"><!--
  --><img src="fragments/d5NNCCjyDVU8X.png" alt="54"><!--
  --><img src="fragments/pHO62EQBMSyeQ.png" alt="55">
</div>
</body>
</html>
```
