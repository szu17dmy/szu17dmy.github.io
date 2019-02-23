看来这又是我开的一个大坑，也不知道什么时候能填上...

用atob();和btoa();实现的小玩意儿，有空再来搞这里的样式。

<div>
    <textarea id="plaintext" style="border: solid 1px rgba(51,51,51,0.12);">这里输入待加密的文字</textarea>
</div>
<div>
    <button onclick="pressToEncode()" style="background-color: #009688; border: 4px solid #009688; border-radius: 4px; color: white; padding: 5px;">ENCODE 加密</button>
    <button onclick="pressToDecode()" style="background-color: #009688; border: 4px solid #009688; border-radius: 4px; color: white; padding: 5px;">DECODE 解密</button>
</div>
<div>
    <textarea id="ciphertext" style="border: solid 1px rgba(51,51,51,0.12);">这里输入待解密的文字</textarea>
</div>
<script>
    function pressToEncode() {
        document.getElementById('ciphertext').value = window.btoa(document.getElementById('plaintext').value);
    }
    function pressToDecode() {
        document.getElementById('plaintext').value = window.atob(document.getElementById('ciphertext').value);
    }
</script>
