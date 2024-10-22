<script setup lang="ts">
import { useData } from "vitepress";
import HomePage from "../models/HomePage.vue";
import RealisationPage from "../models/RealisationPage.vue";
import ClientPage from "../models/ClientPage.vue";
import CategoryPage from "../models/CategoryPage.vue";
import ContactPage from "../models/ContactPage.vue";
import ProjectPage from "../models/ProjectPage.vue";

// https://vitepress.dev/reference/runtime-api#usedata
const { site, frontmatter } = useData();
</script>

<template>
  <HomePage v-if="frontmatter.layout === 'home'" />
  <RealisationPage v-else-if="frontmatter.layout === 'realisations'" />
  <CategoryPage v-else-if="frontmatter.layout === 'category'" />
  <ClientPage v-else-if="frontmatter.layout === 'clients'" />
  <ContactPage v-else-if="frontmatter.layout === 'contact'" />
  <ProjectPage v-else-if="frontmatter.layout === 'project'" />
  <div v-else>
    <a href="/">Home</a>
    <Content />
  </div>
</template>
