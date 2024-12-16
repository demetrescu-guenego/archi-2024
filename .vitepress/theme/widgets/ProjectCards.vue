<script setup lang="ts">
import { CardContent } from "../../interfaces/CardContent";

defineProps<{
  input: CardContent[];
  boldLabel?: boolean;
}>();

const emit = defineEmits<{
  (e: "view", index: number): void;
}>();

const handleClick = (index: number) => {
  emit("view", index);
};
</script>

<template>
  <div class="flex flex-wrap justify-center gap-8 py-8">
    <div
      v-for="(project, index) in input"
      :key="project.title"
      class="flex w-72 cursor-pointer flex-col overflow-hidden shadow-xl transition-transform hover:scale-105"
      @click="handleClick(index)"
    >
      <img
        :src="project.imageUrl"
        alt=""
        class="border-neutral-2=300 h-44 w-72 border-[0.2px] object-cover"
      />
      <div
        class="flex h-12 items-center justify-center px-4 text-center"
        :class="{ 'font-bold': boldLabel }"
      >
        <span v-if="project.title" v-html="project.title"> </span>
        <span v-else class="text-neutral-400" role="presentation">
          Cliquer pour agrandir
        </span>
      </div>
    </div>
  </div>
</template>
