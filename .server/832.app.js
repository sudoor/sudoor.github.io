exports.id = 832;
exports.ids = [832];
exports.modules = {

/***/ 9989:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => /* binding */ Layout
});

// EXTERNAL MODULE: external "vue"
var external_vue_ = __webpack_require__(4103);
// EXTERNAL MODULE: external "@vue/server-renderer"
var server_renderer_ = __webpack_require__(2745);
;// CONCATENATED MODULE: ./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[1]!./node_modules/@vuepress/bundler-webpack/lib/build/ssr/vuepressLoader.js!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[1]!./node_modules/@vuepress/theme-default/lib/layouts/Layout.vue?vue&type=template&id=3d3b8f3a



function ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_Navbar = (0,external_vue_.resolveComponent)("Navbar")
  const _component_Sidebar = (0,external_vue_.resolveComponent)("Sidebar")
  const _component_Home = (0,external_vue_.resolveComponent)("Home")
  const _component_Page = (0,external_vue_.resolveComponent)("Page")

  _push(`<div${(0,server_renderer_.ssrRenderAttrs)((0,external_vue_.mergeProps)({
    class: ["theme-container", _ctx.containerClass]
  }, _attrs))}>`)
  if (_ctx.shouldShowNavbar) {
    _push((0,server_renderer_.ssrRenderComponent)(_component_Navbar, null, {
      before: (0,external_vue_.withCtx)((_, _push, _parent, _scopeId) => {
        if (_push) {
          (0,server_renderer_.ssrRenderSlot)(_ctx.$slots, "navbar-before", {}, null, _push, _parent)
        } else {
          return [
            (0,external_vue_.renderSlot)(_ctx.$slots, "navbar-before")
          ]
        }
      }),
      after: (0,external_vue_.withCtx)((_, _push, _parent, _scopeId) => {
        if (_push) {
          (0,server_renderer_.ssrRenderSlot)(_ctx.$slots, "navbar-after", {}, null, _push, _parent)
        } else {
          return [
            (0,external_vue_.renderSlot)(_ctx.$slots, "navbar-after")
          ]
        }
      }),
      _: 1
    }, _parent))
  } else {
    _push(`<!---->`)
  }
  _push(`<div class="sidebar-mask"></div>`)
  _push((0,server_renderer_.ssrRenderComponent)(_component_Sidebar, null, {
    top: (0,external_vue_.withCtx)((_, _push, _parent, _scopeId) => {
      if (_push) {
        (0,server_renderer_.ssrRenderSlot)(_ctx.$slots, "sidebar-top", {}, null, _push, _parent)
      } else {
        return [
          (0,external_vue_.renderSlot)(_ctx.$slots, "sidebar-top")
        ]
      }
    }),
    bottom: (0,external_vue_.withCtx)((_, _push, _parent, _scopeId) => {
      if (_push) {
        (0,server_renderer_.ssrRenderSlot)(_ctx.$slots, "sidebar-bottom", {}, null, _push, _parent)
      } else {
        return [
          (0,external_vue_.renderSlot)(_ctx.$slots, "sidebar-bottom")
        ]
      }
    }),
    _: 1
  }, _parent))
  if (_ctx.$frontmatter.home) {
    _push((0,server_renderer_.ssrRenderComponent)(_component_Home, null, null, _parent))
  } else {
    _push((0,server_renderer_.ssrRenderComponent)(_component_Page, null, {
      top: (0,external_vue_.withCtx)((_, _push, _parent, _scopeId) => {
        if (_push) {
          (0,server_renderer_.ssrRenderSlot)(_ctx.$slots, "page-top", {}, null, _push, _parent)
        } else {
          return [
            (0,external_vue_.renderSlot)(_ctx.$slots, "page-top")
          ]
        }
      }),
      bottom: (0,external_vue_.withCtx)((_, _push, _parent, _scopeId) => {
        if (_push) {
          (0,server_renderer_.ssrRenderSlot)(_ctx.$slots, "page-bottom", {}, null, _push, _parent)
        } else {
          return [
            (0,external_vue_.renderSlot)(_ctx.$slots, "page-bottom")
          ]
        }
      }),
      _: 1
    }, _parent))
  }
  _push(`</div>`)
}
;// CONCATENATED MODULE: ./node_modules/@vuepress/theme-default/lib/layouts/Layout.vue?vue&type=template&id=3d3b8f3a

// EXTERNAL MODULE: external "vue-router"
var external_vue_router_ = __webpack_require__(4615);
// EXTERNAL MODULE: ./node_modules/@vuepress/client/lib/index.js
var lib = __webpack_require__(7621);
;// CONCATENATED MODULE: ./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[1]!./node_modules/@vuepress/bundler-webpack/lib/build/ssr/vuepressLoader.js!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[1]!./node_modules/@vuepress/theme-default/lib/components/Home.vue?vue&type=template&id=25d05078



function Homevue_type_template_id_25d05078_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_NavLink = (0,external_vue_.resolveComponent)("NavLink")
  const _component_Content = (0,external_vue_.resolveComponent)("Content")

  _push(`<main${(0,server_renderer_.ssrRenderAttrs)((0,external_vue_.mergeProps)({
    class: "home",
    "aria-labelledby": _ctx.$frontmatter.heroText !== null ? 'main-title' : null
  }, _attrs))}><header class="hero">`)
  if (_ctx.$frontmatter.heroImage) {
    _push(`<img${
      (0,server_renderer_.ssrRenderAttr)("src", _ctx.$withBase(_ctx.$frontmatter.heroImage))
    }${
      (0,server_renderer_.ssrRenderAttr)("alt", _ctx.$frontmatter.heroAlt || 'hero')
    }>`)
  } else {
    _push(`<!---->`)
  }
  if (_ctx.$frontmatter.heroText !== null) {
    _push(`<h1 id="main-title">${(0,server_renderer_.ssrInterpolate)(_ctx.$frontmatter.heroText || _ctx.$siteLocale.title || 'Hello')}</h1>`)
  } else {
    _push(`<!---->`)
  }
  if (_ctx.$frontmatter.tagline !== null) {
    _push(`<p class="description">${(0,server_renderer_.ssrInterpolate)(_ctx.$frontmatter.tagline ||
          _ctx.$siteLocale.description ||
          'Welcome to your VuePress site')}</p>`)
  } else {
    _push(`<!---->`)
  }
  if (_ctx.$frontmatter.actionText && _ctx.$frontmatter.actionLink) {
    _push(`<p class="action">`)
    _push((0,server_renderer_.ssrRenderComponent)(_component_NavLink, {
      class: "action-button",
      item: {
            text: _ctx.$frontmatter.actionText,
            link: _ctx.$frontmatter.actionLink,
          }
    }, null, _parent))
    _push(`</p>`)
  } else {
    _push(`<!---->`)
  }
  _push(`</header>`)
  if (_ctx.$frontmatter.features && _ctx.$frontmatter.features.length) {
    _push(`<div class="features"><!--[-->`)
    ;(0,server_renderer_.ssrRenderList)(_ctx.$frontmatter.features, (feature, index) => {
      _push(`<div class="feature"><h2>${
        (0,server_renderer_.ssrInterpolate)(feature.title)
      }</h2><p>${
        (0,server_renderer_.ssrInterpolate)(feature.details)
      }</p></div>`)
    })
    _push(`<!--]--></div>`)
  } else {
    _push(`<!---->`)
  }
  _push(`<div class="theme-default-content custom">`)
  _push((0,server_renderer_.ssrRenderComponent)(_component_Content, null, null, _parent))
  _push(`</div>`)
  if (_ctx.$frontmatter.footer) {
    _push(`<div class="footer">${(0,server_renderer_.ssrInterpolate)(_ctx.$frontmatter.footer)}</div>`)
  } else {
    _push(`<!---->`)
  }
  _push(`</main>`)
}
;// CONCATENATED MODULE: ./node_modules/@vuepress/theme-default/lib/components/Home.vue?vue&type=template&id=25d05078

;// CONCATENATED MODULE: ./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[1]!./node_modules/@vuepress/bundler-webpack/lib/build/ssr/vuepressLoader.js!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[1]!./node_modules/@vuepress/theme-default/lib/components/NavLink.vue?vue&type=template&id=5847d7b3



