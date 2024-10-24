<script setup lang="ts">
import { useData } from "vitepress";
import { Project } from "../../interfaces/Project";
import NiceCard from "../widgets/NiceCard.vue";
import { CardContent } from "../../interfaces/CardContent";

const { frontmatter } = useData();

const projects: Project[] = frontmatter.value.projects;

const cards: CardContent[] = projects.map((p) => {
  return {
    label: p.label,
    url: `/realisations/${p.category}/${p.id}`,
    imageUrl: `/photos/projects/${p.category}/${p.id}/thumbnail-${p.id}.jpg`,
  } satisfies CardContent;
});
</script>

<template>
  <main
    class="flex flex-grow flex-col p-2"
    v-if="typeof frontmatter.client === 'object'"
  >
    <h1>
      Nos réalisations pour {{ frontmatter.client.name }} ({{
        frontmatter.client.zip
      }})
    </h1>

    <NiceCard :input="cards" />
  </main>
</template>
