<script setup lang="ts">
import { useData, useRoute } from "vitepress";
import HomePage from "../models/HomePage.vue";
import RealisationPage from "../models/RealisationPage.vue";
import ClientPage from "../models/ClientPage.vue";
import CategoryPage from "../models/CategoryPage.vue";
import ContactPage from "../models/ContactPage.vue";
import ProjectPage from "../models/ProjectPage.vue";
import ViewerPage from "../models/ViewerPage.vue";
import MairiePage from "../models/MairiePage.vue";
import MapPage from "../models/MapPage.vue";

const { frontmatter } = useData();
const route = useRoute();

const isProject = () => {
  return route.path.match(new RegExp("/realisations/[^/]+/[^/]+")) !== null;
};
</script>

<template>
  <HomePage v-if="frontmatter.layout === 'home'" />
  <RealisationPage v-else-if="frontmatter.layout === 'realisations'" />
  <CategoryPage v-else-if="frontmatter.layout === 'category'" />
  <ClientPage v-else-if="frontmatter.layout === 'clients'" />
  <ContactPage v-else-if="frontmatter.layout === 'contact'" />
  <ProjectPage v-else-if="frontmatter.layout === 'project'" />
  <ProjectPage v-else-if="isProject()" />
  <ViewerPage v-else-if="frontmatter.layout === 'viewer'" />
  <MairiePage v-else-if="frontmatter.layout === 'mairie'" />
  <MapPage v-else-if="frontmatter.layout === 'map'" />
  <div v-else>
    <a href="/">Home</a>
    <Content />
  </div>
</template>
