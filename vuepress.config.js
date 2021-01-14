const path = require("path");
const sourceDir = path.resolve("./");

module.exports = {
  // 站点配置
  base: "/",
  lang: "zh",
  title: "NineSwords",
  description: "NineSwords blog",
  head: [["link", { rel: "icon", href: "/logo.png" }]],
  locales: {
    "/": {
      lang: "zh-CN",
      title: "VuePress",
      description: "Vue 驱动的静态网站生成器",
    },
  },

  //   主题配置
  theme: "@vuepress/default",
  themeConfig: {
    locales: {
      "/": {
        selectLanguageName: "简体中文",
      },
    },
  },

  // 打包工具配置
  bundler: "@vuepress/webpack",
  bundlerConfig: {},

  //   目录配置
  dest: `${sourceDir}/dist`,
  temp: `${sourceDir}/.temp`,
  cache: `${sourceDir}/.cache`,
  public: `${sourceDir}/public`,

  //   Markdown 配置
  markdown: {},

  // 开发配置项
  debug: true,
  host: "127.0.0.1",
  port: 2233,
  //   open: false,
    evergreen: true,
    pagePatterns: ['**/*.md', '!.vuepress', '!node_modules'],
  //   templateDev: '@vuepress/client/templates/index.dev.html',
  //   templateSSR: '@vuepress/client/templates/index.ssr.html',
    shouldPreload: (file, type) => {
      return true;
    },
    shouldPrefetch: (file, type) => {
      return true;
    },
};
