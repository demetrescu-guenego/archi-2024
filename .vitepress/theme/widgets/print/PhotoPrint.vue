<script setup lang="ts">
import { CardContent } from "../../../interfaces/CardContent";

defineProps<{
  input: CardContent[];
  boldtitle?: boolean;
}>();
</script>

<template>
  <div v-if="input.length === 3" class="flex h-80 flex-grow">
    <div class="flex basis-1/2">
      <img :src="input[0].imageUrl" class="w-full object-cover" />
    </div>

    <div class="flex basis-1/2 flex-col">
      <div class="basis-1/2 overflow-hidden">
        <img
          :src="input[1].imageUrl"
          class="h-full w-full overflow-hidden object-cover"
        />
      </div>
      <div class="basis-1/2 overflow-hidden">
        <img
          :src="input[2].imageUrl"
          class="h-full w-full overflow-hidden object-cover"
        />
      </div>
    </div>
  </div>
  <div
    v-else-if="input.length === 6"
    class="grid-wrap grid flex-grow grid-cols-3 grid-rows-2 justify-stretch gap-0 bg-red-300"
  >
    <img
      v-for="project in input"
      :key="project.title"
      :src="project.imageUrl"
      class="h-full overflow-hidden object-cover"
    />
  </div>
  <div
    v-else
    class="grid-wrap grid h-80 flex-grow grid-cols-3 grid-rows-3 justify-stretch gap-0"
  >
    <img
      v-for="project in input.slice(0, 9)"
      :key="project.title"
      :src="project.imageUrl"
      class="h-full w-full overflow-hidden object-cover"
    />
  </div>
</template>