function NavLinkvue_type_template_id_5847d7b3_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_RouterLink = (0,external_vue_.resolveComponent)("RouterLink")
  const _component_OutboundLink = (0,external_vue_.resolveComponent)("OutboundLink")

  if (_ctx.isRouterLink) {
    _push((0,server_renderer_.ssrRenderComponent)(_component_RouterLink, (0,external_vue_.mergeProps)({
      class: "nav-link",
      to: _ctx.item.link,
      exact: _ctx.isExact,
      "aria-label": _ctx.linkAriaLabel
    }, _ctx.$attrs, _attrs), {
      default: (0,external_vue_.withCtx)((_, _push, _parent, _scopeId) => {
        if (_push) {
          (0,server_renderer_.ssrRenderSlot)(_ctx.$slots, "before", {}, null, _push, _parent)
          _push(` ${(0,server_renderer_.ssrInterpolate)(_ctx.item.text)} `)
          ;(0,server_renderer_.ssrRenderSlot)(_ctx.$slots, "after", {}, null, _push, _parent)
        } else {
          return [
            (0,external_vue_.renderSlot)(_ctx.$slots, "before"),
            (0,external_vue_.createTextVNode)(" " + (0,external_vue_.toDisplayString)(_ctx.item.text) + " ", 1),
            (0,external_vue_.renderSlot)(_ctx.$slots, "after")
          ]
        }
      }),
      _: 3
    }, _parent))
  } else {
    _push(`<a${(0,server_renderer_.ssrRenderAttrs)((0,external_vue_.mergeProps)({
      class: "nav-link external",
      href: _ctx.item.link,
      rel: _ctx.linkRel,
      target: _ctx.linkTarget,
      "aria-label": _ctx.linkAriaLabel
    }, _ctx.$attrs, _attrs))}>`)
    ;(0,server_renderer_.ssrRenderSlot)(_ctx.$slots, "before", {}, null, _push, _parent)
    _push(` ${(0,server_renderer_.ssrInterpolate)(_ctx.item.text)} `)
    if (_ctx.isBlankTarget) {
      _push((0,server_renderer_.ssrRenderComponent)(_component_OutboundLink, null, null, _parent))
    } else {
      _push(`<!---->`)
    }
    (0,server_renderer_.ssrRenderSlot)(_ctx.$slots, "after", {}, null, _push, _parent)
    _push(`</a>`)
  }
}
;// CONCATENATED MODULE: ./node_modules/@vuepress/theme-default/lib/components/NavLink.vue?vue&type=template&id=5847d7b3

// EXTERNAL MODULE: ./node_modules/@vuepress/shared/lib/esm/index.js + 13 modules
var esm = __webpack_require__(4736);
;// CONCATENATED MODULE: ./node_modules/esbuild-loader/dist/index.js??clonedRuleSet-30.use[0]!./node_modules/@vuepress/bundler-webpack/lib/build/ssr/vuepressLoader.js!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[1]!./node_modules/@vuepress/theme-default/lib/components/NavLink.vue?vue&type=script&lang=ts



/* harmony default export */ const NavLinkvue_type_script_lang_ts = ((0,external_vue_.defineComponent)({
  name: "NavLink",
  inheritAttrs: false,
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    const site = (0,lib/* useSiteData */.WF)();
    const {item} = (0,external_vue_.toRefs)(props);
    const hasHttpProtocol = (0,external_vue_.computed)(() => (0,esm/* isLinkHttp */.ak)(item.value.link));
    const hasNonHttpProtocal = (0,external_vue_.computed)(() => (0,esm/* isLinkMailto */.B2)(item.value.link) || (0,esm/* isLinkTel */.R5)(item.value.link));
    const linkTarget = (0,external_vue_.computed)(() => {
      if (hasNonHttpProtocal.value)
        return null;
      if (item.value.target)
        return item.value.target;
      if (hasHttpProtocol.value)
        return "_blank";
      return null;
    });
    const isBlankTarget = (0,external_vue_.computed)(() => linkTarget.value === "_blank");
    const isRouterLink = (0,external_vue_.computed)(() => !hasHttpProtocol.value && !hasNonHttpProtocal.value && !isBlankTarget.value);
    const isExact = (0,external_vue_.computed)(() => {
      const localeKeys = Object.keys(site.value.locales);
      if (localeKeys.length) {
        return localeKeys.some((key) => key === item.value.link);
      }
      return item.value.link === "/";
    });
    const linkRel = (0,external_vue_.computed)(() => {
      if (hasNonHttpProtocal.value)
        return null;
      if (item.value.rel)
        return item.value.rel;
      if (isBlankTarget.value)
        return "noopener noreferrer";
      return null;
    });
    const linkAriaLabel = (0,external_vue_.computed)(() => item.value.ariaLabel || item.value.text);
    return {
      isBlankTarget,
      isExact,
      isRouterLink,
      linkRel,
      linkTarget,
      linkAriaLabel
    };
  }
}));

;// CONCATENATED MODULE: ./node_modules/@vuepress/theme-default/lib/components/NavLink.vue?vue&type=script&lang=ts
 
;// CONCATENATED MODULE: ./node_modules/@vuepress/theme-default/lib/components/NavLink.vue



;
NavLinkvue_type_script_lang_ts.ssrRender = (...args) => {
  const ssrContext = args[2].appContext.provides[external_vue_.ssrContextKey]
  ssrContext._registeredComponents.add("/Users/runner/work/NineSwordsMonster.github.io/NineSwordsMonster.github.io/node_modules/@vuepress/bundler-webpack/lib/build/ssr/vuepressLoader.js!/Users/runner/work/NineSwordsMonster.github.io/NineSwordsMonster.github.io/node_modules/vue-loader/dist/index.js??ruleSet[0].use[1]!/Users/runner/work/NineSwordsMonster.github.io/NineSwordsMonster.github.io/node_modules/@vuepress/theme-default/lib/components/NavLink.vue")
  return NavLinkvue_type_template_id_5847d7b3_ssrRender(...args)
}


/* harmony default export */ const NavLink = (NavLinkvue_type_script_lang_ts);
;// CONCATENATED MODULE: ./node_modules/esbuild-loader/dist/index.js??clonedRuleSet-30.use[0]!./node_modules/@vuepress/bundler-webpack/lib/build/ssr/vuepressLoader.js!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[1]!./node_modules/@vuepress/theme-default/lib/components/Home.vue?vue&type=script&lang=ts


/* harmony default export */ const Homevue_type_script_lang_ts = ((0,external_vue_.defineComponent)({
  name: "Home",
  components: {
    NavLink: NavLink
  }
}));

;// CONCATENATED MODULE: ./node_modules/@vuepress/theme-default/lib/components/Home.vue?vue&type=script&lang=ts
 
;// CONCATENATED MODULE: ./node_modules/@vuepress/theme-default/lib/components/Home.vue



;
Homevue_type_script_lang_ts.ssrRender = (...args) => {
  const ssrContext = args[2].appContext.provides[external_vue_.ssrContextKey]
  ssrContext._registeredComponents.add("/Users/runner/work/NineSwordsMonster.github.io/NineSwordsMonster.github.io/node_modules/@vuepress/bundler-webpack/lib/build/ssr/vuepressLoader.js!/Users/runner/work/NineSwordsMonster.github.io/NineSwordsMonster.github.io/node_modules/vue-loader/dist/index.js??ruleSet[0].use[1]!/Users/runner/work/NineSwordsMonster.github.io/NineSwordsMonster.github.io/node_modules/@vuepress/theme-default/lib/components/Home.vue")
  return Homevue_type_template_id_25d05078_ssrRender(...args)
}


/* harmony default export */ const Home = (Homevue_type_script_lang_ts);
;// CONCATENATED MODULE: ./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[1]!./node_modules/@vuepress/bundler-webpack/lib/build/ssr/vuepressLoader.js!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[1]!./node_modules/@vuepress/theme-default/lib/components/Page.vue?vue&type=template&id=5e68217e



