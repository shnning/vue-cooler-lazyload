# Vue-cooler-lazyload

[![npm version](https://img.shields.io/npm/v/vue-cooler-lazyload.svg?style=flat-square)](https://www.npmjs.com/package/vue-cooler-lazyload)
[![npm downloads](https://img.shields.io/npm/dm/vue-cooler-lazyload.svg?style=flat-square)](https://www.npmjs.com/package/vue-cooler-lazyload)
[![npm license](https://img.shields.io/npm/l/vue-cooler-lazyload?style=flat-square)](https://www.npmjs.com/package/vue-cooler-lazyload)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com)

[英文说明](./README.md)

一个用来做图片和背景图片懒加载的vue插件。下面是一些特性：
- 轻量，只做一件事就是曝光元素
- 更好的性能，使用浏览器的原生api Intersectionobserver实现
- 可以在图片加载前和加载后调用自定义的函数处理dom节点

## Demo
```bash
npm install
npm run dev
```

## 要求
- Vue 2.x


## 安装
### npm
```bash
npm install vue-cooler-lazyload
```


## 使用
main.js:
```javascript
import Vue from 'vue';
import lazyloadPlugin from 'vue-cooler-lazyload';

Vue.use(lazyloadPlugin);
```

template:
```html
<div>
  <img v-lazyload="imageurl" />
  <div v-lazyload="imageurl"></div>
</div>
```
如果v-lazyload在div元素上使用，那么url会被作为背景图片加载
if v-lazyload directive is used in div Element, image would be background-image attribute.


## 插件选项
|key|description|default|options|
|---|-----------|-------|-------|
|border|设置可视区域的边界|{top: 0, bottom: 0, left: 0, right: 0}(window)|{top, bottom, left, right}|
|threshold|element进入可视区域的比例|0(默认是0，意味着element刚进入可视区域就加载图片)|0~1|
|cacheImage|在相同url的图片加载后直接加载，不再触发hooks|false|boolean|
|beforeLoad|图片加载前的回调函数|null|Function(el: HTMLElement): void|
|afterLoad|图片加载后的回调函数|null|Function(el: HTMLElement): void|

## 兼容性
该插件的兼容性取决于[IntersectionObserver的兼容性](https://caniuse.com/intersectionobserver)


## License
[MIT](./LICENSE)
