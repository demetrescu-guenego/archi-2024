<script setup lang="ts">
import { useData } from "vitepress";
import { Project } from "../../interfaces/Project";
import NiceCards from "../widgets/NiceCards.vue";
import { CardContent } from "../../interfaces/CardContent";

const { frontmatter } = useData();

const projects: Project[] = frontmatter.value.projects;

const cards: CardContent[] = projects.map((p) => {
  return {
    title: p.title,
    url: `/realisations/${p.category}/${p.id}`,
    imageUrl: `/photos/projects/${p.category}/${p.id}/thumbnail-${p.id}.avif`,
  } satisfies CardContent;
});
</script>

<template>
  <main
    class="flex flex-grow flex-col p-2"
    v-if="typeof frontmatter.client === 'object'"
  >
    <h1>
      Nos réalisations situées à {{ frontmatter.client.name }} ({{
        frontmatter.client.zip
      }})
    </h1>

    <NiceCards :input="cards" class="justify-center" />
  </main>
</template>
