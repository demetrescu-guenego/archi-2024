<script setup lang="ts">
import { ProjectData } from "../../../interfaces/ProjectData";

defineProps<{
  input: ProjectData;
}>();
</script>

<template>
  <ul>
    <li>Maîtrise d'ouvrage : {{ input.moa.name }}</li>
    <li v-if="input.classement">Classement MH : {{ input.classement }}</li>
  </ul>
</template>
