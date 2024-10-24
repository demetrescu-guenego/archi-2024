<script setup lang="ts">
import { useData } from "vitepress";
import { Category } from "../../interfaces/Category";
import { data } from "../../../commons/data";

const { site } = useData();
console.log("site: ", site);

const categories: Category[] = data.categories;

const getImageUrl = (c: Category) => {
  return `/photos/projects/${c.id}/${c.name}/thumbnail-${c.name}.jpg`;
};

const getUrl = (c: Category) => {
  return `/realisations/${c.id}`;
};
</script>

<template>
  <main class="flex flex-grow flex-col p-2">
    <h1>Nos réalisations</h1>
    <div class="flex flex-wrap justify-center gap-8 py-8">
      <a
        v-for="category in categories"
        :key="category.id"
        class="flex w-72 flex-col overflow-hidden shadow-xl transition-transform hover:scale-105"
        :href="getUrl(category)"
      >
        <img
          :src="getImageUrl(category)"
          :alt="category.label"
          class="h-44 w-72 object-cover"
        />
        <div
          class="flex h-12 items-center justify-center px-4 text-center font-bold"
        >
          {{ category.label }}
        </div>
      </a>
    </div>
  </main>
</template>
