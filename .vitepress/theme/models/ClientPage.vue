<script setup lang="ts">
import { useData } from "vitepress";
import MairieTable from "../widgets/MairieTable.vue";

const { site, frontmatter } = useData();
</script>

<template>
  <main class="flex-grow flex flex-col max-w-5xl mx-auto">
    <h1>Nos clients</h1>
    <p>
      Nous indiquons ici seulement nos clients publics, les clients privés
      souhaitant la plupart rester sous confidence.
    </p>
    <h2>Public</h2>
    <h3>Mairies</h3>
    <MairieTable :input="frontmatter.mairies" />
  </main>
</template>
