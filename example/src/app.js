import Vue from 'vue';
import lazyloadPlugin from '../../dist/index';
import App from './App.vue';

const count = Vue.observable({ value: 0});

Vue.use(lazyloadPlugin, {
  border: {
    bottom: 500,
  },
  afterLoad: () => {
    count.value++;
  }
});

new Vue({
  el: '#app',
  render() {
    return <App count={count.value}/>;
  },
});
