<script setup lang="ts">
import { useData } from "vitepress";
import { Category } from "../interfaces/Category";

const { site, frontmatter } = useData();

const categories: Category[] = frontmatter.value.categories;
const prefix = "/photos/project/";
</script>

<template>
  <main class="flex-grow flex flex-col">
    <h1>Nos réalisations</h1>
    <div>
      <div v-for="category in categories" :key="category.id">
        <img :src="prefix + category.imageUrl" :alt="category.label" />
        <div>{{ category.label }}</div>
      </div>
    </div>
  </main>
</template>
