<script setup lang="ts">
import { useRouter } from "vitepress";
import { computed, onMounted, onUnmounted } from "vue";
import BodyLayout from "./layout/BodyLayout.vue";
import FooterLayout from "./layout/FooterLayout.vue";
import HeaderLayout from "./layout/HeaderLayout.vue";
import RegisterSW from "./widgets/RegisterSW.vue";
import { useRoute } from "vitepress";

const router = useRouter();

const route = useRoute();
const path = computed(() => {
  return route.path;
});

const printableType = computed(() => {
  if (path.value.match(new RegExp("/realisations/.*/.*"))) {
    return "printable-one";
  }
  return "printable-many";
});

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
  <div
    class="flex min-h-screen flex-col justify-between"
    :class="printableType"
  >
    <HeaderLayout />
    <BodyLayout />
    <FooterLayout />
  </div>

  <RegisterSW />
</template>
