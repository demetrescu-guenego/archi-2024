<script setup lang="ts">
import { useData } from "vitepress";
import { Project } from "../interfaces/Project";

const { frontmatter } = useData();

const projects: Project[] = frontmatter.value.projects;
const category = frontmatter.value.category;
console.log("frontmatter.value: ", frontmatter.value);

const getImageUrl = (p: Project) => {
  return `/photos/projects/${p.category}/${p.id}/thumbnail-${p.id}.jpg`;
};

const getUrl = (p: Project) => {
  return `/realisations/${p.category}/${p.id}`;
};
</script>

<template>
  <main class="flex-grow flex flex-col p-2">
    <h1>{{ frontmatter.label }}</h1>

    <div class="flex flex-wrap gap-8 justify-center py-8">
      <a
        v-for="project in projects"
        :key="project.id"
        class="w-72 overflow-hidden flex flex-col shadow-xl hover:scale-105 transition-transform"
        :href="getUrl(project)"
      >
        <img
          :src="getImageUrl(project)"
          :alt="project.label"
          class="object-cover w-72 h-44"
        />
        <div class="h-12 flex justify-center items-center text-center px-4">
          {{ project.label }}
        </div>
      </a>
    </div>
  </main>
</template>
