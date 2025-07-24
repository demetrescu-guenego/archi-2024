<script setup lang="ts">
import { faBars, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { useRoute, useRouter } from "vitepress";
import { ref } from "vue";
import { MenuItem } from "../../interfaces/MenuItem";
import { isDesktop } from "../stores/ResponsiveStore";

const props = defineProps<{ list: MenuItem[] }>();
const router = useRouter();
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
  isMenuOpen.value = false;
};

const goToSearch = () => {
  router.go("/search");
  close(); // Close mobile menu if open
};
</script>

<template>
  <nav class="flex gap-4 px-4" v-if="isDesktop">
    <a
      v-for="item in props.list"
      :href="item.href"
      :key="item.title"
      class="border p-2 px-4 hover:border-white/50"
      :class="{
        'border-white': isActive(item.href),
        'border-transparent': !isActive(item.href),
      }"
    >
      {{ item.title }}
    </a>
    <button
      @click="goToSearch"
      class="flex cursor-pointer items-center justify-center border border-transparent p-2 px-4 hover:border-white/50"
    >
      <FontAwesomeIcon :icon="faMagnifyingGlass" />
    </button>
  </nav>
  <div v-else>
    <button
      aria-label="Menu"
      class="flex h-16 cursor-pointer items-center justify-center px-4"
      @click="toggle()"
    >
      <FontAwesomeIcon :icon="faBars" class="text-4xl" />
    </button>
    <nav
      :class="isMenuOpen ? 'h-80' : 'h-0'"
      class="fixed top-16 right-0 left-0 z-10 flex flex-col overflow-hidden border-neutral-300 bg-white text-fuchsia-900 transition-[height]"
    >
      <a
        :href="item.href"
        v-for="item in props.list"
        :key="item.title"
        class="flex h-16 items-center justify-center text-2xl hover:bg-neutral-100 active:bg-neutral-200"
        @click="close()"
      >
        {{ item.title }}
      </a>
      <button
        @click="goToSearch"
        class="flex h-16 items-center justify-center text-2xl hover:bg-neutral-100 active:bg-neutral-200"
      >
        <FontAwesomeIcon :icon="faMagnifyingGlass" class="mr-2" />
        <span>Rechercher</span>
      </button>
    </nav>
  </div>
</template>
