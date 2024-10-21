<script setup lang="ts">
import { MenuItem } from "./interfaces/MenuItem";

const props = defineProps<{ list: MenuItem[] }>();

const isActive = (href) => {
  console.log("href: ", href);
  return href === "/";
};
</script>

<template>
  <nav class="flex gap-4">
    <a
      href="#"
      v-for="item in props.list"
      class="border-2 px-4 p-2"
      :class="{
        'border-white': isActive(item.href),
        'border-transparent': !isActive(item.href),
      }"
    >
      {{ item.label }}
    </a>
  </nav>
</template>
