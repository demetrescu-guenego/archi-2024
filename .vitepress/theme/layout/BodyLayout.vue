<script setup lang="ts">
import { useData, Content } from "vitepress";
import HomePage from "../models/HomePage.vue";
import RealisationPage from "../models/RealisationPage.vue";
import ClientPage from "../models/ClientPage.vue";
import ContactPage from "../models/ContactPage.vue";

// https://vitepress.dev/reference/runtime-api#usedata
const { site, frontmatter } = useData();
</script>

<template>
  <HomePage v-if="frontmatter.layout === 'home'" />
  <RealisationPage v-if="frontmatter.layout === 'realisations'" />
  <ClientPage v-if="frontmatter.layout === 'clients'" />
  <ContactPage v-if="frontmatter.layout === 'contact'" />
  <div v-else>
    <a href="/">Home</a>
    <Content />
  </div>
</template>
