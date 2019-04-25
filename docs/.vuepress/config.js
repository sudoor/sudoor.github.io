module.exports = {
  // 网站 Title
  title: '九剑',

  // 网站描述
  description: '独孤九剑，破尽天下武功',

  // 网站语言
  locales: {
    '/': {
      lang: 'zh-CN',
    },
  },

  // 使用的主题
  theme: 'nine',
  serviceWorker: true,

  // 主题配置
  themeConfig: {
    // 主题语言，参考下方 [主题语言] 章节
    lang: require('vuepress-theme-nine/lib/langs/zh-CN'),

    // 个人信息（没有或不想设置的，删掉对应字段即可）
    personalInfo: {
      // 昵称
      nickname: 'nine',

      // 个人简介
      description: 'Coder',

      // 电子邮箱
      email: 'wangjia_1919@163.com',

      // 所在地
      location: 'Suz, China',

      // 组织
      organization: '',

      // 头像
      // 设置为外部链接
      avatar: '/img/default_avatar.jpg',
      // 或者放置在 .vuepress/public 文件夹，例如 .vuepress/public/img/avatar.jpg
      // avatar: '/img/avatar.jpg',


      // 社交平台帐号信息
      sns: {
        // Github 帐号和链接
        github: {
          account: 'nine',
          link: 'https://github.com/NineSwordsMonster',
        }
      },
    },

    // 上方 header 的相关设置
    header: {
      // header 的背景，可以使用图片，或者随机变化的图案（geopattern）
      background: {
        // 使用图片的 URL，如果设置了图片 URL，则不会生成随机变化的图案，下面的 useGeo 将失效
        // url: '/assets/img/bg.jpg',

        // 使用随机变化的图案，如果设置为 false，且没有设置图片 URL，将显示为空白背景
        useGeo: true,
      },

      // 是否在 header 显示标题
      showTitle: true,
    },

    // 是否显示文章的最近更新时间
    lastUpdated: true,

    // 顶部导航栏内容
    nav: [
      { text: '首页', link: '/', exact: true },
      { text: '文章', link: '/posts/', exact: true },
      { text: '归档', link: '/posts/categories/', exact: true },
      { text: 'Github', link: 'https://github.com/NineSwordsMonster/vuepress-theme-nine'  },
    ],

    // 评论配置，参考下方 [页面评论] 章节
    comments: {
      owner: 'NineSwordsMonster',
      repo: 'gitment-comments',
      clientId: '6df5e3f1c9df36da16f8',
      clientSecret: 'b1e8d8bf0f60f1cffd7aedfed12e2383553028ea',
      autoCreateIssue: process.env.NODE_ENV !== 'development',
    },
  },
  ga: 'UA-118953951-1',
  plugins: [
    ['@vuepress/google-analytics', {
      'ga': 'UA-118953951-1',
    }],
  ],
  markdown: {
    lineNumbers: true,

  },
  configureWebpack: (config, isServer) => {
    if (!isServer) {
      // 修改客户端的 webpack 配置
    }
  },
  chainWebpack: (config, isServer) => {
    config.resolve.alias
      .set('@alias', 'assets')
  }
}
