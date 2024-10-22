<script setup lang="ts">
import { useData, Content } from "vitepress";
import HomePage from "../models/HomePage.vue";
import RealisationPage from "../models/RealisationPage.vue";

// https://vitepress.dev/reference/runtime-api#usedata
const { site, frontmatter } = useData();
</script>

<template>
  <HomePage v-if="frontmatter.layout === 'home'" />
  <RealisationPage v-if="frontmatter.layout === 'realisations'" />
  <div v-else>
    <a href="/">Home</a>
    <Content />
  </div>
</template>
