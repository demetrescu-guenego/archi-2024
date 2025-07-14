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
      v-for="(card, index) in input"
      :key="card.title"
      class="flex w-72 cursor-pointer flex-col overflow-hidden shadow-xl transition-transform hover:scale-105"
      @click="handleClick(index)"
    >
      <img
        :src="card.imageUrl"
        alt=""
        class="h-44 w-72 border-[0.2px] border-neutral-200 object-cover"
      />
      <div
        class="flex h-12 items-center justify-center px-4 text-center"
        :class="{ 'font-bold': boldLabel }"
      >
        <span v-if="card.title" v-html="card.title"> </span>
        <span v-else class="text-neutral-400" role="presentation">
          Cliquer pour agrandir
        </span>
      </div>
    </div>
  </div>
</template>
