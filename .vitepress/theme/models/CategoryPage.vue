<script setup lang="ts">
import { useData } from "vitepress";

const { site, frontmatter } = useData();
console.log("frontmatter: ", frontmatter);
console.log("site: ", site);
</script>

<template>
  <main class="flex-grow flex flex-col p-2">
    <h1>Category</h1>
  </main>
</template>
