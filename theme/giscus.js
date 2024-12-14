var theme = "preferred_color_scheme";
const themeClass = document.getElementsByTagName("html")[0].className;
if (themeClass.indexOf("light") != -1 || themeClass.indexOf("rust") != -1) {
    theme = "light"
}

// 设定默认的语言
var giscus_lang = "zh-CN";

// 获取用户使用的语种。
var lang = translate.language.getCurrent();
switch (lang) {
  case "chinese_traditional":
    giscus_lang = "zh-TW";
    break;
  case "english":
    giscus_lang = "en";
    break;
  case "spanish":
    giscus_lang = "es";
    break;
  case "japanese":
    giscus_lang = "ja";
    break;
  case "korean":
    giscus_lang = "ko";
    break;
  case "french":
    giscus_lang = "fr";
    break;
  case "arabic":
    giscus_lang = "ar";
    break;
  default:
    giscus_lang = "zh-CN";
    break;
}

// 插入评论区脚本元素
var giscus = function () {
  const script = document.createElement("script");
  script.type = "text/javascript";
  script.src = "https://giscus.app/client.js";


  script.setAttribute("data-repo", "kajimi16/kajimi_doc");
  script.setAttribute("data-repo-id", "R_kgDONddKPg");
  script.setAttribute("data-category", "Announcements");
  script.setAttribute("data-category-id", "DIC_kwDONddKPs4ClOQ6");

  script.setAttribute("data-mapping", "title");
  script.setAttribute("data-strict", "0");
  script.setAttribute("data-reactions-enabled", "1");
  script.setAttribute("data-emit-metadata", "0");
  script.setAttribute("data-input-position", "top");
  script.setAttribute("data-theme", theme);
  script.setAttribute("data-lang", giscus_lang);

  script.crossOrigin = "anonymous";
  script.async = true;
  // 将脚本元素放入 giscus-container 元素
  document.getElementById("giscus-container").appendChild(script);
};

// 开始加载
window.addEventListener('load', giscus);