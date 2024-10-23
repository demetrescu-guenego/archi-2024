<script setup lang="ts">
import { useData, useRoute } from "vitepress";
import { Photo } from "../interfaces/Photo";
import NiceTable from "../widgets/NiceTable.vue";
import ParallaxImage from "../widgets/ParallaxImage.vue";

const { frontmatter } = useData();
const route = useRoute();

const [, , category, name] = route.path.split("/");

const parallax = `/photos/projects/${category}/${name}/parallax.jpg`;

const photos = frontmatter.value.photos;

const getImageUrl = (p: Photo) => {
  return `/photos/projects/${category}/${name}/${p.url}`;
};
</script>

<template>
  <main class="flex-grow flex flex-col">
    <section class="bg-white">
      <div class="px-2 max-w-4xl mx-auto pb-4">
        <h1>Réalisation: {{ frontmatter.label }}</h1>
        <h2>Présentation</h2>
        <NiceTable :input="frontmatter.presentation" />
        <h2>Interventions</h2>
        <NiceTable :input="frontmatter.interventions" />
      </div>
    </section>
    <section class="parallax">
      <ParallaxImage
        :portrait="parallax"
        :landscape="parallax"
        alt="Chateau de Ferrières en brie (1855-1859, famille Rothschield), restauration par notre catbinet en 2015."
      />
    </section>
    <section>
      <div class="px-2 max-w-4xl mx-auto pb-4">
        <h2>Description</h2>
        <Content />
        <h2>Photos</h2>
        <div>
          <div class="flex flex-wrap gap-8 justify-center py-8">
            <a
              v-for="photo in photos"
              :key="photo.url"
              class="w-72 rounded-xl overflow-hidden flex flex-col shadow-xl hover:scale-105 transition-transform"
              :href="getImageUrl(photo)"
            >
              <img
                :src="getImageUrl(photo)"
                :alt="photo.label"
                class="object-cover w-72 h-44"
              />
              <div
                class="font-bold h-12 flex justify-center items-center text-center px-4"
              >
                {{ photo.label }}
              </div>
            </a>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>
