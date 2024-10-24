<script setup lang="ts">
import { useData, useRoute } from "vitepress";
import { Photo } from "../../interfaces/Photo";
import { ProjectData } from "../../interfaces/ProjectData";
import InterventionTable from "../widgets/InterventionTable.vue";
import ParallaxImage from "../widgets/ParallaxImage.vue";
import PresentationTable from "../widgets/PresentationTable.vue";

const { frontmatter } = useData<ProjectData>();
const route = useRoute();

const [, , category, name] = route.path.split("/");

const parallax = `/photos/projects/${category}/${name}/parallax.jpg`;

const photos = frontmatter.value.photos;

const getImageUrl = (p: Photo) => {
  return `/photos/projects/${category}/${name}/${p.url}`;
};
const getUrl = (p: Photo) => {
  return `/viewer?src=/photos/projects/${category}/${name}/${p.url}`;
};

// dangerous code
const projectData: ProjectData = frontmatter.value as ProjectData;
</script>

<template>
  <main class="flex flex-grow flex-col">
    <section class="bg-white">
      <div class="mx-auto max-w-5xl px-2 pb-4">
        <h1>Réalisation: {{ frontmatter.label }}</h1>
        <h2>Présentation</h2>
        <PresentationTable :input="projectData" />
        <h2>Interventions</h2>
        <InterventionTable :input="frontmatter.interventions" />
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
      <div class="mx-auto max-w-5xl px-2 pb-4">
        <h2>Description</h2>
        <Content />
        <template v-if="photos">
          <h2>Photos</h2>
          <div>
            <div class="flex flex-wrap justify-center gap-8 py-8">
              <a
                v-for="photo in photos"
                :key="photo.url"
                class="flex w-72 flex-col overflow-hidden shadow-xl transition-transform hover:scale-105 hover:shadow-2xl"
                :href="getUrl(photo)"
              >
                <img
                  :src="getImageUrl(photo)"
                  :alt="photo.label"
                  class="h-44 w-72 object-cover"
                />
                <div
                  class="flex h-12 items-center justify-center px-4 text-center font-bold"
                >
                  {{ photo.label }}
                </div>
              </a>
            </div>
          </div>
        </template>
      </div>
    </section>
  </main>
</template>
