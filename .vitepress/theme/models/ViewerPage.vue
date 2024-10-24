<script setup lang="ts">
import { useRouter } from "vitepress";
import { ref } from "vue";

const src = ref("/home/ferrieres-landscape-big.jpg");

if ("window" in globalThis) {
  const params = Object.fromEntries(
    new URLSearchParams(globalThis.window.location.search),
  );
  if (params.src) {
    src.value = params.src;
  }
}

const router = useRouter();

const goBack = () => {
  if ("window" in globalThis) {
    window.history.back();
  }
};
</script>

<template>
  <div
    class="fixed bottom-0 left-0 right-0 top-0 cursor-pointer bg-black"
    @click="goBack"
  ></div>
  <img :src="src" alt="Photo" class="my-image cursor-pointer" @click="goBack" />
</template>

<style scoped>
img {
  position: absolute;
  top: 0;
  left: 0;
  animation: fadein 300ms ease-in;
}
</style>
