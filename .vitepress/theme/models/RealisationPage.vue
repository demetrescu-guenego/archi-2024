<script setup lang="ts">
import { useData } from "vitepress";
import { Category } from "../interfaces/Category";

const { site, frontmatter } = useData();

const categories: Category[] = frontmatter.value.categories;

const getImageUrl = (c: Category) => {
  return `/photos/projects/${c.id}/${c.name}/thumbnail-${c.name}.jpg`;
};
</script>

<template>
  <main class="flex-grow flex flex-col p-2">
    <h1>Nos réalisations</h1>
    <div class="flex flex-wrap gap-8 justify-center">
      <div v-for="category in categories" :key="category.id" class="w-72">
        <img :src="getImageUrl(category)" :alt="category.label" />
        <div>{{ category.label }}</div>
      </div>
    </div>
  </main>
</template>
