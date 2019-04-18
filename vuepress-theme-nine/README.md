# vuepress-theme-nine

```
themePath
├── global-components (可选的)
│   └── xxx.vue
├── components (可选的)
│   └── xxx.vue
├── layouts
│   ├── Layout.vue (必要的)
│   └── 404.vue (可选的)
├── styles (必要的)
│   ├── index.styl
│   └── palette.styl
├── templates (必要的)
│   ├── dev.html
│   └── ssr.html
├── index.js (当你将主题发布为一个 npm 包时，这是必须的！)
├── enhanceApp.js (必要的)
└── package.json

```

- theme/global-components: 该目录下的组件都会被自动注册为全局组件。想了解更多，请参考 @vuepress/plugin-register-components。
- theme/components: Vue 组件。
- theme/layouts: 布局组件，其中 Layout.vue 是必需的。
- theme/styles: 全局的样式和调色板。
- theme/templates: 修改默认的模板文件。
- theme/index.js: 主题文件的入口文件。
- theme/enhanceApp.js: 主题水平的客户端增强文件。
