<script setup lang="ts">
import { useData } from "vitepress";
import { GPSCoord } from "../../interfaces/GPSCoord";
import { Localisation } from "../../interfaces/Localisation";
import { Post } from "../../interfaces/Post";
import { normalizeGPS } from "../../utils/normalize-gps";
import DataMap from "../widgets/DataMap.vue";

const { frontmatter } = useData();

const posts: Post[] = frontmatter.value.posts;

const DEFAULT_GPS: GPSCoord = { latitude: 0, longitude: 0 };

const localisations: Localisation[] = posts.map((p) => {
  return {
    title: p.frontmatter.title,
    gps: normalizeGPS(p.frontmatter.client.gps ?? DEFAULT_GPS),
    url: p.url,
    zipcode: p.frontmatter.client.zip,
  };
});

const title = `Total : ${localisations.length}, note : tout n'est pas exposé.`;
</script>

<template>
  <main class="flex flex-grow flex-col">
    <h1 class="my-2" :title>Localisation de nos réalisations</h1>
    <ClientOnly>
      <DataMap :localisations class="grow" />
    </ClientOnly>
  </main>
</template>
