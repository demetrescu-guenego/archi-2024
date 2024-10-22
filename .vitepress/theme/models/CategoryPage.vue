<script setup lang="ts">
import { useData } from "vitepress";

const { site, frontmatter, params } = useData();
if (params.value === undefined) {
  throw new Error("oups");
}
console.log("params: ", params);
console.log("frontmatter: ", frontmatter);
console.log("site: ", site);

const label = params.value.label;
</script>

<template>
  <main class="flex-grow flex flex-col p-2">
    <h1>{{ label }}</h1>
  </main>
</template>
