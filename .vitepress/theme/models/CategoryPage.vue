<script setup lang="ts">
import { useData } from "vitepress";
import { CardContent } from "../../interfaces/CardContent";
import { Project } from "../../interfaces/Project";
import NiceCards from "../widgets/NiceCards.vue";

const { frontmatter } = useData();

const projects: Project[] = frontmatter.value.projects;
const category: string = frontmatter.value.category;

const getLastIntervention = (p: Project): number => {
  const interventions = p.interventions ?? [];
  const year = interventions
    .map((intervention) => {
      if (typeof intervention.year === "number") {
        return intervention.year;
      }
      if (typeof intervention.year === "string") {
        return +intervention.year.substring(0, 4);
      }
      return 0;
    })
    .sort()
    .at(0);
  return year ?? 0;
};

const cards: CardContent[] = projects
  .map((p) => {
    return {
      label: p.label,
      url: `/realisations/${category}/${p.id}`,
      imageUrl: `/photos/projects/${category}/${p.id}/thumbnail-${p.id}.webp`,
      id: p.id,
      year: getLastIntervention(p),
    } satisfies CardContent & { id: string };
  })
  .sort((p1, p2) => {
    return p1.year < p2.year ? 1 : -1;
  });
</script>

<template>
  <main class="flex flex-grow flex-col p-2">
    <section class="mx-auto max-w-5xl">
      <h1>{{ frontmatter.label }}</h1>

      <NiceCards :input="cards" />
    </section>
  </main>
</template>
