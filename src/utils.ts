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
