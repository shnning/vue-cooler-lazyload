export function loadImage(src: string) {
  const image = new Image();

  return new Promise<void>((resolve, reject) => {
    image.onload = () => {
      resolve();
      clearSideEffect();
    }
  
    image.onerror = () => {
      reject();
      clearSideEffect();
    }

    image.src = src;
  })

  function clearSideEffect() {
    image.onload = null;
    image.onerror = null;
  }
}

export const isHTMLImageElement = (el: HTMLElement): boolean => el.tagName.toLocaleUpperCase() === 'IMG';

export const isIntersecting = (el: IntersectionObserverEntry): boolean => {
  // some browsers don't have isIntersecting in IntersectionObserverEntry
  // https://github.com/w3c/IntersectionObserver/issues/211
  return el.isIntersecting || el.intersectionRatio > 0;
}

export const warning = (error: string) => {
  console.warn(`[v-lazyload-pulgin]: ${error}`);
}
