<script setup lang="ts">
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { useRoute } from "vitepress";
import { isDesktop } from "../stores/ResponsiveStore";
import { MenuItem } from "./interfaces/MenuItem";
import { ref } from "vue";

const props = defineProps<{ list: MenuItem[] }>();

const route = useRoute();

const isActive = (href: string) => {
  if (href === "/") {
    return route.path === "/";
  }
  return route.path.startsWith(href);
};

const isMenuOpen = ref(false);

const toggle = () => {
  isMenuOpen.value = !isMenuOpen.value;
};

const close = () => {
  console.log("close: ");
  isMenuOpen.value = false;
};
</script>

<template>
  <nav class="flex gap-4 px-4" v-if="isDesktop">
    <a
      :href="item.href"
      v-for="item in props.list"
      class="border-2 px-4 p-2 hover:border-white hover:border-opacity-50"
      :class="{
        'border-white': isActive(item.href),
        'border-transparent': !isActive(item.href),
      }"
    >
      {{ item.label }}
    </a>
  </nav>
  <div v-else>
    <button
      class="flex items-center justify-center h-16 cursor-pointer px-4"
      @click="toggle()"
    >
      <FontAwesomeIcon :icon="faBars" class="text-4xl" />
    </button>
    <nav
      v-if="isMenuOpen"
      class="fixed top-16 left-0 right-0 bg-white text-fuchsia-900 flex flex-col z-10"
    >
      <a
        :href="item.href"
        v-for="item in props.list"
        class="flex items-center justify-center h-16 text-2xl active:bg-neutral-200"
        @click="close()"
      >
        {{ item.label }}
      </a>
    </nav>
  </div>
</template>
