<script setup lang="ts">
import { useData, useRoute } from "vitepress";
import { CardContent } from "../../interfaces/CardContent";
import { ProjectData } from "../../interfaces/ProjectData";
import InterventionTable from "../widgets/InterventionTable.vue";
import NiceCard from "../widgets/NiceCard.vue";
import ParallaxImage from "../widgets/ParallaxImage.vue";
import PresentationTable from "../widgets/PresentationTable.vue";
import PresentationPrint from "../widgets/print/PresentationPrint.vue";

const { frontmatter } = useData<ProjectData>();
const route = useRoute();

const [, , category, name] = route.path.split("/");

const parallax = `/photos/projects/${category}/${name}/parallax.jpg`;

const photos = frontmatter.value.photos ?? [];

// dangerous code
const projectData: ProjectData = frontmatter.value as ProjectData;

const cards: CardContent[] = photos.map((p) => {
  return {
    label: p.label,
    url: `/viewer?src=/photos/projects/${category}/${name}/${p.url}`,
    imageUrl: `/photos/projects/${category}/${name}/${p.url}`,
  } satisfies CardContent;
});
</script>

<template>
  <main class="flex flex-grow flex-col print:hidden">
    <section class="bg-white">
      <div class="mx-auto max-w-5xl px-2 pb-4">
        <h1>Réalisation: {{ frontmatter.label }}</h1>
        <h2>Présentation</h2>
        <PresentationTable :input="projectData" />
        <h2>Interventions</h2>
        <InterventionTable :input="frontmatter.interventions" />
      </div>
    </section>
    <section class="parallax print:hidden">
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
        <template v-if="cards.length > 0">
          <h2>Photos</h2>
          <div>
            <NiceCard :input="cards" />
          </div>
        </template>
      </div>
    </section>
  </main>
  <main class="hidden print:flex print:flex-grow print:flex-col">
    <section class="bg-white">
      <div class="mx-auto max-w-5xl px-2 pb-4">
        <h1>Réalisation: {{ frontmatter.label }}</h1>
        <h2>Présentation</h2>
        <PresentationPrint :input="projectData" />
        <h2>Interventions</h2>
        <InterventionTable :input="frontmatter.interventions" />
      </div>
    </section>
    <section class="parallax print:hidden">
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
        <template v-if="cards.length > 0">
          <h2>Photos</h2>
          <div>
            <NiceCard :input="cards" />
          </div>
        </template>
      </div>
    </section>
  </main>
</template>
