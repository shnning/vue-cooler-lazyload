import { VNodeDirective } from 'vue';
import { LazyloadOptions, IntersectionObserverConfig, LazyloadCallback } from './types';
import { loadImage, isHTMLImageElement, isIntersecting } from './utils';

export default class Lazyload {
  observer!: IntersectionObserver;
  beforeLoad?: LazyloadCallback;
  afterLoad?: LazyloadCallback;

  constructor(options?: LazyloadOptions) {
    this.beforeLoad = options?.beforeLoad;
    this.afterLoad = options?.afterLoad;
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
    const notImg = el.dataset.notImg;
    const src = el.dataset.src!!;
    loadImage(src)
      .then(() => {
        if (notImg) {
          el.style.backgroundImage = `url(${src})`;
        } else {
          (el as HTMLImageElement).src = src;
        }
        this.afterLoad && this.afterLoad(el);
      })
      .catch(() => {
        console.warn(`${src} loaded error`);
      });
    delete el.dataset.src;
    delete el.dataset.notImg;
  }

  add(el: HTMLElement, binding: VNodeDirective) {
    const imageSrc = binding?.value;
    const isImgTag = isHTMLImageElement(el);
    if (!imageSrc) {
      console.warn('v-lazyload requires a image url as a argument.');
      return;
    }

    this.beforeLoad && this.beforeLoad(el);

    el.dataset['src'] = imageSrc;
    if (!isImgTag) {
      el.dataset['notImg'] = '1';
    }
    this.observer.observe(el);
  }
}
