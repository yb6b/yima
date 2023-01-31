<script>
  import ZitongLogo from "./assets/zitong.svg";
  import YedianLogo from "./assets/yedian.png";
  import BaiduLogo from "./assets/baidu.png";
  import HandianLogo from "./assets/handian.png";
  export let text;
  export let pinyin;
  export let spelling;
  export let code;
  const uriText = encodeURIComponent(text);
  const unicode = text.charCodeAt(0).toString(16).toUpperCase();
</script>

<div>
  <div class="notification has-text-left">
    <div class="has-text-centered mb-3">
      <ruby class="is-size-3"
        ><b class="has-text-dark"
        style="font-family: 'kaiti', '楷体', system-ui;"
        >{text}</b>
        <rp>〔</rp>
        <rt class="has-text-grey">{pinyin}</rt>
        <rp>〕</rp>
      </ruby>
    </div>
    <div class="columns is-gapless is-mobile">
      <div class="column ">
        <div>
          {#each [...spelling] as comp, i}
            <ruby class="zigenfont is-size-5">
              {comp}
              <rp>(</rp>
              <rt
                class="is-family-code is-size-6 has-text-info has-text-weight-bold"
                >{code[i]}</rt
              >
              <rp>)</rp>
            </ruby>
          {/each}
        </div>
        <div class="mt-4">
          Unicode： <br /><b class="is-family-code has-text-info">{unicode}</b>
        </div>
      </div>
      <div class="column">
        <div class="mb-3">查询：</div>
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
      </div>
    </div>
  </div>
</div>
