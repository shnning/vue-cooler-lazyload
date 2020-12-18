# Vue-cooler-lazyload
- - -
A vue plugin which support lazyload image and background-image. Here are the advantages:
- Be lighterweight, just do one thing is that lazyload
- use the browser native API Intersectionobserver, better performance
- offer hooks which We could use before and after image loaded

## Demo

## Requirements
- Vue 2.x


## Installation
### npm
```bash
npm install vue-cooler-lazyload
```


## Usage
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
if v-lazyload directive is used in div Element, image would be background-image attribute.


## Plugin Options
|key|description|default|options|
|---|-----------|-------|-------|
|border|the viewport you want to listen|'0px'(window)|{top, bottom, left, right}|
|threshold|the proportion of element insert into viewport|0(0 means that when a element go into the viewport, image begins load)|0~1|
|cacheImage|render image at once if the image has been loaded before|false|boolean|
|beforeLoad|function that would be excuted when dom loaded|null|Function(el: HTMLElement): void|
|afterLoad|function that would be excuted when image loaded|null|Function(el: HTMLElement): void|

