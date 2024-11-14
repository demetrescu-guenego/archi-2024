<script lang="ts" setup>
import { Localisation } from "../../interfaces/Localisation";

const props = defineProps<{
  localisations: Localisation[];
}>();
console.log("props: ", props);
</script>

<template>Carte</template>
