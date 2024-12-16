<script setup lang="ts">
import { onMounted, ref } from "vue";
import ZoomableImage from "../widgets/ZoomableImage.vue";

const src = ref("/home/ferrieres-landscape-big.jpg");

onMounted(() => {
  if ("window" in globalThis) {
    const params = Object.fromEntries(
      new URLSearchParams(globalThis.window.location.search),
    );
    if (params.src) {
      src.value = params.src;
    }
  }
});
</script>

<template>
  <ZoomableImage
    class="fixed bottom-0 left-0 right-0 top-0 cursor-pointer bg-black"
    :src="src"
    title="Photo"
  />
</template>
