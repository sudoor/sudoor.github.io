exports.id = 509;
exports.ids = [509];
exports.modules = {

/***/ 4688:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "data": () => /* binding */ data
/* harmony export */ });
const data = {
  "key": "v-8daa1a0e",
  "path": "/",
  "title": "",
  "frontmatter": {
    "home": true,
    "navbar": false,
    "heroText": 1111
  },
  "excerpt": "",
  "headers": [],
  "filePathRelative": "README.md",
  "git": {
    "updatedTime": 1610609681000,
    "contributors": []
  }
}


/***/ }),

/***/ 7277:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => /* binding */ README
});

// EXTERNAL MODULE: external "vue"
var external_vue_ = __webpack_require__(4103);
// EXTERNAL MODULE: external "@vue/server-renderer"
var server_renderer_ = __webpack_require__(2745);
;// CONCATENATED MODULE: ./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[1]!./node_modules/@vuepress/bundler-webpack/lib/build/ssr/vuepressLoader.js!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[1]!./.temp/pages/README.vue?vue&type=template&id=0f0f1caf



function ssrRender(_ctx, _push, _parent, _attrs) {
  const _component_RouterLink = (0,external_vue_.resolveComponent)("RouterLink")

  _push(`<div${(0,server_renderer_.ssrRenderAttrs)((0,external_vue_.mergeProps)({ style: {"text-align":"center"} }, _attrs))}><p>`)
  _push((0,server_renderer_.ssrRenderComponent)(_component_RouterLink, { to: "/docs/" }, {
    default: (0,external_vue_.withCtx)((_, _push, _parent, _scopeId) => {
      if (_push) {
        _push(`文档`)
      } else {
        return [
          (0,external_vue_.createTextVNode)("文档")
        ]
      }
    }),
    _: 1
  }, _parent))
  _push(` | `)
  _push((0,server_renderer_.ssrRenderComponent)(_component_RouterLink, { to: "/blogs/" }, {
    default: (0,external_vue_.withCtx)((_, _push, _parent, _scopeId) => {
      if (_push) {
        _push(`博客`)
      } else {
        return [
          (0,external_vue_.createTextVNode)("博客")
        ]
      }
    }),
    _: 1
  }, _parent))
  _push(`</p></div>`)
}
;// CONCATENATED MODULE: ./.temp/pages/README.vue?vue&type=template&id=0f0f1caf

;// CONCATENATED MODULE: ./.temp/pages/README.vue

const script = {}
;
script.ssrRender = (...args) => {
  const ssrContext = args[2].appContext.provides[external_vue_.ssrContextKey]
  ssrContext._registeredComponents.add("/Users/runner/work/NineSwordsMonster.github.io/NineSwordsMonster.github.io/node_modules/@vuepress/bundler-webpack/lib/build/ssr/vuepressLoader.js!/Users/runner/work/NineSwordsMonster.github.io/NineSwordsMonster.github.io/node_modules/vue-loader/dist/index.js??ruleSet[0].use[1]!/Users/runner/work/NineSwordsMonster.github.io/NineSwordsMonster.github.io/.temp/pages/README.vue")
  return ssrRender(...args)
}


/* harmony default export */ const README = (script);

/***/ })

};
;
//# sourceMappingURL=509.app.js.map