function Pagevue_type_template_id_5e68217e_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_Content = (0,external_vue_.resolveComponent)("Content")
  const _component_PageMeta = (0,external_vue_.resolveComponent)("PageMeta")
  const _component_PageNav = (0,external_vue_.resolveComponent)("PageNav")

  _push(`<main${(0,server_renderer_.ssrRenderAttrs)((0,external_vue_.mergeProps)({ class: "page" }, _attrs))}>`)
  ;(0,server_renderer_.ssrRenderSlot)(_ctx.$slots, "top", {}, null, _push, _parent)
  _push(`<div class="theme-default-content">`)
  _push((0,server_renderer_.ssrRenderComponent)(_component_Content, null, null, _parent))
  _push(`</div>`)
  _push((0,server_renderer_.ssrRenderComponent)(_component_PageMeta, null, null, _parent))
  _push((0,server_renderer_.ssrRenderComponent)(_component_PageNav, null, null, _parent))
  ;(0,server_renderer_.ssrRenderSlot)(_ctx.$slots, "bottom", {}, null, _push, _parent)
  _push(`</main>`)
}
;// CONCATENATED MODULE: ./node_modules/@vuepress/theme-default/lib/components/Page.vue?vue&type=template&id=5e68217e

;// CONCATENATED MODULE: ./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[1]!./node_modules/@vuepress/bundler-webpack/lib/build/ssr/vuepressLoader.js!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[1]!./node_modules/@vuepress/theme-default/lib/components/PageMeta.vue?vue&type=template&id=69499eb7



function PageMetavue_type_template_id_69499eb7_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_NavLink = (0,external_vue_.resolveComponent)("NavLink")

  _push(`<footer${(0,server_renderer_.ssrRenderAttrs)((0,external_vue_.mergeProps)({ class: "page-meta" }, _attrs))}>`)
  if (_ctx.editNavLink) {
    _push(`<div class="meta-item edit-link">`)
    _push((0,server_renderer_.ssrRenderComponent)(_component_NavLink, {
      class: "meta-item-label",
      item: _ctx.editNavLink
    }, null, _parent))
    _push(`</div>`)
  } else {
    _push(`<!---->`)
  }
  if (_ctx.lastUpdated) {
    _push(`<div class="meta-item last-updated"><span class="meta-item-label">${
      (0,server_renderer_.ssrInterpolate)(_ctx.$themeLocale.lastUpdatedText)
    }: </span><span class="meta-item-info">${
      (0,server_renderer_.ssrInterpolate)(_ctx.lastUpdated)
    }</span></div>`)
  } else {
    _push(`<!---->`)
  }
  if (_ctx.contributors && _ctx.contributors.length) {
    _push(`<div class="meta-item contributors"><span class="meta-item-label">${(0,server_renderer_.ssrInterpolate)(_ctx.$themeLocale.contributorsText)}: </span><span class="meta-item-info"><!--[-->`)
    ;(0,server_renderer_.ssrRenderList)(_ctx.contributors, (contributor, index) => {
      _push(`<!--[--><span class="contributor"${
        (0,server_renderer_.ssrRenderAttr)("title", `email: ${contributor.email}`)
      }>${
        (0,server_renderer_.ssrInterpolate)(contributor.name)
      }</span>`)
      if (index !== _ctx.contributors.length - 1) {
        _push(`<!--[-->, <!--]-->`)
      } else {
        _push(`<!---->`)
      }
      _push(`<!--]-->`)
    })
    _push(`<!--]--></span></div>`)
  } else {
    _push(`<!---->`)
  }
  _push(`</footer>`)
}
;// CONCATENATED MODULE: ./node_modules/@vuepress/theme-default/lib/components/PageMeta.vue?vue&type=template&id=69499eb7

;// CONCATENATED MODULE: ./node_modules/@vuepress/theme-default/lib/utils/resolveRepoType.js

const resolveRepoType = (repo) => {
    if (!(0,esm/* isLinkHttp */.ak)(repo))
        return 'GitHub';
    if (/bitbucket\.org/.test(repo))
        return 'Bitbucket';
    if (/gitlab\.com/.test(repo))
        return 'GitLab';
    return null;
};
//# sourceMappingURL=resolveRepoType.js.map
;// CONCATENATED MODULE: ./node_modules/@vuepress/theme-default/lib/utils/resolveEditLink.js


const editLinkPatternGithub = ':repo/edit/:branch/:path';
const editLinkPatternGitlab = ':repo/-/edit/:branch/:path';
const editLinkPatternBitbucket = ':repo/src/:branch/:path?mode=edit&spa=0&at=:branch&fileviewer=file-view-default';
const resolveEditLink = ({ docsRepo, docsBranch, docsDir, filePathRelative, editLinkPattern, }) => {
    const repoType = resolveRepoType(docsRepo);
    let pattern = null;
    if (editLinkPattern) {
        pattern = editLinkPattern;
    }
    else if (repoType === 'GitHub') {
        pattern = editLinkPatternGithub;
    }
    else if (repoType === 'GitLab') {
        pattern = editLinkPatternGitlab;
    }
    else if (repoType === 'Bitbucket') {
        pattern = editLinkPatternBitbucket;
    }
    if (!pattern)
        return null;
    return pattern
        .replace(/:repo/, repoType === 'GitHub' ? `https://github.com/${docsRepo}` : docsRepo)
        .replace(/:branch/, docsBranch)
        .replace(/:path/, (0,esm/* removeLeadingSlash */.FY)(`${(0,esm/* removeEndingSlash */.U1)(docsDir)}/${filePathRelative}`));
};
//# sourceMappingURL=resolveEditLink.js.map
;// CONCATENATED MODULE: ./node_modules/@vuepress/theme-default/lib/utils/index.js


//# sourceMappingURL=index.js.map
;// CONCATENATED MODULE: ./node_modules/esbuild-loader/dist/index.js??clonedRuleSet-30.use[0]!./node_modules/@vuepress/bundler-webpack/lib/build/ssr/vuepressLoader.js!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[1]!./node_modules/@vuepress/theme-default/lib/components/PageMeta.vue?vue&type=script&lang=ts




const useEditNavLink = () => {
  const themeLocale = (0,lib/* useThemeLocaleData */.X6)();
  const page = (0,lib/* usePageData */.Vi)();
  const frontmatter = (0,lib/* usePageFrontmatter */.I2)();
  return (0,external_vue_.computed)(() => {
    var _a, _b;
    const showEditLink = (_b = (_a = frontmatter.value.editLink) != null ? _a : themeLocale.value.editLink) != null ? _b : true;
    if (!showEditLink) {
      return null;
    }
    const {
      repo,
      docsRepo = repo,
      docsBranch = "master",
      docsDir = "",
      editLinkText
    } = themeLocale.value;
    if (!docsRepo)
      return null;
    const editLink = resolveEditLink({
      docsRepo,
      docsBranch,
      docsDir,
      filePathRelative: page.value.filePathRelative,
      editLinkPattern: themeLocale.value.editLinkPattern
    });
    if (!editLink)
      return null;
    return {
      text: editLinkText != null ? editLinkText : "Edit this page",
      link: editLink
    };
  });
};
const useLastUpdated = () => {
  const siteLocale = (0,lib/* useSiteLocaleData */.I5)();
  const themeLocale = (0,lib/* useThemeLocaleData */.X6)();
  const page = (0,lib/* usePageData */.Vi)();
  const frontmatter = (0,lib/* usePageFrontmatter */.I2)();
  return (0,external_vue_.computed)(() => {
    var _a, _b, _c, _d;
    const showLastUpdated = (_b = (_a = frontmatter.value.lastUpdated) != null ? _a : themeLocale.value.lastUpdated) != null ? _b : true;
    if (!showLastUpdated)
      return null;
    if (!((_c = page.value.git) == null ? void 0 : _c.updatedTime))
      return null;
    const updatedDate = new Date((_d = page.value.git) == null ? void 0 : _d.updatedTime);
    return updatedDate.toLocaleString(siteLocale.value.lang);
  });
};
const useContributors = () => {
  const themeLocale = (0,lib/* useThemeLocaleData */.X6)();
  const page = (0,lib/* usePageData */.Vi)();
  const frontmatter = (0,lib/* usePageFrontmatter */.I2)();
  return (0,external_vue_.computed)(() => {
    var _a, _b, _c, _d;
    const showContributors = (_b = (_a = frontmatter.value.contributors) != null ? _a : themeLocale.value.contributors) != null ? _b : true;
    if (!showContributors)
      return null;
    return (_d = (_c = page.value.git) == null ? void 0 : _c.contributors) != null ? _d : null;
  });
};
/* harmony default export */ const PageMetavue_type_script_lang_ts = ((0,external_vue_.defineComponent)({
  name: "PageMeta",
  components: {
    NavLink: NavLink
  },
  setup() {
    const editNavLink = useEditNavLink();
    const lastUpdated = useLastUpdated();
    const contributors = useContributors();
    return {
      editNavLink,
      lastUpdated,
      contributors
    };
  }
}));

