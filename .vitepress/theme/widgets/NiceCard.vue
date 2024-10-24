<script setup lang="ts">
import { CardContent } from "../../interfaces/CardContent";

defineProps<{
  input: CardContent[];
  boldLabel?: boolean;
}>();
</script>

<template>
  <div class="flex flex-wrap justify-center gap-8 py-8">
    <a
      v-for="project in input"
      :key="project.label"
      class="flex w-72 flex-col overflow-hidden shadow-xl transition-transform hover:scale-105"
      :href="project.url"
    >
      <img
        :src="project.imageUrl"
        :alt="project.label"
        class="h-44 w-72 object-cover"
      />
      <div
        class="flex h-12 items-center justify-center px-4 text-center"
        :class="{ 'font-bold': boldLabel }"
      >
        {{ project.label }}
      </div>
    </a>
  </div>
</template>
