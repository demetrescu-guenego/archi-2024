<script setup lang="ts">
import { Content, useData, useRoute } from "vitepress";
import NiceTable from "../widgets/NiceTable.vue";
import ParallaxImage from "../widgets/ParallaxImage.vue";

const { frontmatter } = useData();
const route = useRoute();

const [, , category, name] = route.path.split("/");

const parallax = `/photos/projects/${category}/${name}/parallax.jpg`;
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
      </div>
    </section>
  </main>
</template>