;// CONCATENATED MODULE: ./node_modules/@vuepress/theme-default/lib/components/PageMeta.vue?vue&type=script&lang=ts
 
;// CONCATENATED MODULE: ./node_modules/@vuepress/theme-default/lib/components/PageMeta.vue



;
PageMetavue_type_script_lang_ts.ssrRender = (...args) => {
  const ssrContext = args[2].appContext.provides[external_vue_.ssrContextKey]
  ssrContext._registeredComponents.add("/Users/runner/work/NineSwordsMonster.github.io/NineSwordsMonster.github.io/node_modules/@vuepress/bundler-webpack/lib/build/ssr/vuepressLoader.js!/Users/runner/work/NineSwordsMonster.github.io/NineSwordsMonster.github.io/node_modules/vue-loader/dist/index.js??ruleSet[0].use[1]!/Users/runner/work/NineSwordsMonster.github.io/NineSwordsMonster.github.io/node_modules/@vuepress/theme-default/lib/components/PageMeta.vue")
  return PageMetavue_type_template_id_69499eb7_ssrRender(...args)
}


/* harmony default export */ const PageMeta = (PageMetavue_type_script_lang_ts);
;// CONCATENATED MODULE: ./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[1]!./node_modules/@vuepress/bundler-webpack/lib/build/ssr/vuepressLoader.js!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[1]!./node_modules/@vuepress/theme-default/lib/components/PageNav.vue?vue&type=template&id=239f10bc



function PageNavvue_type_template_id_239f10bc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_NavLink = (0,external_vue_.resolveComponent)("NavLink")

  if (_ctx.prevNavLink || _ctx.nextNavLink) {
    _push(`<nav${(0,server_renderer_.ssrRenderAttrs)((0,external_vue_.mergeProps)({ class: "page-nav" }, _attrs))}><p class="inner">`)
    if (_ctx.prevNavLink) {
      _push(`<span class="prev"> ← `)
      _push((0,server_renderer_.ssrRenderComponent)(_component_NavLink, { item: _ctx.prevNavLink }, null, _parent))
      _push(`</span>`)
    } else {
      _push(`<!---->`)
    }
    if (_ctx.nextNavLink) {
      _push(`<span class="next">`)
      _push((0,server_renderer_.ssrRenderComponent)(_component_NavLink, { item: _ctx.nextNavLink }, null, _parent))
      _push(` → </span>`)
    } else {
      _push(`<!---->`)
    }
    _push(`</p></nav>`)
  } else {
    _push(`<!---->`)
  }
}
;// CONCATENATED MODULE: ./node_modules/@vuepress/theme-default/lib/components/PageNav.vue?vue&type=template&id=239f10bc

// EXTERNAL MODULE: ./node_modules/@vuepress/theme-default/lib/composables/index.js + 3 modules
var composables = __webpack_require__(1710);
;// CONCATENATED MODULE: ./node_modules/esbuild-loader/dist/index.js??clonedRuleSet-30.use[0]!./node_modules/@vuepress/bundler-webpack/lib/build/ssr/vuepressLoader.js!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[1]!./node_modules/@vuepress/theme-default/lib/components/PageNav.vue?vue&type=script&lang=ts






const resolveFromFrontmatterConfig = (conf) => {
  if (conf === false) {
    return null;
  }
  if ((0,esm/* isString */.HD)(conf)) {
    return (0,composables/* useNavLink */.sC)(conf);
  }
  if ((0,esm/* isPlainObject */.PO)(conf)) {
    return conf;
  }
  return false;
};
const resolveFromSidebarItems = (sidebarItems, currentPath, offset) => {
  const index = sidebarItems.findIndex((item) => item.link === currentPath);
  if (index !== -1) {
    const targetItem = sidebarItems[index + offset];
    if (!(targetItem == null ? void 0 : targetItem.link)) {
      return null;
    }
    return targetItem;
  }
  for (const item of sidebarItems) {
    if (item.children) {
      const childResult = resolveFromSidebarItems(item.children, currentPath, offset);
      if (childResult) {
        return childResult;
      }
    }
  }
  return null;
};
/* harmony default export */ const PageNavvue_type_script_lang_ts = ((0,external_vue_.defineComponent)({
  name: "PageNav",
  components: {
    NavLink: NavLink
  },
  setup() {
    const frontmatter = (0,lib/* usePageFrontmatter */.I2)();
    const sidebarItems = (0,composables/* useSidebarItems */.VU)();
    const route = (0,external_vue_router_.useRoute)();
    const prevNavLink = (0,external_vue_.computed)(() => {
      const prevConfig = resolveFromFrontmatterConfig(frontmatter.value.prev);
      if (prevConfig !== false) {
        return prevConfig;
      }
      return resolveFromSidebarItems(sidebarItems.value, route.path, -1);
    });
    const nextNavLink = (0,external_vue_.computed)(() => {
      const nextConfig = resolveFromFrontmatterConfig(frontmatter.value.next);
      if (nextConfig !== false) {
        return nextConfig;
      }
      return resolveFromSidebarItems(sidebarItems.value, route.path, 1);
    });
    return {
      prevNavLink,
      nextNavLink
    };
  }
}));

;// CONCATENATED MODULE: ./node_modules/@vuepress/theme-default/lib/components/PageNav.vue?vue&type=script&lang=ts
 
;// CONCATENATED MODULE: ./node_modules/@vuepress/theme-default/lib/components/PageNav.vue



;
PageNavvue_type_script_lang_ts.ssrRender = (...args) => {
  const ssrContext = args[2].appContext.provides[external_vue_.ssrContextKey]
  ssrContext._registeredComponents.add("/Users/runner/work/NineSwordsMonster.github.io/NineSwordsMonster.github.io/node_modules/@vuepress/bundler-webpack/lib/build/ssr/vuepressLoader.js!/Users/runner/work/NineSwordsMonster.github.io/NineSwordsMonster.github.io/node_modules/vue-loader/dist/index.js??ruleSet[0].use[1]!/Users/runner/work/NineSwordsMonster.github.io/NineSwordsMonster.github.io/node_modules/@vuepress/theme-default/lib/components/PageNav.vue")
  return PageNavvue_type_template_id_239f10bc_ssrRender(...args)
}


/* harmony default export */ const PageNav = (PageNavvue_type_script_lang_ts);
;// CONCATENATED MODULE: ./node_modules/@vuepress/bundler-webpack/lib/build/ssr/vuepressLoader.js!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[1]!./node_modules/@vuepress/theme-default/lib/components/Page.vue?vue&type=script&lang=js





/* harmony default export */ const Pagevue_type_script_lang_js = ((0,external_vue_.defineComponent)({
  name: 'Page',

  components: {
    PageMeta: PageMeta,
    PageNav: PageNav,
  },
}));

;// CONCATENATED MODULE: ./node_modules/@vuepress/theme-default/lib/components/Page.vue?vue&type=script&lang=js
 
;// CONCATENATED MODULE: ./node_modules/@vuepress/theme-default/lib/components/Page.vue



;
Pagevue_type_script_lang_js.ssrRender = (...args) => {
  const ssrContext = args[2].appContext.provides[external_vue_.ssrContextKey]
  ssrContext._registeredComponents.add("/Users/runner/work/NineSwordsMonster.github.io/NineSwordsMonster.github.io/node_modules/@vuepress/bundler-webpack/lib/build/ssr/vuepressLoader.js!/Users/runner/work/NineSwordsMonster.github.io/NineSwordsMonster.github.io/node_modules/vue-loader/dist/index.js??ruleSet[0].use[1]!/Users/runner/work/NineSwordsMonster.github.io/NineSwordsMonster.github.io/node_modules/@vuepress/theme-default/lib/components/Page.vue")
  return Pagevue_type_template_id_5e68217e_ssrRender(...args)
}


