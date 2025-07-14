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

const getFirstYear = (p: Post): number => {
  const interventions = p.frontmatter.interventions ?? [];
  const year = interventions
    .map((i) => {
      if (typeof i.year === "number") return i.year;
      if (typeof i.year === "string") return +i.year.substring(0, 4);
      return 0;
    })
    .sort()
    .at(0);
  return year ?? 0;
};

interface ProjectWithScore {
  title: string;
  url: string;
  client: Client;
  year: number;
  searchScore: number;
}

const projects = computed(() => {
  const allProjects = posts.map((post) => ({
    title: post.frontmatter.title,
    url: post.url,
    client: post.frontmatter.client,
    year: getFirstYear(post),
  }));

  return allProjects
    .map((project) => {
      const result = fuzzySearch(project.title, searchQuery.value);
      return {
        ...project,
        searchScore: result?.score ?? (searchQuery.value ? -1 : 0),
      } as ProjectWithScore;
    })
    .filter((project) => project.searchScore >= 0)
    .sort((a, b) => {
      if (!searchQuery.value) {
        return a.title < b.title ? -1 : 1;
      }
      return (b.searchScore ?? 0) - (a.searchScore ?? 0);
    });
});

interface CardsByYear {
  year: number;
  cards: CardContent[];
}

const groupedCards = computed<CardsByYear[]>(() => {
  const map = new Map<number, CardContent[]>();

  projects.value.forEach((p) => {
    const card: CardContent = {
      title: p.title,
      url: p.url,
      imageUrl: getImageUrl(p.url),
      pattern: searchQuery.value,
    };
    const list = map.get(p.year) ?? [];
    list.push(card);
    map.set(p.year, list);
  });

  return Array.from(map.entries())
    .filter(([, cards]) => cards.length > 0)
    .sort((a, b) => b[0] - a[0])
    .map(([year, cards]) => ({ year, cards }));
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
        class="w-full rounded-lg border border-fuchsia-900 px-4 py-2 focus:border-fuchsia-700 focus:ring-2 focus:ring-fuchsia-700 focus:outline-none"
      />

      <!-- Results counter -->
      <div class="mt-4 text-center text-gray-600 dark:text-gray-400">
        {{ resultsLabel }}
      </div>
    </div>

    <div v-for="group in groupedCards" :key="group.year" class="mt-8">
      <h2 class="text-xl font-bold">{{ group.year }}</h2>
      <NiceCards :input="group.cards" />
    </div>
  </div>
</template>
