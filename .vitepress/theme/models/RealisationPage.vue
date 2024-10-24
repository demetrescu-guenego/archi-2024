<script setup lang="ts">
import { useData } from "vitepress";
import { Category } from "../interfaces/Category";
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
  <main class="flex-grow flex flex-col p-2">
    <h1>Nos réalisations</h1>
    <div class="flex flex-wrap gap-8 justify-center py-8">
      <a
        v-for="category in categories"
        :key="category.id"
        class="w-72 rounded-xl overflow-hidden flex flex-col shadow-xl hover:scale-105 transition-transform"
        :href="getUrl(category)"
      >
        <img
          :src="getImageUrl(category)"
          :alt="category.label"
          class="object-cover w-72 h-44"
        />
        <div
          class="font-bold h-12 flex justify-center items-center text-center px-4"
        >
          {{ category.label }}
        </div>
      </a>
    </div>
  </main>
</template>
