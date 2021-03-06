import { VNodeDirective } from 'vue';
import { LazyloadOptions, IntersectionObserverConfig, LazyloadCallback } from './types';
import { loadImage, isHTMLImageElement, isIntersecting, warning } from './utils';

export default class Lazyload {
  observer!: IntersectionObserver;
  cacheImage: boolean;
  beforeLoad?: LazyloadCallback;
  afterLoad?: LazyloadCallback;
  cache: Set<string>

  constructor(options?: LazyloadOptions) {
    this.beforeLoad = options?.beforeLoad;
    this.afterLoad = options?.afterLoad;
    this.cacheImage = options?.cacheImage || false;
    this.cache = new Set();
    this.init(options);
  }

  private initOptions(options?: LazyloadOptions): IntersectionObserverConfig {
    let config: IntersectionObserverConfig;
    if (options) {
      let {
        border,
        threshold = 0,
      } = options;
      border = { ...{ top: 0, bottom: 0, left: 0, right: 0 }, ...border };
      if (threshold > 1) {
        threshold = 1;
      } else if (threshold < 0) {
        threshold = 0;
      }
      config = {
        rootMargin: `${border.top}px ${border.right}px ${border.bottom}px ${border.left}px`,
        threshold: threshold,
      };
    } else {
      config = {
        rootMargin: '0px 0px 0px 0px',
        threshold: 0,
      };
    }

    return config;
  }

  private init(options?: LazyloadOptions) {
    const config = this.initOptions(options);
    this.observer = new IntersectionObserver(
      (entries: IntersectionObserverEntry[], self: IntersectionObserver) => {
        entries.forEach(entry => {
          if (isIntersecting(entry)) {
            this.load(entry.target as HTMLElement);
            self.unobserve(entry.target);
          }
        });
      },
      config
    );
  }

  private load(el: HTMLElement) {
    const src = el.dataset.src!!;
    // delete el.dataset.src;

    if(this.cache.has(src)) {
      this.renderImage(src, el);
      this.afterLoad && this.afterLoad(el);
      return;
    }

    loadImage(src)
      .then(() => {
        this.renderImage(src, el);
        this.afterLoad && this.afterLoad(el);
        this.cache.add(src);
      })
      .catch(() => {
        warning(`${src} loaded error`);
      });
  }

  add(el: HTMLElement, binding: VNodeDirective) {
    const imageSrc = binding?.value;

    if(this.cacheImage && this.cache.has(imageSrc)) {
      this.renderImage(imageSrc, el);
      return;
    }

    if (!imageSrc) {
      warning('v-lazyload requires a image url as a argument.');
      return;
    }

    const src = el.dataset.src;
    if(src === imageSrc) {
      return;
    }

    this.beforeLoad && this.beforeLoad(el);
    el.dataset['src'] = imageSrc;
    this.observer.observe(el);
  }

  private renderImage(src: string, el: HTMLElement) {
    if (isHTMLImageElement(el)) {
      (el as HTMLImageElement).src = src;
    } else {
      el.style.backgroundImage = `url(${src})`;
    }
  }
}
