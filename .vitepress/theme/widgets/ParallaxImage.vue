<script setup lang="ts">
import { onMounted, ref, useTemplateRef } from "vue";
import { ImageLoaded, loadImage } from "../utils/loadImage";

const props = defineProps<{
  portrait: string;
  landscape: string;
  alt: string;
}>();

const imageSrc = ref(props.portrait);

const imgElt = useTemplateRef("imageRef");
const divElt = useTemplateRef("divRef");

const images = ref<
  { landscape: ImageLoaded; portrait: ImageLoaded } | undefined
>(undefined);

const isLoaded = ref(false);

onMounted(async () => {
  if (!("window" in globalThis)) {
    return;
  }
  const imgs = await Promise.all([
    loadImage(props.landscape),
    loadImage(props.portrait),
  ]);

  isLoaded.value = true;
  images.value = {
    landscape: imgs[0],
    portrait: imgs[1],
  };
  // On ios the rendering and painting are slow.
  // The image height cannot be obtained as expected.

  if (navigator.userAgent.match(/Safari/)) {
    setTimeout(() => {
      render();
    }, 20);
  } else {
    render();
  }

  globalThis.window.document.addEventListener("touchmove", () => {
    render();
  });

  // window.addEventListener("resize", () => {
  //   render();
  // });

  // for browsers
  globalThis.window.document.addEventListener("scroll", () => {
    render();
  });
});

const render = () => {
  if (images.value === undefined) {
    return;
  }

  if (divElt.value === null) {
    return;
  }

  if (imgElt.value === null) {
    return;
  }

  const wh = globalThis.window.innerHeight;
  const ww = globalThis.window.innerWidth;
  const wratio = ww / wh;

  const rect = divElt.value.getBoundingClientRect();

  const isVisible = rect.bottom >= 0 && rect.top <= wh;

  let ratio;

  const setOpacity = () => {
    if (imgElt.value === null) {
      return;
    }
    imgElt.value.style.animation = "fadein 2s forwards";
  };

  if (wh < ww) {
    // landscape
    if (imgElt.value.src.indexOf(images.value.landscape.url) < 0) {
      imgElt.value.onload = setOpacity;
      imgElt.value.src = images.value.landscape.url;
    } else {
      setOpacity();
    }
    ratio = images.value.landscape.width / images.value.landscape.height;
  } else {
    // portrait
    if (imgElt.value.src.indexOf(images.value.portrait.url) < 0) {
      imgElt.value.onload = setOpacity;
      imgElt.value.src = images.value.portrait.url;
    } else {
      setOpacity();
    }
    ratio = images.value.portrait.width / images.value.portrait.height;
  }

  if (ratio < wratio) {
    imgElt.value.style.width = "100vw";
    imgElt.value.style.height = "auto";
  } else {
    imgElt.value.style.width = "auto";
    imgElt.value.style.height = "100vh";
  }

  if (!isVisible) {
    imgElt.value.style.animation = "fadeout 0s forwards";
    return;
  }
};
</script>

<template>
  <div ref="divRef" :class="{ loaded: isLoaded }">
    <img :src="imageSrc" :alt="props.alt" ref="imageRef" />
  </div>
</template>

<style scoped>
div {
  display: block;
  position: relative;
  z-index: -2;
  padding: 0;
  margin: 0;
  height: 500px;
  overflow: hidden;
  background-color: #eee;
  img {
    position: fixed;
    z-index: -1;
    top: 0;
    left: 50%;
    transform: translate(-50%, 0);
    background-color: black;
    max-width: none;
  }
  transition: background-color 500ms;
  &.loaded {
    height: 500px;
  }
}
</style>
