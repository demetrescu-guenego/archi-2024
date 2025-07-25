<script setup lang="ts">
import { useData, useRoute } from "vitepress";
import { computed } from "vue";
import { GPSCoord } from "../../interfaces/GPSCoord";
import { Localisation } from "../../interfaces/Localisation";
import { normalizeGPS } from "../../utils/normalize-gps";
import DataMap from "../widgets/DataMap.vue";

const { frontmatter } = useData();
const route = useRoute();

const getPosts = () => {
  if (!("window" in globalThis)) {
    return frontmatter.value.posts;
  }
  const search = window.location.search;
  console.log("search: ", search);
  const params = new URLSearchParams(search);
  const projectUrl = params.get("projectUrl");
  if (!projectUrl) {
    return frontmatter.value.posts;
  }
  const post = frontmatter.value.posts.find((post) => {
    return "/" + post.url === projectUrl;
  });
  if (post === undefined) {
    return frontmatter.value.posts;
  }
  return [post];
};

// const posts: Post[] = getPosts();

const posts = computed(() => {
  const query = route.path;
  console.log("query: ", query);
  return getPosts();
});

const DEFAULT_GPS: GPSCoord = { latitude: 0, longitude: 0 };

const localisations = computed<Localisation[]>(() => {
  console.log("posts: ", posts.value);
  return posts.value.map((p) => {
    return {
      title: p.frontmatter.title,
      gps: normalizeGPS(p.frontmatter.client.gps ?? DEFAULT_GPS),
      url: p.url,
      zipcode: p.frontmatter.client.zip,
    };
  });
});

const title = computed(
  () => `Total : ${localisations.value.length}, note : tout n'est pas exposé.`,
);
</script>

<template>
  <main class="flex flex-grow flex-col">
    <h1 class="my-2" :title>
      {{
        localisations.length === 1
          ? "Localisation du projet"
          : "Localisation de nos réalisations"
      }}
    </h1>
    <ClientOnly>
      <DataMap :localisations class="grow" />
    </ClientOnly>
  </main>
</template>
