module.exports = {
  title: "九剑",
  description: '独孤九剑，破尽天下武功',
  // dest: 'public',
  head: [
    ['link', { rel: 'icon', href: '/10054584.jpeg' }],
    ['meta', { name: 'viewport', content: 'width=device-width,initial-scale=1,user-scalable=no' }]
  ],
  locales: {
    '/': {
      lang: 'zh-CN'
    }
  },
  theme: '@nine-theme/nine',
  themeConfig: {
    mode: 'auto',// 默认 auto，auto 跟随系统，dark 暗色模式，light 亮色模式
    nav: [
      { text: '主页', link: '/', icon: 'nine-home' },
      { text: '时间轴', link: '/timeline/', icon: 'nine-date' },
      { text: '文档翻译', link: '/_docs/index' },
      { text: '代码之外', link: '/other' }
    ],
    sidebar: 'auto',
    type: 'blog',
    // 博客设置
    blogConfig: {
      category: {
        location: 2,
        text: '分类'
      },
      tag: {
        location: 3,
        text: '标签'
      }
    },
    logo: '/img/default_avatar.jpeg',
    authorAvatar: '/img/default_avatar.jpeg',
    // 搜索设置
    search: true,
    searchMaxSuggestions: 10,
    // 自动形成侧边导航
    // sidebar: 'auto',
    sidebarDepth: 4,
    // 最后更新时间
    lastUpdated: 'Last Updated',
    // 作者
    author: 'nine',
    // 备案号
    record: 'xxxx',
    // 项目开始时间
    startYear: '2014',
    /**
     * 密钥 (if your blog is private)
     */
    friendLink: [
      {
        title: '九剑',
        desc: 'Enjoy when you can, and endure when you must.',
        email: 'wangjia_1919@163.com',
        link: 'https://hub.alili.fun'
      },
      {
        title: 'vuepress-theme-nine',
        desc: '简单可用的vueoress 主题',
        avatar: "https://hub.alili.fun",
        link: 'https://hub.alili.fun'
      },
    ],
    /**
     * support for
     * '' | 'default'
     * 'coy'
     * 'dark'
     * 'funky'
     * 'okaidia'
     * 'solarizedlight'
     * 'tomorrow'
     * 'twilight'
     */
    codeTheme: 'tomorrow',
    /**
     * 使用3D tag 标签
     */
    user3DTag: true
  }
}
