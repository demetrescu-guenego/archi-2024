<script setup lang="ts">
import { useData } from "vitepress";
import { Client } from "../../interfaces/Client";
import { GPSCoord } from "../../interfaces/GPSCoord";
import { Localisation } from "../../interfaces/Localisation";
import DataMap from "../widgets/DataMap.vue";

const { frontmatter } = useData();
console.log("frontmatter: ", frontmatter);

const mairies: Client[] = frontmatter.value.mairies;
console.log("mairies: ", mairies);
const publicOthers: Client[] = frontmatter.value.publicOthers;
console.log("publicOthers: ", publicOthers);

const DEFAULT_GPS: GPSCoord = { latitude: 0, longitude: 0 };

const localisations: Localisation[] = [...mairies, ...publicOthers].map((c) => {
  return {
    label: c.name,
    gps: c.gps ?? DEFAULT_GPS,
    url: "/clients/${c.name}",
    zipcode: c.zip,
  };
});
</script>

<template>
  <main class="flex flex-grow flex-col p-2">
    <h1>Carte de nos réalisations</h1>
    <DataMap :localisations />
  </main>
</template>