/* harmony default export */ const Page = (Pagevue_type_script_lang_js);
;// CONCATENATED MODULE: ./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[1]!./node_modules/@vuepress/bundler-webpack/lib/build/ssr/vuepressLoader.js!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[1]!./node_modules/@vuepress/theme-default/lib/components/Navbar.vue?vue&type=template&id=550fd3fa



function Navbarvue_type_template_id_550fd3fa_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_ToggleSidebarButton = (0,external_vue_.resolveComponent)("ToggleSidebarButton")
  const _component_RouterLink = (0,external_vue_.resolveComponent)("RouterLink")
  const _component_NavbarLinks = (0,external_vue_.resolveComponent)("NavbarLinks")
  const _component_Docsearch = (0,external_vue_.resolveComponent)("Docsearch")

  _push(`<header${(0,server_renderer_.ssrRenderAttrs)((0,external_vue_.mergeProps)({
    ref: "navbar",
    class: "navbar"
  }, _attrs))}>`)
  _push((0,server_renderer_.ssrRenderComponent)(_component_ToggleSidebarButton, null, null, _parent))
  _push((0,server_renderer_.ssrRenderComponent)(_component_RouterLink, {
    to: _ctx.$themeLocale.home || _ctx.$routeLocale,
    class: "home-link"
  }, {
    default: (0,external_vue_.withCtx)((_, _push, _parent, _scopeId) => {
      if (_push) {
        if (_ctx.$themeLocale.logo) {
          _push(`<img class="logo"${
            (0,server_renderer_.ssrRenderAttr)("src", _ctx.$withBase(_ctx.$themeLocale.logo))
          }${
            (0,server_renderer_.ssrRenderAttr)("alt", _ctx.$siteLocale.title)
          }${
            _scopeId
          }>`)
        } else {
          _push(`<!---->`)
        }
        if (_ctx.$siteLocale.title) {
          _push(`<span class="${
            (0,server_renderer_.ssrRenderClass)([{ 'can-hide': _ctx.$themeLocale.logo }, "site-name"])
          }"${
            _scopeId
          }>${
            (0,server_renderer_.ssrInterpolate)(_ctx.$siteLocale.title)
          }</span>`)
        } else {
          _push(`<!---->`)
        }
      } else {
        return [
          (_ctx.$themeLocale.logo)
            ? ((0,external_vue_.openBlock)(), (0,external_vue_.createBlock)("img", {
                key: 0,
                class: "logo",
                src: _ctx.$withBase(_ctx.$themeLocale.logo),
                alt: _ctx.$siteLocale.title
              }, null, 8, ["src", "alt"]))
            : (0,external_vue_.createCommentVNode)("", true),
          (_ctx.$siteLocale.title)
            ? ((0,external_vue_.openBlock)(), (0,external_vue_.createBlock)("span", {
                key: 1,
                ref: "siteName",
                class: ["site-name", { 'can-hide': _ctx.$themeLocale.logo }]
              }, (0,external_vue_.toDisplayString)(_ctx.$siteLocale.title), 3))
            : (0,external_vue_.createCommentVNode)("", true)
        ]
      }
    }),
    _: 1
  }, _parent))
  _push(`<div class="navbar-links-wrapper" style="${(0,server_renderer_.ssrRenderStyle)(_ctx.linksWrapperStyle)}">`)
  ;(0,server_renderer_.ssrRenderSlot)(_ctx.$slots, "before", {}, null, _push, _parent)
  _push((0,server_renderer_.ssrRenderComponent)(_component_NavbarLinks, { class: "can-hide" }, null, _parent))
  ;(0,server_renderer_.ssrRenderSlot)(_ctx.$slots, "after", {}, null, _push, _parent)
  _push((0,server_renderer_.ssrRenderComponent)(_component_Docsearch, null, null, _parent))
  _push(`</div></header>`)
}
;// CONCATENATED MODULE: ./node_modules/@vuepress/theme-default/lib/components/Navbar.vue?vue&type=template&id=550fd3fa

;// CONCATENATED MODULE: ./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[1]!./node_modules/@vuepress/bundler-webpack/lib/build/ssr/vuepressLoader.js!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[1]!./node_modules/@vuepress/theme-default/lib/components/NavbarLinks.vue?vue&type=template&id=e16c15f6



function NavbarLinksvue_type_template_id_e16c15f6_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_DropdownLink = (0,external_vue_.resolveComponent)("DropdownLink")
  const _component_NavLink = (0,external_vue_.resolveComponent)("NavLink")

  if (_ctx.navbarLinks.length) {
    _push(`<nav${(0,server_renderer_.ssrRenderAttrs)((0,external_vue_.mergeProps)({ class: "navbar-links" }, _attrs))}><!--[-->`)
    ;(0,server_renderer_.ssrRenderList)(_ctx.navbarLinks, (item) => {
      _push(`<div class="navbar-links-item">`)
      if (item.children) {
        _push((0,server_renderer_.ssrRenderComponent)(_component_DropdownLink, { item: item }, null, _parent))
      } else {
        _push((0,server_renderer_.ssrRenderComponent)(_component_NavLink, { item: item }, null, _parent))
      }
      _push(`</div>`)
    })
    _push(`<!--]--></nav>`)
  } else {
    _push(`<!---->`)
  }
}
;// CONCATENATED MODULE: ./node_modules/@vuepress/theme-default/lib/components/NavbarLinks.vue?vue&type=template&id=e16c15f6

;// CONCATENATED MODULE: ./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[1]!./node_modules/@vuepress/bundler-webpack/lib/build/ssr/vuepressLoader.js!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[1]!./node_modules/@vuepress/theme-default/lib/components/DropdownLink.vue?vue&type=template&id=b2940874



function DropdownLinkvue_type_template_id_b2940874_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_NavLink = (0,external_vue_.resolveComponent)("NavLink")

  _push(`<div${
    (0,server_renderer_.ssrRenderAttrs)((0,external_vue_.mergeProps)({
      class: ["dropdown-wrapper", { open: _ctx.open }]
    }, _attrs))
  }><button class="dropdown-title" type="button"${
    (0,server_renderer_.ssrRenderAttr)("aria-label", _ctx.dropdownAriaLabel)
  }><span class="title">${
    (0,server_renderer_.ssrInterpolate)(_ctx.item.text)
  }</span><span class="arrow down"></span></button><button class="mobile-dropdown-title" type="button"${
    (0,server_renderer_.ssrRenderAttr)("aria-label", _ctx.dropdownAriaLabel)
  }><span class="title">${
    (0,server_renderer_.ssrInterpolate)(_ctx.item.text)
  }</span><span class="${
    (0,server_renderer_.ssrRenderClass)([_ctx.open ? 'down' : 'right', "arrow"])
  }"></span></button><ul style="${
    (0,server_renderer_.ssrRenderStyle)((_ctx.open) ? null : { display: "none" })
  }" class="nav-dropdown"><!--[-->`)
  ;(0,server_renderer_.ssrRenderList)(_ctx.item.children, (child, index) => {
    _push(`<li class="dropdown-item">`)
    if (child.children) {
      _push(`<!--[--><h4 class="dropdown-subtitle">`)
      if (child.link) {
        _push((0,server_renderer_.ssrRenderComponent)(_component_NavLink, { item: child }, null, _parent))
      } else {
        _push(`<span>${(0,server_renderer_.ssrInterpolate)(child.text)}</span>`)
      }
      _push(`</h4><ul class="dropdown-subitem-wrapper"><!--[-->`)
      ;(0,server_renderer_.ssrRenderList)(child.children, (grandchild) => {
        _push(`<li class="dropdown-subitem">`)
        _push((0,server_renderer_.ssrRenderComponent)(_component_NavLink, { item: grandchild }, null, _parent))
        _push(`</li>`)
      })
      _push(`<!--]--></ul><!--]-->`)
    } else {
      _push((0,server_renderer_.ssrRenderComponent)(_component_NavLink, { item: child }, null, _parent))
    }
    _push(`</li>`)
  })
  _push(`<!--]--></ul></div>`)
}
;// CONCATENATED MODULE: ./node_modules/@vuepress/theme-default/lib/components/DropdownLink.vue?vue&type=template&id=b2940874

