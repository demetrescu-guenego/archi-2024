<script setup lang="ts">
import { useData } from "vitepress";
import { computed, ref } from "vue";
import { CardContent } from "../../interfaces/CardContent";
import { Post } from "../../interfaces/Post";
import { getImageUrl } from "../utils/getImageUrl";
import NiceCards from "../widgets/NiceCards.vue";

const searchQuery = ref("");

const { frontmatter } = useData();

const posts: Post[] = frontmatter.value.posts;

const projects = computed(() => {
  const allProjects = posts.map((post) => {
    return {
      title: post.frontmatter.title,
      url: post.url,
      client: post.frontmatter.client,
    };
  });

  if (!searchQuery.value) return allProjects;

  return allProjects.filter((project) => {
    const cityName = project.client.commune
      ? project.client.commune.name.toLowerCase()
      : project.client.name.toLowerCase();

    return cityName.includes(searchQuery.value.toLowerCase());
  });
});

const cards = computed(() => {
  return projects.value.map((p) => {
    return {
      title: p.title,
      url: p.url,
      imageUrl: getImageUrl(p.url),
    } satisfies CardContent;
  });
});
</script>

<template>
  <div class="px-8 py-6">
    <div class="mx-auto max-w-5xl">
      <input
        v-model="searchQuery"
        type="text"
        placeholder="Rechercher par ville..."
        class="w-full rounded-lg border border-black px-4 py-2 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:focus:border-blue-400"
      />
    </div>

    <NiceCards :input="cards" />
  </div>
</template>
