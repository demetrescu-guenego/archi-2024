<script setup lang="ts">
import { useData } from "vitepress";
import MairieTable from "../widgets/MairieTable.vue";

const { site, frontmatter } = useData();
</script>

<template>
  <main class="flex-grow flex flex-col">
    <h1>Nos clients</h1>
    <MairieTable :input="frontmatter.mairies" />
  </main>
</template>