;// CONCATENATED MODULE: ./node_modules/esbuild-loader/dist/index.js??clonedRuleSet-30.use[0]!./node_modules/@vuepress/bundler-webpack/lib/build/ssr/vuepressLoader.js!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[1]!./node_modules/@vuepress/theme-default/lib/components/DropdownLink.vue?vue&type=script&lang=ts



/* harmony default export */ const DropdownLinkvue_type_script_lang_ts = ((0,external_vue_.defineComponent)({
  name: "DropdownLink",
  components: {
    NavLink: NavLink
  },
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    const {item} = (0,external_vue_.toRefs)(props);
    const dropdownAriaLabel = (0,external_vue_.computed)(() => item.value.ariaLabel || item.value.text);
    const open = (0,external_vue_.ref)(false);
    const route = (0,external_vue_router_.useRoute)();
    (0,external_vue_.watch)(() => route.path, () => {
      open.value = false;
    });
    const handleDropdown = (e) => {
      const isTriggerByTab = e.detail === 0;
      if (isTriggerByTab) {
        open.value = !open.value;
      } else {
        open.value = false;
      }
    };
    const isLastItemOfArray = (item2, arr) => arr[arr.length - 1] === item2;
    return {
      open,
      dropdownAriaLabel,
      handleDropdown,
      isLastItemOfArray
    };
  }
}));

;// CONCATENATED MODULE: ./node_modules/@vuepress/theme-default/lib/components/DropdownLink.vue?vue&type=script&lang=ts
 
;// CONCATENATED MODULE: ./node_modules/@vuepress/theme-default/lib/components/DropdownLink.vue



;
DropdownLinkvue_type_script_lang_ts.ssrRender = (...args) => {
  const ssrContext = args[2].appContext.provides[external_vue_.ssrContextKey]
  ssrContext._registeredComponents.add("/Users/runner/work/NineSwordsMonster.github.io/NineSwordsMonster.github.io/node_modules/@vuepress/bundler-webpack/lib/build/ssr/vuepressLoader.js!/Users/runner/work/NineSwordsMonster.github.io/NineSwordsMonster.github.io/node_modules/vue-loader/dist/index.js??ruleSet[0].use[1]!/Users/runner/work/NineSwordsMonster.github.io/NineSwordsMonster.github.io/node_modules/@vuepress/theme-default/lib/components/DropdownLink.vue")
  return DropdownLinkvue_type_template_id_b2940874_ssrRender(...args)
}


/* harmony default export */ const DropdownLink = (DropdownLinkvue_type_script_lang_ts);
;// CONCATENATED MODULE: ./node_modules/esbuild-loader/dist/index.js??clonedRuleSet-30.use[0]!./node_modules/@vuepress/bundler-webpack/lib/build/ssr/vuepressLoader.js!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[1]!./node_modules/@vuepress/theme-default/lib/components/NavbarLinks.vue?vue&type=script&lang=ts








const useNavbarSelectLanguage = () => {
  const router = (0,external_vue_router_.useRouter)();
  const routeLocale = (0,lib/* useRouteLocale */.I)();
  const siteLocale = (0,lib/* useSiteLocaleData */.I5)();
  const themeLocale = (0,lib/* useThemeLocaleData */.X6)();
  return (0,external_vue_.computed)(() => {
    var _a, _b;
    const localePaths = Object.keys(siteLocale.value.locales);
    if (localePaths.length < 2) {
      return [];
    }
    const currentPath = router.currentRoute.value.path;
    const currentFullPath = router.currentRoute.value.fullPath;
    const languageDropdown = {
      text: (_a = themeLocale.value.selectLanguageText) != null ? _a : "unkown language",
      ariaLabel: (_b = themeLocale.value.selectLanguageAriaLabel) != null ? _b : "unkown language",
      children: localePaths.map((targetLocalePath) => {
        var _a2, _b2, _c, _d, _e, _f;
        const targetSiteLocale = (_b2 = (_a2 = siteLocale.value.locales) == null ? void 0 : _a2[targetLocalePath]) != null ? _b2 : {};
        const targetThemeLocale = (_d = (_c = themeLocale.value.locales) == null ? void 0 : _c[targetLocalePath]) != null ? _d : {};
        const targetLang = `${targetSiteLocale.lang}`;
        const text = (_e = targetThemeLocale.selectLanguageName) != null ? _e : targetLang;
        let link;
        if (targetLang === siteLocale.value.lang) {
          link = currentFullPath;
        } else {
          const targetLocalePage = currentPath.replace(routeLocale.value, targetLocalePath);
          if (router.getRoutes().some((item) => item.path === targetLocalePage)) {
            link = targetLocalePage;
          } else {
            link = (_f = targetThemeLocale.home) != null ? _f : targetLocalePath;
          }
        }
        return {
          text,
          link
        };
      })
    };
    return [languageDropdown];
  });
};
const useNavbarRepo = () => {
  const themeLocale = (0,lib/* useThemeLocaleData */.X6)();
  const repo = (0,external_vue_.computed)(() => themeLocale.value.repo);
  const repoType = (0,external_vue_.computed)(() => repo.value ? resolveRepoType(repo.value) : null);
  const repoLink = (0,external_vue_.computed)(() => {
    if (repoType.value === "GitHub") {
      return `https://github.com/${repo.value}`;
    }
    return repo.value;
  });
  const repoLabel = (0,external_vue_.computed)(() => {
    if (!repoLink.value)
      return null;
    if (themeLocale.value.repoLabel)
      return themeLocale.value.repoLabel;
    if (repoType.value === null)
      return "Source";
    return repoType.value;
  });
  return (0,external_vue_.computed)(() => {
    if (!repoLink.value || !repoLabel.value) {
      return [];
    }
    return [
      {
        text: repoLabel.value,
        link: repoLink.value
      }
    ];
  });
};
const resolveNavbarItem = (item) => {
  if ((0,esm/* isString */.HD)(item)) {
    return (0,composables/* useNavLink */.sC)(item);
  }
  if (item.children) {
    return {
      ...item,
      children: item.children.map(resolveNavbarItem)
    };
  }
  return item;
};
const useNavbarConfig = () => {
  const themeLocale = (0,lib/* useThemeLocaleData */.X6)();
  return (0,external_vue_.computed)(() => (themeLocale.value.navbar || []).map(resolveNavbarItem));
};
/* harmony default export */ const NavbarLinksvue_type_script_lang_ts = ((0,external_vue_.defineComponent)({
  name: "NavbarLinks",
  components: {
    NavLink: NavLink,
    DropdownLink: DropdownLink
  },
  setup() {
    const navbarConfig = useNavbarConfig();
    const navbarSelectLanguage = useNavbarSelectLanguage();
    const navbarRepo = useNavbarRepo();
    const navbarLinks = (0,external_vue_.computed)(() => [
      ...navbarConfig.value,
      ...navbarSelectLanguage.value,
      ...navbarRepo.value
    ]);
    return {
      navbarLinks
    };
  }
}));

;// CONCATENATED MODULE: ./node_modules/@vuepress/theme-default/lib/components/NavbarLinks.vue?vue&type=script&lang=ts
 
;// CONCATENATED MODULE: ./node_modules/@vuepress/theme-default/lib/components/NavbarLinks.vue



;
NavbarLinksvue_type_script_lang_ts.ssrRender = (...args) => {
  const ssrContext = args[2].appContext.provides[external_vue_.ssrContextKey]
  ssrContext._registeredComponents.add("/Users/runner/work/NineSwordsMonster.github.io/NineSwordsMonster.github.io/node_modules/@vuepress/bundler-webpack/lib/build/ssr/vuepressLoader.js!/Users/runner/work/NineSwordsMonster.github.io/NineSwordsMonster.github.io/node_modules/vue-loader/dist/index.js??ruleSet[0].use[1]!/Users/runner/work/NineSwordsMonster.github.io/NineSwordsMonster.github.io/node_modules/@vuepress/theme-default/lib/components/NavbarLinks.vue")
  return NavbarLinksvue_type_template_id_e16c15f6_ssrRender(...args)
}


