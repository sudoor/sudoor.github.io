module.exports = {
  title: 'NineSwordsMonster',
  description: 'NineSwordsMonster',
  base: '/',
  head: [
    ['link', { rel: 'icon', href: '/logo.png' }]
  ],
  ga: "UA-118953951-2",
  locales: {
    '/': {
      lang: 'zh-CN', // 将会被设置为 <html> 的 lang 属性
    },
  },
  theme: "theme/vuepress-theme-nine",
  themeConfig: {
    sidebar: 'auto'
  },
  plugins: [
    // ['@vuepress/search', {
    //   searchMaxSuggestions: 10
    // }]
  ],
  evergreen: true,
  less: {
  }
}
