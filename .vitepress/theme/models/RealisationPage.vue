<script setup lang="ts">
import { useData } from "vitepress";
import { Category } from "../interfaces/Category";

const { site, frontmatter } = useData();

const categories: Category[] = frontmatter.value.categories;

const getImageUrl = (c: Category) => {
  return `/photos/projects/${c.id}/${c.name}/thumbnail-${c.name}.jpg`;
};

const getUrl = (c: Category) => {
  return `/realisations/${c.id}`;
};
</script>

<template>
  <main class="flex-grow flex flex-col p-2">
    <h1>Nos réalisations</h1>
    <div class="flex flex-wrap gap-8 justify-center">
      <a
        v-for="category in categories"
        :key="category.id"
        class="w-72 rounded-sm overflow-hidden flex flex-col"
        :href="getUrl(category)"
      >
        <img :src="getImageUrl(category)" :alt="category.label" />
        <div>{{ category.label }}</div>
      </a>
    </div>
  </main>
</template>
