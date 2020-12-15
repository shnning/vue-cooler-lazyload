export interface Border {
  top?: number;
  bottom?: number;
  left?: number;
  right?: number;
}

export interface LazyloadOptions {
  border?: Border;
  threshold?: number;
  beforeLoad?: LazyloadCallback;
  afterLoad?: LazyloadCallback;
}

export interface IntersectionObserverConfig {
  rootMargin?: string;
  threshold?: number;
}

export interface LazyloadCallback {
  (el: HTMLElement): void
}
