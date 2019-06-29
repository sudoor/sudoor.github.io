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
    lang: 'zh-CN',

    // 个人信息（没有或不想设置的，删掉对应字段即可）
    personalInfo: {
      // 昵称
      nickname: 'nine',

      // 个人简介
      description: 'A coder',

      // 电子邮箱
      email: 'wangjia_1919@163.com',

      // 所在地
      location: 'Suzhou, China',

      // 组织
      organization: 'null',

      // 头像
      // 设置为外部链接
      // avatar: 'https://',
      // 或者放置在 .vuepress/public 文件夹，例如 .vuepress/public/img/avatar.jpg
      avatar: '/img/default_avatar.jpeg',

      // 社交平台帐号信息
      sns: {
        // Github 帐号和链接
        github: {
          account: 'NineSwordsMonster',
          link: 'https://github.com/NineSwordsMonster',
        },

        // Facebook 帐号和链接
        // facebook: {
        //   account: 'xxx',
        //   link: 'https://www.facebook.com/xxx',
        // },

        // LinkedIn 帐号和链接
        // linkedin: {
        //   account: 'xxx',
        //   link: 'http://www.linkedin.com/in/xxx',
        // },

        // Twitter 帐号和链接
        // twitter: {
        //   account: 'xxx',
        //   link: 'https://twitter.com/xxx',
        // },

        // 新浪微博 帐号和链接
        weibo: {
          account: '@焦炭君_Meteor',
          link: 'https://weibo.com/u/2039655434',
        },

        // 知乎 帐号和链接
        zhihu: {
          account: 'lollipoppp',
          link: 'https://www.zhihu.com/people/lollipoppp',
        },

        // 豆瓣 帐号和链接
        douban: {
          account: '140228670',
          link: 'https://www.douban.com/people/140228670',
        },

        // Reddit 帐号和链接
        // reddit: {
        //   account: 'xxx',
        //   link: 'https://www.reddit.com/user/xxx',
        // },

        // Medium 帐号和链接
        // medium: {
        //   account: 'xxx',
        //   link: 'https://medium.com/xxx',
        // },

        // Instagram 帐号和链接
        // instagram: {
        //   account: 'xxx',
        //   link: 'https://www.instagram.com/xxx',
        // },

        // GitLab 帐号和链接
        // gitlab: {
        //   account: 'xxx',
        //   link: 'https://gitlab.com/xxx',
        // },

        // Bitbucket 帐号和链接
        // bitbucket: {
        //   account: 'xxx',
        //   link: 'https://bitbucket.org/xxx',
        // },

        // Docker Hub 帐号和链接
        docker: {
          account: 'uwangjia',
          link: 'https://hub.docker.com/u/uwangjia',
        },
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
      { text: '文章', link: '/posts/', exact: false },
    ],

    // 评论配置，参考下方 [页面评论] 章节
    comments: {
      owner: 'NineSwordsMonster ',
      repo: 'gitment-comments',
      clientId: '6df5e3f1c9df36da16f8',
      clientSecret: 'b1e8d8bf0f60f1cffd7aedfed12e2383553028ea',
    },

    // 分页配置
    pagination: {
      perPage: 10,
    },

    // 默认页面（可选，默认全为 true）
    defaultPages: {
      // 是否允许主题自动添加 Home 页面 (url: /)
      home: true,
      // 是否允许主题自动添加 Posts 页面 (url: /posts/)
      posts: true,
    },

    extentionConfig: {
      pwa: {

      },
  
      // ga 配置
      ga: {
        ga: 'UA-118953951-1'
      },

      search: {
        searchMaxSuggestions: 10
      }
    }
  },
}
