<script setup lang="ts">
import { ref } from "vue";
import ZoomableImage from "../widgets/ZoomableImage.vue";

// TODO: desktop only: ll the photo zoomable with mouse scroll and pan with mousemove

const src = ref("/home/ferrieres-landscape-big.jpg");

if ("window" in globalThis) {
  const params = Object.fromEntries(
    new URLSearchParams(globalThis.window.location.search),
  );
  if (params.src) {
    src.value = params.src;
  }
}

const goBack = () => {
  if ("window" in globalThis) {
    globalThis.window.history.back();
  }
};
</script>

<template>
  <ZoomableImage
    class="fixed bottom-0 left-0 right-0 top-0 cursor-pointer bg-black"
    :src="src"
    label="Photo"
    @click="goBack"
  />
</template>
