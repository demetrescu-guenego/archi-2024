<script setup lang="ts">
import { useData, Content } from "vitepress";
import HomePage from "../models/HomePage.vue";

// https://vitepress.dev/reference/runtime-api#usedata
const { site, frontmatter } = useData();
</script>

<template>
  <HomePage v-if="frontmatter.home" />
  <div v-else>
    <a href="/">Home</a>
    <Content />
  </div>
</template>
