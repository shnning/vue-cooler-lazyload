import { VueConstructor, PluginObject, VNodeDirective } from 'vue';
import Lazyload from './lazyload';
import { LazyloadOptions } from './types';

export const lazyloadPlugin: PluginObject<LazyloadOptions> = {
  install(Vue: VueConstructor, options?) {
    const $lazyload = new Lazyload(options);

    Vue.directive('lazyload', {
      bind(el: HTMLElement, binding: VNodeDirective) {
        $lazyload.add(el, binding);
      },
      update(el: HTMLElement, binding: VNodeDirective) {
        $lazyload.add(el, binding);
      }
    });
  },
};
