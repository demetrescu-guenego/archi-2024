<script lang="ts" setup>
import { Localisation } from "../../interfaces/Localisation";

const props = defineProps<{
  localisations: Localisation[];
}>();
console.log("props: ", props);
</script>

<template>
  <div v-for="localisation in localisations" :key="localisation.label">
    {{ localisation }}
  </div>
</template>
