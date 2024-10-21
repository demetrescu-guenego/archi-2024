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
  console.log("route: ", route);
  return href === route.path;
};

const isMenuOpen = ref(false);
</script>

<template>
  <nav class="flex gap-4" v-if="isDesktop">
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
  <div v-else class="relative">
    <button class="flex items-center justify-center h-16 cursor-pointer px-4">
      <FontAwesomeIcon :icon="faBars" class="text-4xl" />
    </button>
    <nav class="" v-if="isMenuOpen">
      <a :href="item.href" v-for="item in props.list" class="">
        {{ item.label }}
      </a>
    </nav>
  </div>
</template>
