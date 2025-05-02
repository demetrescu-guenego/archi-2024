export interface ImageLoaded {
  url: string;
  width: number;
  height: number;
}

export const loadImage = (url: string): Promise<ImageLoaded> => {
  return new Promise((resolve) => {
    if (!("window" in globalThis)) {
      return;
    }
    const img = globalThis.window.document.createElement("img");
    img.src = url;
    img.addEventListener("load", () => {
      resolve({ url, width: img.width, height: img.height });
    });
  });
};
