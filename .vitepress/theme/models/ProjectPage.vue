<script setup lang="ts">
import { Content, useData } from "vitepress";

const { site, frontmatter } = useData();
</script>

<template>
  <main class="flex-grow flex flex-col p-2">
    <h1>{{ frontmatter.label }}</h1>
    <h2>Description</h2>
    <Content />
  </main>
</template>
