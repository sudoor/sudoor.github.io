const path = require('path')

module.exports = {
  title: 'vuepress-theme-nine',

  description: 'nine\'s homepage',

  theme: path.resolve(__dirname, '../../lib'),

  themeConfig: {
    personalInfo: {
      nickname: 'nine',
      description: 'Coder',
      email: 'wangjia_1919@163.com',
      location: 'sz',
      organization: '',

      avator: 'https://www.meteorlxy.cn/assets/img/avator.jpg',

      sns: {
        github: {
          account: 'NineSwordsMonster',
          link: 'https://github.com/NineSwordsMonster',
        },
      },
    },

    headerBackground: {
      // url: '/assets/img/bg.jpg',

      useGeo: true,
    },

    lastUpdated: true,

    nav: [
      { text: 'Home', link: '/', exact: true },
      { text: 'Posts', link: '/posts/', exact: false },
      { text: 'More Pages', link: '/more-pages/', exact: false },
    ],

    comments: {
      owner: 'NineSwordsMonster',
      repo: 'vuepress-theme-nine',
      clientId: '',
      clientSecret: '',
    },
  },
}
