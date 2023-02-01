<script>
  import ZitongLogo from "./assets/zitong.svg";
  import YedianLogo from "./assets/yedian.png";
  import BaiduLogo from "./assets/baidu.png";
  import HandianLogo from "./assets/handian.png";
  export let text;
  const uriText = encodeURIComponent(text);
  const unicode = text.charCodeAt(0).toString(16).toUpperCase();
</script>

<a
  href={"https://zi.tools/zi/" + uriText}
  class="icon"
  target="_blank"
  rel="noreferrer"
  title="字统网查询"><img src={ZitongLogo} alt="字统网" /></a
>
<a
  href={"http://www.yedict.com/zscontent.asp?uni=" + unicode}
  class="icon"
  target="_blank"
  rel="noreferrer"
  title="叶典网查询"><img src={YedianLogo} alt="叶典网" /></a
>
<a
  href={"https://hanyu.baidu.com/s?wd=" + uriText}
  class="icon"
  target="_blank"
  rel="noreferrer"
  title="百度汉语查询"><img src={BaiduLogo} alt="百度汉语" /></a
>
<a
  href={"https://www.zdic.net/hans/" + uriText}
  class="icon"
  target="_blank"
  rel="noreferrer"
  title="汉典查询"><img src={HandianLogo} alt="汉典网" /></a
>