/* harmony default export */ const NavbarLinks = (NavbarLinksvue_type_script_lang_ts);
;// CONCATENATED MODULE: ./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[1]!./node_modules/@vuepress/bundler-webpack/lib/build/ssr/vuepressLoader.js!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[1]!./node_modules/@vuepress/theme-default/lib/components/ToggleSidebarButton.vue?vue&type=template&id=a0fdb5ae



function ToggleSidebarButtonvue_type_template_id_a0fdb5ae_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${(0,server_renderer_.ssrRenderAttrs)((0,external_vue_.mergeProps)({ class: "toggle-sidebar-button" }, _attrs))}><svg class="icon" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" viewBox="0 0 448 512"><path fill="currentColor" d="M436 124H12c-6.627 0-12-5.373-12-12V80c0-6.627 5.373-12 12-12h424c6.627 0 12 5.373 12 12v32c0 6.627-5.373 12-12 12zm0 160H12c-6.627 0-12-5.373-12-12v-32c0-6.627 5.373-12 12-12h424c6.627 0 12 5.373 12 12v32c0 6.627-5.373 12-12 12zm0 160H12c-6.627 0-12-5.373-12-12v-32c0-6.627 5.373-12 12-12h424c6.627 0 12 5.373 12 12v32c0 6.627-5.373 12-12 12z" class=""></path></svg></div>`)
}
;// CONCATENATED MODULE: ./node_modules/@vuepress/theme-default/lib/components/ToggleSidebarButton.vue?vue&type=template&id=a0fdb5ae

;// CONCATENATED MODULE: ./node_modules/esbuild-loader/dist/index.js??clonedRuleSet-30.use[0]!./node_modules/@vuepress/bundler-webpack/lib/build/ssr/vuepressLoader.js!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[1]!./node_modules/@vuepress/theme-default/lib/components/ToggleSidebarButton.vue?vue&type=script&lang=ts

/* harmony default export */ const ToggleSidebarButtonvue_type_script_lang_ts = ((0,external_vue_.defineComponent)({
  name: "ToggleSidebarButton",
  emits: ["toggle"]
}));

;// CONCATENATED MODULE: ./node_modules/@vuepress/theme-default/lib/components/ToggleSidebarButton.vue?vue&type=script&lang=ts
 
;// CONCATENATED MODULE: ./node_modules/@vuepress/theme-default/lib/components/ToggleSidebarButton.vue



;
ToggleSidebarButtonvue_type_script_lang_ts.ssrRender = (...args) => {
  const ssrContext = args[2].appContext.provides[external_vue_.ssrContextKey]
  ssrContext._registeredComponents.add("/Users/runner/work/NineSwordsMonster.github.io/NineSwordsMonster.github.io/node_modules/@vuepress/bundler-webpack/lib/build/ssr/vuepressLoader.js!/Users/runner/work/NineSwordsMonster.github.io/NineSwordsMonster.github.io/node_modules/vue-loader/dist/index.js??ruleSet[0].use[1]!/Users/runner/work/NineSwordsMonster.github.io/NineSwordsMonster.github.io/node_modules/@vuepress/theme-default/lib/components/ToggleSidebarButton.vue")
  return ToggleSidebarButtonvue_type_template_id_a0fdb5ae_ssrRender(...args)
}


/* harmony default export */ const ToggleSidebarButton = (ToggleSidebarButtonvue_type_script_lang_ts);
;// CONCATENATED MODULE: ./node_modules/esbuild-loader/dist/index.js??clonedRuleSet-30.use[0]!./node_modules/@vuepress/bundler-webpack/lib/build/ssr/vuepressLoader.js!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[1]!./node_modules/@vuepress/theme-default/lib/components/Navbar.vue?vue&type=script&lang=ts



/* harmony default export */ const Navbarvue_type_script_lang_ts = ((0,external_vue_.defineComponent)({
  name: "Navbar",
  components: {
    NavbarLinks: NavbarLinks,
    ToggleSidebarButton: ToggleSidebarButton
  },
  emits: ["toggle-sidebar"],
  setup() {
    const navbar = (0,external_vue_.ref)(null);
    const siteName = (0,external_vue_.ref)(null);
    const linksWrapperMaxWidth = (0,external_vue_.ref)(0);
    const linksWrapperStyle = (0,external_vue_.computed)(() => {
      if (!linksWrapperMaxWidth.value) {
        return {};
      }
      return {
        "max-width": linksWrapperMaxWidth.value + "px"
      };
    });
    (0,external_vue_.onMounted)(() => {
      const MOBILE_DESKTOP_BREAKPOINT = 719;
      const NAVBAR_VERTICAL_PADDING = getCssValue(navbar.value, "paddingLeft") + getCssValue(navbar.value, "paddingRight");
      const handleLinksWrapWidth = () => {
        var _a;
        if (document.documentElement.clientWidth < MOBILE_DESKTOP_BREAKPOINT) {
          linksWrapperMaxWidth.value = 0;
        } else {
          linksWrapperMaxWidth.value = navbar.value.offsetWidth - NAVBAR_VERTICAL_PADDING - (((_a = siteName.value) == null ? void 0 : _a.offsetWidth) || 0);
        }
      };
      handleLinksWrapWidth();
      window.addEventListener("resize", handleLinksWrapWidth, false);
    });
    return {
      navbar,
      siteName,
      linksWrapperStyle
    };
  }
}));
function getCssValue(el, property) {
  var _a, _b, _c;
  const val = (_c = (_b = (_a = el == null ? void 0 : el.ownerDocument) == null ? void 0 : _a.defaultView) == null ? void 0 : _b.getComputedStyle(el, null)) == null ? void 0 : _c[property];
  const num = Number.parseInt(val, 10);
  return Number.isNaN(num) ? 0 : num;
}

;// CONCATENATED MODULE: ./node_modules/@vuepress/theme-default/lib/components/Navbar.vue?vue&type=script&lang=ts
 
;// CONCATENATED MODULE: ./node_modules/@vuepress/theme-default/lib/components/Navbar.vue



;
Navbarvue_type_script_lang_ts.ssrRender = (...args) => {
  const ssrContext = args[2].appContext.provides[external_vue_.ssrContextKey]
  ssrContext._registeredComponents.add("/Users/runner/work/NineSwordsMonster.github.io/NineSwordsMonster.github.io/node_modules/@vuepress/bundler-webpack/lib/build/ssr/vuepressLoader.js!/Users/runner/work/NineSwordsMonster.github.io/NineSwordsMonster.github.io/node_modules/vue-loader/dist/index.js??ruleSet[0].use[1]!/Users/runner/work/NineSwordsMonster.github.io/NineSwordsMonster.github.io/node_modules/@vuepress/theme-default/lib/components/Navbar.vue")
  return Navbarvue_type_template_id_550fd3fa_ssrRender(...args)
}


/* harmony default export */ const Navbar = (Navbarvue_type_script_lang_ts);
;// CONCATENATED MODULE: ./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[1]!./node_modules/@vuepress/bundler-webpack/lib/build/ssr/vuepressLoader.js!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[1]!./node_modules/@vuepress/theme-default/lib/components/Sidebar.vue?vue&type=template&id=6b76a9f2



function Sidebarvue_type_template_id_6b76a9f2_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_NavbarLinks = (0,external_vue_.resolveComponent)("NavbarLinks")
  const _component_SidebarChild = (0,external_vue_.resolveComponent)("SidebarChild")

  _push(`<aside${(0,server_renderer_.ssrRenderAttrs)((0,external_vue_.mergeProps)({ class: "sidebar" }, _attrs))}>`)
  _push((0,server_renderer_.ssrRenderComponent)(_component_NavbarLinks, null, null, _parent))
  ;(0,server_renderer_.ssrRenderSlot)(_ctx.$slots, "top", {}, null, _push, _parent)
  _push(`<ul class="sidebar-links"><!--[-->`)
  ;(0,server_renderer_.ssrRenderList)(_ctx.sidebarItems, (item) => {
    _push((0,server_renderer_.ssrRenderComponent)(_component_SidebarChild, { item: item }, null, _parent))
  })
  _push(`<!--]--></ul>`)
  ;(0,server_renderer_.ssrRenderSlot)(_ctx.$slots, "bottom", {}, null, _push, _parent)
  _push(`</aside>`)
}
;// CONCATENATED MODULE: ./node_modules/@vuepress/theme-default/lib/components/Sidebar.vue?vue&type=template&id=6b76a9f2

