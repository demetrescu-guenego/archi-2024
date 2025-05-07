<script setup lang="ts">
import { ref, computed } from "vue";
import { useData } from "vitepress";
import { Post } from "../../interfaces/Post";

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
</script>

<template>
  <div class="px-8 py-6">
    <div class="mx-auto max-w-2xl">
      <input
        v-model="searchQuery"
        type="text"
        placeholder="Rechercher par ville..."
        class="w-full rounded-lg border border-gray-200 px-4 py-2 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:focus:border-blue-400"
      />
    </div>

    <div class="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      <div
        v-for="project in projects"
        :key="project.url"
        class="group overflow-hidden rounded-lg border border-gray-200 transition-transform hover:-translate-y-1 hover:shadow-lg dark:border-gray-700"
      >
        <a :href="project.url" class="block">
          <div class="p-4">
            <h3
              class="mb-2 text-lg font-semibold text-gray-900 dark:text-gray-100"
            >
              {{ project.title }}
            </h3>
            <p class="text-sm text-gray-600 dark:text-gray-400">
              {{ project.client.commune?.name || project.client.name }}
            </p>
          </div>
        </a>
      </div>
    </div>
  </div>
</template>
