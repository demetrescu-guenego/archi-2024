<script setup lang="ts">
import { CardContent } from "../../interfaces/CardContent";
import HighlightedText from "../components/HighlightedText.vue";

defineProps<{
  input: CardContent[];
  boldLabel?: boolean;
}>();
</script>

<template>
  <div class="flex flex-wrap justify-start gap-8 py-8">
    <a
      v-for="project in input"
      :key="project.title"
      class="flex w-72 flex-col overflow-hidden shadow-xl transition-transform hover:scale-105"
      :href="project.url"
    >
      <img
        :src="project.imageUrl"
        alt=""
        class="h-44 w-72 border-[0.2px] border-neutral-200 object-cover"
      />
      <div
        class="flex h-12 items-center justify-center px-4 text-center"
        :class="{ 'font-bold': boldLabel }"
      >
        <span v-if="project.title">
          <HighlightedText :text="project.title" :pattern="project.pattern" />
        </span>
        <span v-else class="text-neutral-400" role="presentation">
          Cliquer pour agrandir
        </span>
      </div>
    </a>
  </div>
</template>
