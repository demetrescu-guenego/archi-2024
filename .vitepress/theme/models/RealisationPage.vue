<script setup lang="ts">
import { data } from "../../../commons/data";
import { CardContent } from "../../interfaces/CardContent";
import { Category } from "../../interfaces/Category";
import NiceCard from "../widgets/NiceCard.vue";

const categories: Category[] = data.categories;

const cards: CardContent[] = categories.map((c) => {
  return {
    label: c.label,
    url: `/realisations/${c.id}`,
    imageUrl: `/photos/projects/${c.id}/${c.name}/thumbnail-${c.name}.jpg`,
  };
});
</script>

<template>
  <main class="flex flex-grow flex-col p-2">
    <h1>Nos réalisations</h1>
    <NiceCard :input="cards" boldLabel />
  </main>
</template>
