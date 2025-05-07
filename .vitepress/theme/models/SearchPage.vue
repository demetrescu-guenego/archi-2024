<script setup lang="ts">
import { useData } from "vitepress";
import { computed, ref } from "vue";
import { CardContent } from "../../interfaces/CardContent";
import { Post } from "../../interfaces/Post";
import { getImageUrl } from "../utils/getImageUrl";
import NiceCards from "../widgets/NiceCards.vue";
import { fuzzySearch } from "../utils/fuzzySearch";

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
    const projectTitle = project.title.toLowerCase();
    const cityName = project.client.commune
      ? project.client.commune.name.toLowerCase()
      : project.client.name.toLowerCase();

    return (
      fuzzySearch(projectTitle, searchQuery.value) ||
      fuzzySearch(cityName, searchQuery.value)
    );
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
        class="w-full rounded-lg border border-fuchsia-900 px-4 py-2 focus:border-fuchsia-700 focus:outline-none focus:ring-2 focus:ring-fuchsia-700"
      />
    </div>

    <NiceCards :input="cards" />
  </div>
</template>
