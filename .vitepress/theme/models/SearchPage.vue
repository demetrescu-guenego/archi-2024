<script setup lang="ts">
import { useData } from "vitepress";
import { computed, ref } from "vue";
import { CardContent } from "../../interfaces/CardContent";
import { CardsByYear } from "../../interfaces/CardsByYear";
import { Post } from "../../interfaces/Post";
import { ProjectWithScore } from "../../interfaces/ProjectWithScore";
import { fuzzySearch } from "../utils/fuzzySearch";
import { getImageUrl } from "../utils/getImageUrl";
import { getLastYear } from "../utils/getLastYear";
import { getMissions, getMontantDesTravaux } from "../utils/project";
import NiceCards from "../widgets/NiceCards.vue";
import { getPrintableItems } from "../utils/printableSearch";

const searchQuery = ref("");

const { frontmatter } = useData();

const posts: Post[] = frontmatter.value.posts;

const projects = computed(() => {
  const allProjects = posts.map((post) => ({
    title: post.frontmatter.title,
    url: post.url,
    client: post.frontmatter.client,
    year: getLastYear(post),
    price: getMontantDesTravaux(post),
    missions: getMissions(post),
  }));

  return allProjects
    .map((project) => {
      const result = fuzzySearch(project.title, searchQuery.value);
      return {
        ...project,
        searchScore: result?.score ?? (searchQuery.value ? -1 : 0),
      } satisfies ProjectWithScore;
    })
    .filter((project) => project.searchScore >= 0)
    .sort((a, b) => {
      if (!searchQuery.value) {
        return a.title < b.title ? -1 : 1;
      }
      return (b.searchScore ?? 0) - (a.searchScore ?? 0);
    });
});

const groupedCards = computed<CardsByYear[]>(() => {
  const map = new Map<number, CardContent[]>();

  projects.value.forEach((p) => {
    const card: CardContent = {
      title: p.title,
      url: p.url,
      imageUrl: getImageUrl(p.url),
      pattern: searchQuery.value,
      price: p.price,
      missions: p.missions,
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

const printableItems = getPrintableItems(groupedCards.value);
</script>

<template>
  <div class="hidden px-8 py-6 print:hidden">
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

    <div v-for="group in groupedCards" :key="group.year" class="mt-1">
      <h2 class="text-xl font-bold">{{ group.year }}</h2>
      <NiceCards :input="group.cards" />
    </div>
  </div>
  <div>
    <div
      v-for="(item, index) in printableItems"
      :key="index"
      class="height-item odd:bg-amber-50"
    >
      <template v-if="item.type === 'header'">
        <div class="flex h-20">
          <span
            class="flex w-60 flex-col items-center justify-center bg-fuchsia-900 text-white"
          >
            <span>Cabinet d'architecture</span>
            <span>DEMETRESCU-GUÉNÉGO</span>
            <span class="underline">https://guenego.com</span>
          </span>
          <img src="/home/header.jpg" loading="lazy" class="grow" />
        </div>
      </template>
      <template v-if="item.type === 'footer'">
        <div
          class="height-item flex items-center justify-center text-center text-gray-500"
        >
          Page {{ item.current }} / {{ item.total }}
        </div>
      </template>
      <template v-if="item.type === 'year'">
        <div class="text-xl font-bold">{{ item.year }}</div>
      </template>
      <template v-if="item.type === 'project'">
        <div class="flex h-full">
          <img
            :src="item.project.imageUrl"
            alt=""
            class="h-22 w-36 border-[0.2px] border-neutral-200 object-cover"
          />
          <div class="height-item grow pl-4">
            <div class="text-lg font-bold text-fuchsia-900">
              {{ item.project.title }}
            </div>
            <div v-if="item.project.price">
              Montant des travaux :
              {{ item.project.price.toLocaleString("fr") }} € HT
            </div>
            <div v-if="item.project.missions">
              Missions : {{ item.project.missions.join(", ") }}
            </div>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>