;// CONCATENATED MODULE: ./node_modules/@vuepress/theme-default/lib/components/SidebarChild.js



const normalizePath = (path) => decodeURI(path)
    .replace(/#.*$/, '')
    .replace(/(index)?\.(md|html)$/, '');
const isActive = (route, target) => {
    if (target === undefined) {
        return false;
    }
    if (route.hash === target) {
        return true;
    }
    const currentPath = normalizePath(route.path);
    const targetPath = normalizePath(target);
    return currentPath === targetPath;
};
const renderItem = (item, props) => {
    // if the item has link, render it as `<NavLink>`
    if (item.link) {
        return (0,external_vue_.h)(NavLink, {
            ...props,
            item,
        });
    }
    // if the item only has text, render it as `<p>`
    return (0,external_vue_.h)('p', props, item.text);
};
const renderChildren = (item, depth) => {
    var _a;
    if (!((_a = item.children) === null || _a === void 0 ? void 0 : _a.length)) {
        return null;
    }
    return (0,external_vue_.h)('ul', {
        class: {
            'sidebar-sub-headers': depth > 0,
        },
    }, item.children.map((child) => (0,external_vue_.h)('li', (0,external_vue_.h)(SidebarChild, {
        item: child,
        depth: depth + 1,
    }))));
};
const SidebarChild = ({ item, depth }) => {
    var _a;
    if (item.isGroup) {
        return [
            (0,external_vue_.h)('section', {
                class: {
                    'sidebar-group': true,
                },
            }, [
                renderItem(item, {
                    class: 'sidebar-heading',
                }),
                renderChildren(item, depth),
            ]),
        ];
    }
    const route = (0,external_vue_router_.useRoute)();
    const active = isActive(route, item.link) || ((_a = item.children) === null || _a === void 0 ? void 0 : _a.some((child) => isActive(route, child.link)));
    return [
        renderItem(item, {
            class: {
                'sidebar-link': true,
                active,
            },
        }),
        renderChildren(item, depth),
    ];
};
SidebarChild.displayName = 'SidebarChild';
SidebarChild.props = {
    item: {
        type: Object,
        required: true,
    },
    depth: {
        type: Number,
        required: false,
        default: 0,
    },
};
//# sourceMappingURL=SidebarChild.js.map
;// CONCATENATED MODULE: ./node_modules/esbuild-loader/dist/index.js??clonedRuleSet-30.use[0]!./node_modules/@vuepress/bundler-webpack/lib/build/ssr/vuepressLoader.js!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[1]!./node_modules/@vuepress/theme-default/lib/components/Sidebar.vue?vue&type=script&lang=ts




/* harmony default export */ const Sidebarvue_type_script_lang_ts = ((0,external_vue_.defineComponent)({
  name: "Sidebar",
  components: {
    NavbarLinks: NavbarLinks,
    SidebarChild: SidebarChild
  },
  setup() {
    const sidebarItems = (0,composables/* useSidebarItems */.VU)();
    return {
      sidebarItems
    };
  }
}));

;// CONCATENATED MODULE: ./node_modules/@vuepress/theme-default/lib/components/Sidebar.vue?vue&type=script&lang=ts
 
;// CONCATENATED MODULE: ./node_modules/@vuepress/theme-default/lib/components/Sidebar.vue



;
Sidebarvue_type_script_lang_ts.ssrRender = (...args) => {
  const ssrContext = args[2].appContext.provides[external_vue_.ssrContextKey]
  ssrContext._registeredComponents.add("/Users/runner/work/NineSwordsMonster.github.io/NineSwordsMonster.github.io/node_modules/@vuepress/bundler-webpack/lib/build/ssr/vuepressLoader.js!/Users/runner/work/NineSwordsMonster.github.io/NineSwordsMonster.github.io/node_modules/vue-loader/dist/index.js??ruleSet[0].use[1]!/Users/runner/work/NineSwordsMonster.github.io/NineSwordsMonster.github.io/node_modules/@vuepress/theme-default/lib/components/Sidebar.vue")
  return Sidebarvue_type_template_id_6b76a9f2_ssrRender(...args)
}


/* harmony default export */ const Sidebar = (Sidebarvue_type_script_lang_ts);
;// CONCATENATED MODULE: ./node_modules/esbuild-loader/dist/index.js??clonedRuleSet-30.use[0]!./node_modules/@vuepress/bundler-webpack/lib/build/ssr/vuepressLoader.js!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[1]!./node_modules/@vuepress/theme-default/lib/layouts/Layout.vue?vue&type=script&lang=ts








/* harmony default export */ const Layoutvue_type_script_lang_ts = ((0,external_vue_.defineComponent)({
  name: "Layout",
  components: {
    Home: Home,
    Page: Page,
    Navbar: Navbar,
    Sidebar: Sidebar
  },
  setup() {
    const frontmatter = (0,lib/* usePageFrontmatter */.I2)();
    const themeLocale = (0,lib/* useThemeLocaleData */.X6)();
    const shouldShowNavbar = (0,external_vue_.computed)(() => frontmatter.value.navbar !== false && themeLocale.value.navbar !== false);
    const sidebarItems = (0,composables/* useSidebarItems */.VU)();
    const isSidebarOpen = (0,external_vue_.ref)(false);
    const toggleSidebar = (to) => {
      isSidebarOpen.value = typeof to === "boolean" ? to : !isSidebarOpen.value;
    };
    const touchStart = {x: 0, y: 0};
    const onTouchStart = (e) => {
      touchStart.x = e.changedTouches[0].clientX;
      touchStart.y = e.changedTouches[0].clientY;
    };
    const onTouchEnd = (e) => {
      const dx = e.changedTouches[0].clientX - touchStart.x;
      const dy = e.changedTouches[0].clientY - touchStart.y;
      if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 40) {
        if (dx > 0 && touchStart.x <= 80) {
          toggleSidebar(true);
        } else {
          toggleSidebar(false);
        }
      }
    };
    const containerClass = (0,external_vue_.computed)(() => ({
      "no-navbar": !shouldShowNavbar.value,
      "no-sidebar": !sidebarItems.value.length,
      "sidebar-open": isSidebarOpen.value
    }));
    let unregisterRouterHook;
    (0,external_vue_.onMounted)(() => {
      const router = (0,external_vue_router_.useRouter)();
      unregisterRouterHook = router.afterEach(() => {
        toggleSidebar(false);
      });
    });
    (0,external_vue_.onUnmounted)(() => {
      unregisterRouterHook();
    });
    return {
      containerClass,
      shouldShowNavbar,
      toggleSidebar,
      onTouchStart,
      onTouchEnd
    };
  }
}));

;// CONCATENATED MODULE: ./node_modules/@vuepress/theme-default/lib/layouts/Layout.vue?vue&type=script&lang=ts
 
;// CONCATENATED MODULE: ./node_modules/@vuepress/theme-default/lib/layouts/Layout.vue



;
Layoutvue_type_script_lang_ts.ssrRender = (...args) => {
  const ssrContext = args[2].appContext.provides[external_vue_.ssrContextKey]
  ssrContext._registeredComponents.add("/Users/runner/work/NineSwordsMonster.github.io/NineSwordsMonster.github.io/node_modules/@vuepress/bundler-webpack/lib/build/ssr/vuepressLoader.js!/Users/runner/work/NineSwordsMonster.github.io/NineSwordsMonster.github.io/node_modules/vue-loader/dist/index.js??ruleSet[0].use[1]!/Users/runner/work/NineSwordsMonster.github.io/NineSwordsMonster.github.io/node_modules/@vuepress/theme-default/lib/layouts/Layout.vue")
  return ssrRender(...args)
}


/* harmony default export */ const Layout = (Layoutvue_type_script_lang_ts);

/***/ })

};
;
//# sourceMappingURL=832.app.js.map