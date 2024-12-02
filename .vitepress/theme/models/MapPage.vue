<script setup lang="ts">
import { useData } from "vitepress";
import { Client } from "../../interfaces/Client";
import { GPSCoord } from "../../interfaces/GPSCoord";
import { Localisation } from "../../interfaces/Localisation";
import DataMap from "../widgets/DataMap.vue";
import { toSlug } from "../../utils/slug";

const { frontmatter } = useData();

const mairies: Client[] = frontmatter.value.mairies;
const publicOthers: Client[] = frontmatter.value.publicOthers;
console.log("publicOthers: ", publicOthers);

const DEFAULT_GPS: GPSCoord = { latitude: 0, longitude: 0 };

const localisations: Localisation[] = [...mairies, ...publicOthers].map((c) => {
  return {
    title: c.name,
    gps: c.gps ?? DEFAULT_GPS,
    url: `/clients/${toSlug(c.name)}`,
    zipcode: c.zip,
  };
});
</script>

<template>
  <main class="flex flex-grow flex-col">
    <h1 class="my-2">Carte de nos réalisations</h1>
    <ClientOnly>
      <DataMap :localisations class="grow" />
    </ClientOnly>
  </main>
</template>
