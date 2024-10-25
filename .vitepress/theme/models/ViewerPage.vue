<script setup lang="ts">
import { ref } from "vue";

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
  <div
    class="fixed bottom-0 left-0 right-0 top-0 flex cursor-pointer items-center justify-center bg-black"
    @click="goBack"
  >
    <img
      :src="src"
      alt="Photo"
      class="w-[80%] animate-[fadein_300ms_ease-in]"
    />
  </div>
</template>
