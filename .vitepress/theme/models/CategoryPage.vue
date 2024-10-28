<script setup lang="ts">
import { useData } from "vitepress";
import { CardContent } from "../../interfaces/CardContent";
import { Project } from "../../interfaces/Project";
import NiceCard from "../widgets/NiceCard.vue";

const { frontmatter } = useData();

const projects: Project[] = frontmatter.value.projects;
const category: string = frontmatter.value.category;

const cards: CardContent[] = projects.map((p) => {
  return {
    label: p.label,
    url: `/realisations/${category}/${p.id}`,
    imageUrl: `/photos/projects/${category}/${p.id}/thumbnail-${p.id}.webp`,
  } satisfies CardContent;
});
</script>

<template>
  <main class="flex flex-grow flex-col p-2">
    <section class="mx-auto max-w-5xl">
      <h1>{{ frontmatter.label }}</h1>

      <NiceCard :input="cards" />
    </section>
  </main>
</template>
