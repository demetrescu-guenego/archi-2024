<script setup lang="ts">
import HeaderLayout from "./layout/HeaderLayout.vue";
import FooterLayout from "./layout/FooterLayout.vue";
import BodyLayout from "./layout/BodyLayout.vue";
import RegisterSW from "./widgets/RegisterSW.vue";
import { onMounted, onUnmounted } from "vue";
import { useRouter } from "vitepress";

const router = useRouter();

const handleKeydown = (event: KeyboardEvent) => {
  if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
    event.preventDefault();
    router.go("/search");
  }
};

onMounted(() => {
  if ("window" in globalThis) {
    window.addEventListener("keydown", handleKeydown);
  }
});

onUnmounted(() => {
  if ("window" in globalThis) {
    window.removeEventListener("keydown", handleKeydown);
  }
});
</script>

<template>
  <div class="printable flex min-h-screen flex-col justify-between">
    <HeaderLayout />
    <BodyLayout />
    <FooterLayout />
  </div>

  <RegisterSW />
</template>
