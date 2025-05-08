<script setup lang="ts">
import { useData } from "vitepress";
import { computed, ref } from "vue";
import { CardContent } from "../../interfaces/CardContent";
import { Post } from "../../interfaces/Post";
import { fuzzySearch } from "../utils/fuzzySearch";
import { getImageUrl } from "../utils/getImageUrl";
import NiceCards from "../widgets/NiceCards.vue";
import { Client } from "../../interfaces/Client";

const searchQuery = ref("");

const { frontmatter } = useData();

const posts: Post[] = frontmatter.value.posts;

interface ProjectWithScore {
  title: string;
  url: string;
  client: Client;
  searchScore: number;
}

const projects = computed(() => {
  const allProjects = posts.map((post) => ({
    title: post.frontmatter.title,
    url: post.url,
    client: post.frontmatter.client,
  }));

  if (!searchQuery.value) {
    return allProjects.sort((a, b) => (a.title < b.title ? -1 : 1));
  }

  return allProjects
    .map((project) => {
      const result = fuzzySearch(project.title, searchQuery.value);
      return {
        ...project,
        searchScore: result?.score ?? -1,
      } as ProjectWithScore;
    })
    .filter((project) => project.searchScore >= 0)
    .sort((a, b) => (b.searchScore ?? 0) - (a.searchScore ?? 0));
});

const cards = computed(() => {
  return projects.value.map((p) => {
    return {
      title: p.title,
      url: p.url,
      imageUrl: getImageUrl(p.url),
      pattern: searchQuery.value,
    } satisfies CardContent;
  });
});

const resultCount = computed(() => projects.value.length);
const resultsLabel = computed(() => {
  return `${resultCount.value} projet${resultCount.value !== 1 ? "s" : ""} trouvé${resultCount.value !== 1 ? "s" : ""}`;
});
</script>

<template>
  <div class="px-8 py-6">
    <div class="mx-auto max-w-5xl">
      <input
        v-model="searchQuery"
        v-autofocus
        type="text"
        placeholder="Rechercher par ville..."
        class="w-full rounded-lg border border-fuchsia-900 px-4 py-2 focus:border-fuchsia-700 focus:outline-none focus:ring-2 focus:ring-fuchsia-700"
      />

      <!-- Results counter -->
      <div class="mt-4 text-center text-gray-600 dark:text-gray-400">
        {{ resultsLabel }}
      </div>
    </div>

    <NiceCards :input="cards" />
  </div>
</template>
