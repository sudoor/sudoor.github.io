    ---
title: Vue 简明教程
comments: true
date: 2017-12-13 18:07:07
update: 2017-12-13 18:07:07
categories:
    - Javascript
    - Vue
tags:
    - Javascript
    - Vue
keywords:
    - Javascript
    - Vue
description:
    Vue -渐进式JavaScript框架
---

## 库和框架的区别
先说说前端中什么叫库， 什么叫框架。

- Library

`库` 是指一些函数方法的集合， 通常为使用者调用。
比如： `jQuery`，`Lodash`，`unslide`等

- Framework

`框架`，是指能向用户提供完整的解决方案，通常控制权在框架本身。
比如：`angular`、`backbone`、`vue`等，就属于框架。

其三者关系如下：

```puml
(Your Code) as u1
(Library) as u2
(Framework) as u3

u1 -down-> u2 : you call Library

u3 -left-> u1 : Framework call you

u3 -left-> u2 : contains

```

## MVVM

关于UI模式发展可参考 [从Script到Code Blocks、Code Behind到MVC、MVP、MVVM - 科普](http://www.cnblogs.com/indream/p/3602348.html).

### MVC 组成
> M: Model 数据模型（专门用来操作数据，数据的CRUD）

> V：View 视图（对于前端来说，就是页面）

> C：Controller 控制器（是视图和数据模型沟通的桥梁，用于处理业务逻辑）

### MVVM 组成
> MVVM ===> M / V / VM

> M：model数据模型

> V：view视图

> VM：ViewModel 视图模型

### 优势对比
1. `MVC`模式，将应用程序划分为三大部分，实现了职责分离
2. 在前端中经常要通过 JS代码 来进行一些逻辑操作，最终还要把这些逻辑操作的结果现在页面中。也就是需要频繁的操作`DOM`
3. `MVVM`通过数据双向绑定让数据自动地双向同步
    - V（修改数据） -> M
    - M（修改数据） -> V
    - 数据是核心
    
4. `Vue`这种`MVVM`模式的框架，不推荐开发人员`手动操作DOM`

### Vue中的MVVM
`Vue` 的设计与  `MVVM` 模型十分相似。
在文档中经常会使用 `vm` (`ViewModel` 的简称) 这个变量名表示 `Vue` 实例

### ___学习Vue要转化思想___
放弃使用`Jquery` 式操作`DOM`，转而思考如何 ___操作数据___！！！(推荐一个 _库_ [Lodash](https://lodash.com/ 'Lodash'))

## VUE 下 Hello world

- 使用： `yarn add vue`(推荐) 或者 `npm install --save vue`（国内可尝试使用[淘宝镜像](https://npm.taobao.org/ '淘宝镜像')）
```html
<!-- Vue 挂载点 通常我们也把它叫做边界 数据只在边界内部解析-->
<div id="app">{{ msg }}</div>

<!-- 引入 vue.js -->
<script src="vue.js"></script>

<!-- 使用 vue -->
<script>
  var vm = new Vue({
    // el：Vue 实例在DOM元素上的挂载目标
    el: '#app',
    // Vue 实例的数据对象， 管理VUE数据
    data: {
      msg: 'Hello Vue'
    }
  })
</script>
```

### Vue 实例

1. 需要在`data`中声明， 然后才能使用数据
2. 可以通过 `vm.$data` 访问到`data`中的所有属性，或者使用`path` `vm.msg` 访问

```javascript
var vm = new Vue({
  data: {
    msg: 'Hello World'
  }
})

vm.$data.msg === vm.msg // true

```


### 数据绑定
`Vue` 使用 `Mustache`(插值语法)，也就是 `&#123;&#123;&#125;&#125;` 语法, 
当然也可以修改

```html
<script>
Vue.config.delimiters = ['<%', '%>'];
</script>
<div id="app">
  <% message %>
</div>

```

当 `vm.$data` 发生变化时， 页面插值的元素内容也会跟着变化
`vue` 插值支持`JavaScript`表达式。
```html
<p>{{ isOk ? 'yes': 'no' }}</p>
```

### 双向数据绑定
何为双向？当页面元素数据变化同时影响`vue`实例 data。`vue` 实例 `data` 变化， 页面元素数据同时变化。
其实现原理依靠 `Object.defineProperty` _（见[MDN - Object.defineProperty()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty 'MDN - Object.defineProperty()')）_ 的 get set 方法。
`Vue` 定义了 `getter`和`setter` 访问器 用于指定读取或设置对象属性值的时候，执行的操作 _（详情见[Vue - 深入响应式原理](https://cn.vuejs.org/v2/guide/reactivity.html 'Vue - 深入响应式原理')）_

```javascript
/*  defineProperty语法 介绍 */
var obj = {}
Object.defineProperty(obj, 'msg', {
  // 设置 obj.msg = "1" 时set方法会被系统调用 参数分别是设置后和设置前的值
  set: function (newVal, oldVal) {  },
  // 读取 obj.msg 时get方法会被系统调用
  get: function ( newVal, oldVal ) {}
})
```

### 动态添加数据的注意点
只有`data`中的数据才是响应式的，动态添加进来的数据默认为非响应式

可以通过以下方式实现动态添加数据的响应式

1. `Vue.set(object, key, value)` - 适用于添加单个属性
2. `Object.assign()` - 适用于添加多个属性

```javascript
var vm = new Vue({
  data: {
    user: {
      name: 'LuLu',
      age: 18
    }
  }
})

/* Vue.set */
Vue.set(vm.user, 'gender', 'female')

/* Object.assign 将参数中的所有对象属性和值 合并到第一个参数 并返回合并后的对象*/
vm.user = Object.assign({}, vm.user, { gender: 'female', height: 168 })
```

### 异步DOM更新
`Vue` 异步执行 `DOM` 更新，监视所有数据改变, 一旦数据变化则更新`DOM`
这样可以去除一些重复数据，还可以避免不必要的计算和避免重复 `DOM` 操作
如果需要获取更新后`dom`中的数据， 可以通过 `Vue.nextTick(callback)`在`DOM`更新后，执行某个操作（属于`DOM`操作）

> 实例调用`vm.$nextTick(function () {})`

```javascript
methods: {
  fn() {
    this.msg = 'change'
    this.$nextTick(function () {
      console.log('$nextTick中打印：', this.$el.children[0].innerText);
    })
    console.log('直接打印：', this.$el.children[0].innerText);
  }
}
```

## 指令
带有 `v-` 前缀的特殊属性, 当表达式的值改变时，将其产生的连带影响，响应式地作用于 DOM

### v-text
- 解释：更新DOM对象的 `textContent`
```html
<h1 v-text="msg"></h1>
```

### v-html
- 解释：更新DOM对象的 `innerHTML`
```html
<h1 v-html="msg"></h1>
```

### v-bind
- 作用：当表达式的值改变时，将其产生的连带影响，响应式地作用于 DOM
- 语法：`v-bind:title="msg"`
- 简写：`:title="msg"`
```html
<!-- 完整语法 -->
<a v-bind:href="url"></a>
<!-- 缩写 -->
<a :href="url"></a>
```

### v-on
- 作用：绑定事件
- 语法：`v-on:click="say"` or `v-on:click="say('参数', $event)"`
- 简写：`@click="say"`
- 说明：绑定的事件定义在methods

```html
<!-- 完整语法 -->
<a v-on:click="doSomething"></a>
<!-- 缩写 -->
<a @click="doSomething"></a>
```

### 事件修饰符
`.stop` 阻止冒泡，调用 `event.stopPropagation()`
`.prevent` 阻止默认行为，调用 `event.preventDefault()`
`.capture` 添加事件侦听器时使用事件捕获模式
`.self` 只当事件在该元素本身（比如不是子元素）触发时，才会触发事件
`.once` 事件只触发一次

### v-model
- 作用：在表单元素上创建双向数据绑定
- 说明：监听用户的输入事件以更新数据

```html
<input type="text" v-model="message" placeholder="edit me">
<p>Message is: {{ message }}</p>
```

### v-for
- 作用：基于源数据多次渲染元素或模板块

```html
<!-- 1 基础用法 -->
<div v-for="item in items">
  {{ item.text }}
</div>

<!-- item 为当前项，index 为索引 -->
<p v-for="(item, index) in list">{{item}} -- {{index}}</p>
<!-- item 为值，key 为键，index 为索引 -->
<p v-for="(item, key, index) in obj">{{item}} -- {{key}}</p>
<p v-for="item in 10">{{item}}</p>

```

### key属性
- 推荐：使用 v-for 的时候提供 key 属性，以获得性能提升。
- 说明：使用 key，VUE会基于 key 的变化重新排列元素顺序，并且会移除 key 不存在的元素。
- [vue key](https://cn.vuejs.org/v2/guide/list.html#key 'vue key')
- [vue key属性的说明](https://www.zhihu.com/question/61064119/answer/183717717 'v-for 中 :key 到底有什么用？')

```html
<div v-for="item in items" :key="item.id">
  <!-- 内容 -->
</div>
```

## 样式处理 -class 和 style

- 使用方式：`v-bind:class="expression"` or `:class="expression"`
- 表达式的类型：`字符串`、`数组`、`对象` ___（重点）___
- 语法：
```html
<!-- 1 -->
<div v-bind:class="{ active: true }"></div> ===> 解析后
<div class="active"></div>

<!-- 2 -->
<div :class="['active', 'text-danger']"></div> ===>解析后
<div class="active text-danger"></div>

<!-- 3 -->
<div v-bind:class="[{ active: true }, errorClass]"></div> ===>解析后
<div class="active text-danger"></div>

--- style ---
<!-- 1 -->
<div v-bind:style="{ color: activeColor, 'font-size': fontSize + 'px' }"></div>
<!-- 2 将多个 样式对象 应用到一个元素上-->
<!-- baseStyles 和 overridingStyles 都是data中定义的对象 -->
<div v-bind:style="[baseStyles, overridingStyles]"></div>

```

### v-if 和 v-show
- [条件渲染](https://cn.vuejs.org/v2/guide/conditional.html '条件渲染')
- v-if：根据表达式的值的真假条件，销毁或重建元素
- v-show：根据表达式之真假值，切换元素的 `display:none` CSS 属性
```html
<p v-show="isShow">这个元素展示出来了吗？？？</p>
<p v-if="isShow">这个元素，在HTML结构中吗？？？</p>
```

### 提升性能：v-pre
说明：`vue`会跳过这个元素和它的子元素的编译过程。可以用来显示原始 `Mustache` 标签。跳过大量没有指令的节点会加快编译。
```html
<span v-pre>{{ this will not be compiled }}</span>
```

### 提升性能：v-once
说明：`vue`只渲染元素和组件一次。随后的重新渲染，元素/组件及其所有的子节点将被视为静态内容并跳过。这可以用于优化更新性能。
```html
<span v-once>This will never change: {{msg}}</span>
```

## 过滤器 filter
- 作用：文本数据格式化
- 过滤器可以用在两个地方：`&#123;&#123;&#125;&#125;`和 `v-bind` 表达式

两种过滤器：

### 全局过滤器
- 说明：通过全局方式创建的过滤器，在任何一个vue实例中都可以使用
- 注意：使用全局过滤器的时候，需要先创建全局过滤器，再创建Vue实例.
显示的内容由过滤器的返回值决定
```javascript
Vue.filter('filterName', function (value) {
  // value 表示要过滤的内容
})
```

示例：
```html
<div>{{ dateStr | date }}</div>
<div>{{ dateStr | date('YYYY-MM-DD hh:mm:ss') }}</div>

<script>
  Vue.filter('date', function(value, format) {
    // value 要过滤的字符串内容，比如：dateStr
    // format 过滤器的参数，比如：'YYYY-MM-DD hh:mm:ss'
  })
</script>
```

### 局部过滤器
- 说明：局部过滤器是在某一个`vue`实例的内容创建的，只在当前实例中起作用
```javascript
{
  data: {},
  // 通过 filters 属性创建局部过滤器
  // 注意：此处为 filters
  filters: {
    filterName: function(value, format) {}
  }
}
```

## 按键值修饰符
- 说明：在监听键盘事件时，Vue 允许为 v-on 在监听键盘事件时添加关键修饰符
- [键盘事件 - 键值修饰符](https://cn.vuejs.org/v2/guide/events.html# '键盘事件 - 键值修饰符' )
- 其他：修饰键（`.ctr`l等）、鼠标按键修饰符（`.left`等）

```html
// 只有在 keyCode 是 13 时调用 vm.submit()
@keyup.13="submit"
// 使用全局按键别名
@keyup.enter="add"

// 通过全局 config.keyCodes 对象自定义键值修饰符别名
Vue.config.keyCodes.f2 = 113
// 使用自定义键值修饰符
@keyup.enter.f2="add"

```

### watch

- 概述：`watch`是一个对象，键是需要观察的表达式，值是对应回调函数
- 作用：当表达式的值发生变化后，会调用对应的回调函数完成响应的监视操作
- [VUE $watch](https://cn.vuejs.org/v2/api/#vm-watch 'VUE $watch')

```javascript
new Vue({
  data: { a: 1, b: { age: 10 } },
  watch: {
    a: function(val, oldVal) {
      // val 表示当前值
      // oldVal 表示旧值
      console.log('当前值为：' + val, '旧值为：' + oldVal)
    },

    // 监听对象属性的变化
    b: {
      handler: function (val, oldVal) { /* ... */ },
      // deep : true表示是否监听对象内部属性值的变化 
      deep: true
    },

    // 只监视user对象中age属性的变化
    'user.age': function (val, oldVal) {
    },
  }
})
```

### 计算属性

- 说明：计算属性是基于它们的依赖进行缓存的，只有在它的依赖发生改变时才会重新求值
- 注意：`Mustache`语法（`&#123;&#123;&#125;&#125;`）中不要放入太多的逻辑，否则会让模板过重、难以理解和维护
- 注意：`computed`中的属性不能与`data`中的属性同名，否则会报错
- [Vue computed属性原理](http://www.cnblogs.com/kidney/p/7384835.html?utm_source=debugrun&amp;utm_medium=referral 'Vue computed属性原理')

```javascript
var vm = new Vue({
  el: '#app',
  data: {
    firstname: 'jack',
    lastname: 'rose'
  },
  computed: {
    fullname() {
      return this.firstname + '.' + this.lastname
    }
  }
})
```

## 实例生命周期
所有的 `vue` 组件都是 `Vue` 实例，并且接受相同的选项对象即可 (一些根实例特有的选项除外)。

实例生命周期也叫做：组件生命周期

### 生命周期介绍
- [vue生命周期钩子函数](https://cn.vuejs.org/v2/api/# 'vue生命周期钩子函数')
- 简单说：一个组件从开始到最后消亡所经历的各种状态，就是一个组件的生命周期
- 生命周期钩子函数的定义：从组件被创建，到组件挂载到页面上运行，再到页面关闭组件被卸载，这三个阶段总是伴随着组件各种各样的事件，这些事件，统称为组件的生命周期函数！

- 注意：`Vue`在执行过程中会自动调用生命周期钩子函数，我们只需要提供这些钩子函数即可

- 注意：钩子函数的名称都是Vue中规定好的！

### hook - beforeCreate()
- 说明：在实例初始化之后，数据观测 (`data observe`r) 和 `vent/watcher` 事件配置之前被调用
- 注意：此时，无法获取 `data`中的数据、`methods`中的方法

### hook - created()
- 注意：这是一个常用的生命周期，可以调用methods中的方法、改变data中的数据
- [vue实例生命周期 参考1](https://segmentfault.com/a/1190000008879966 'vue实例生命周期 参考1')
- [vue实例生命周期 参考2](https://segmentfault.com/a/1190000008010666 'vue实例生命周期 参考2')
- 使用场景：发送请求获取数据

### hook - beforeMounted() 
- 明：在挂载开始之前被调用

### hook - mounted()
- 说明：此时，`vue`实例已经挂载到页面中，可以获取到el中的DOM元素，进行DOM操作

### hook - beforeUpdated()
- 说明：数据更新时调用，发生在虚拟 `DOM` 重新渲染和打补丁之前。你可以在这个钩子中进一步地更改状态，这不会触发附加的重渲染过程。
- 注意：此处获取的数据是更新后的数据，但是获取页面中的DOM元素是更新之前的

### hook - updated()
- 说明：组件 `DOM` 已经更新，所以你现在可以执行依赖于 `DOM` 的操作。

### hook - beforeDestroy()
- 说明：实例销毁之前调用。在这一步，实例仍然完全可用。
- 使用场景：实例销毁之前，执行清理任务，比如：清除定时器等

### hook - destroyed()
- 说明：`Vue` 实例销毁后调用。调用后，`Vue` 实例指示的所有东西都会解绑定，所有的事件监听器会被移除，所有的子实例也会被销毁。

## 自定义指令
- 作用：进行`DOM`操作
- 使用场景：对纯 `DOM `元素进行底层操作，比如：文本框获得焦点
- [`vue` 自定义指令用法实例](https://juejin.im/entry/58b7c5d8ac502e006cfee34a 'vue 自定义指令用法实例')

### 全局自定义指令

```javascript
// 第一个参数：指令名称
// 第二个参数：配置对象，指定指令的钩子函数
Vue.directive('directiveName', {
  // bind中只能对元素自身进行DOM操作，而无法对父级元素操作
  // 只调用一次 指令第一次绑定到元素时调用。在这里可以进行一次性的初始化设置。
  bind( el，binding, vnode ) {
    // 参数详解
    // el：指令所绑定的元素，可以用来直接操作 DOM 。
    // binding：一个对象，包含以下属性：
      // name：指令名，不包括 v- 前缀。
      // value：指令的绑定值，等号后面的值 。
      // oldValue：指令绑定的前一个值，仅在 update 和 componentUpdated 钩子中可用。无论值是否改变都可用。
      // expression：字符串形式的指令表达式 等号后面的字符串 形式
      // arg：传给指令的参数，可选。例如 v-my-directive:foo 中，参数为 "foo"。
      // modifiers：指令修饰符。例如：v-directive.foo.bar中，修饰符对象为 { foo: true, bar: true }。
    // vnode：Vue 编译生成的虚拟节点。。
    // oldVnode：上一个虚拟节点，仅在 update 和 componentUpdated 钩子中可用。
  },
  // inserted这个钩子函数调用的时候，当前元素已经插入页面中了，也就是说可以获取到父级节点了
  inserted (  el，binding, vnode ) {},
  //  DOM重新渲染前
  update(el，binding, vnode,oldVnode) {},
  // DOM重新渲染后
  componentUpdated ( el，binding, vnode,oldVnode ) {},
  // 只调用一次，指令与元素解绑时调用
  unbind ( el ) {
    // 指令所在的元素在页面中消失，触发
  }
})
// 简写 如果你想在 bind 和 update 时触发相同行为，而不关心其它的钩子:
Vue.directive('自定义指令名', function( el, binding ) {})
// 例：
Vue.directive('color', function(el, binding) {
  el.style.color = binging.value
})
```

```html
// 使用 注意直接些会被i成data中的数据“red” 需要字符串则嵌套引号"'red'"
<p v-color="'red'"></p>

```

### 局部自定义指令
```javascript
var vm = new Vue({
  el : "#app",
  directives: {
    directiveName: { }
  }
})
```
- [vue 剖析Vue原理&实现双向绑定MVVM](https://segmentfault.com/a/1190000006599500 'vue 剖析Vue原理&实现双向绑定MVVM')

## 组件
> 组件系统是`Vue` 的另一个重要概念，因为它是一种抽象，允许我们使用小型、独立和通常可复用的组件构建大型应用。
> 几乎任意类型的应用界面都可以抽象为一个组件树

### 全局组件
- 说明：全局组件在所有的vue实例中都可以使用
- 注意：先注册组件，再初始化根实例
```html
// 1 注册全局组件  
Vue.component('my-component', {
  // template 只能有一个根元素
  template: '<p>A custom component!</p>',
  // 组件中的 `data` 必须是函数 并且函数的返回值必须是对象
  data() {
    return {
      msg: '注意：组件的data必须是一个函数！！！'
    }
  }
})

// 2 使用：以自定义元素的方式
<div id="example">
  <my-component></my-component>
</div>

// =====> 渲染结果
<div id="example">
  <p>A custom component!</p>
</div>

// 3 template属性的值可以是：
  - 1 模板字符串
  - 2 模板id  template: '#tpl'
<script type="text/x-template" id="tpl">
  <p>A custom component!</p>
</script>
```
- extend：使用基础 `Vue` 构造器，创建一个“`子类`”。参数是一个包含`组件选项`的对象。

```html
// 注册组件，传入一个扩展过的构造器
Vue.component('my-component', Vue.extend({ /* ... */ }))

// 注册组件，传入一个选项对象 (自动调用 Vue.extend)
Vue.component('my-component', { /* ... */ })

var Home = Vue.extend({
  template: '',
  data() {}
})
Vue.component('home', Home)
```

### 局部组件
- 说明：局部组件，是在某一个具体的`vue`实例中定义的，只能在这个`vue`实例中使用
```javascript
var Child = {
  template: '<div>A custom component!</div>'
}

new Vue({
  // 注意：此处为 components
  components: {
    // <my-component> 将只在当前vue实例中使用
    // my-component 为组件名 值为配置对象 
    'my-component': {
      template: ``,
      data () { return { } },
      props : []
    }
  }
})
```

- `is`特性
> 在某些特定的标签中只能存在指定表恰 如`ul > li` 如果要浏览器正常解析则需要使用`is`
```html
<!-- 案例 -->
<ul id="app">
  <!-- 不能识别 -->
  <my-li></my-li> 
  正常识别
  <li is="my-li"></li>
</ul>

<script>
  var vm = new Vue({
    el: "#app",
    components : {
      myLi : {
        template : `<li>内容</li>`
      }
    }
  })
</script>
```

## 组件通讯
### 父组件到子组件
- 方式：通过子组件props属性来传递数据 props是一个数组
- 注意：属性的值必须在组件中通过props属性显示指定，否则，不会生效
- 说明：传递过来的props属性的用法与data属性的用法相同

```html
<div id="app">
  <!-- 如果需要往子组件总传递父组件data中的数据 需要加v-bind="数据名称" -->
  <hello v-bind:msg="info"></hello>
  <!-- 如果传递的是字面量 那么直接写-->
  <hello my-msg="abc"></hello>
</div>

<!-- js -->
<script>
  new Vue({
    el: "#app",
    data : {
      info : 15
    },
    components: {
      hello: {
        // 创建props及其传递过来的属性
        props: ['msg', 'myMsg'],
        template: '<h1>这是 hello 组件，这是消息：{{msg}} --- {{myMsg}}</h1>'
      }
    }
  })
</script>
```

### 子组件到父组件
- 方式：父组件给子组件传递一个函数，由子组件调用这个函数

- .说明：借助vue中的自定义事件（v-on:cunstomFn="fn"）
步骤:

1. 在父组件中定义方法 parentFn
2. 在子组件 组件引入标签 中绑定自定义事件 v-on:自定义事件名="父组件中的方法" ==> @pfn="parentFn"
3. 子组件中通过$emit()触发自定义事件事件 this.$emit(pfn,参数列表。。。)
```html
<hello @pfn="parentFn"></hello>

<script>
  Vue.component('hello', {
    template: '<button @click="fn">按钮</button>',
    methods: {
      // 子组件：通过$emit调用
      fn() {
        this.$emit('pfn', '这是子组件传递给父组件的数据')
      }
    }
  })
  new Vue({
    methods: {
      // 父组件：提供方法
      parentFn(data) {
        console.log('父组件：', data)
      }
    }
  })
</script>
```

### 非父子组件通讯
> 在简单的场景下，可以使用一个空的 Vue 实例作为事件总线

- `$on()`：绑定自定义事件
```javascript
var bus = new Vue()

// 在组件 B 绑定自定义事件
bus.$on('id-selected', function (id) {
  // ...
})
// 触发组件 A 中的事件
bus.$emit('id-selected', 1)
```

- 示例：组件A ---> 组件B
```html
<!-- 组件A： -->
<com-a></com-a>
<!-- 组件B： -->
<com-b></com-b>

<script>
  // 中间组件
  var bus = new Vue()
  // 通信组件
  var vm = new Vue({
    el: '#app',
    components: {
      comB: {
        template: '<p>组件A告诉我：{{msg}}</p>',
        data() {
          return {
            msg: ''
          }
        },
        created() {
          // 给中间组件绑定自定义事件 注意:如果用到this 需要用箭头函数
          bus.$on('tellComB', (msg) => {
            this.msg = msg
          })
        }
      },
      comA: {
        template: '<button @click="emitFn">告诉B</button>',
        methods: {
          emitFn() {
            // 触发中间组件中的自定义事件
            bus.$emit('tellComB', '土豆土豆我是南瓜')
          }
        }
      }
    }
  })
</script>
```

### 内容分发
- 通过`<slot></slot>` 标签指定内容展示区域
- 案例：
```html
<!-- html代码 -->
<div id="app">
  <hello>
    <!-- 如果只有一个slot插槽 那么不需要指定名称 -->
    <p slot="插槽名称">我是额外的内容</p>
  </hello>
</div>
// js代码
new vue({
  el : "#app",
  components : {
    hello : {
      template : `
          <div>
            <p>我是子组件中的内容</p>
            <slot name="名称"></slot>
          </div>
        `
    }
  }
})
```

### 获取组件（或元素） - `refs`
- 说明：`vm.$refs` 一个对象，持有已注册过 `ref` 的所有子组件（或HTML元素）
- 使用：在 `HTML` 元素 中，添加`ref`属性，然后在`JS`中通过`vm.$refs.`属性来获取
- 注意：如果获取的是一个子组件，那么通过`ref`就能获取到子组件中的`data`和`methods`

```html
<div id="app">
  <div ref="dv"></div>
  <my res="my"></my>
</div>

<!-- js -->
<script>
  new Vue({
    el : "#app",
    mounted() {
      this.$refs.dv //获取到元素
      this.$refs.my //获取到组件
    },
    components : {
      my : {
        template: `<a>sss</a>`
      }
    }
  })
</script>
```


