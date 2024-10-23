<script setup lang="ts">
import { ProjectData } from "../interfaces/ProjectData";

const props = defineProps<{
  input: ProjectData;
}>();
</script>

<template>
  <table class="table">
    <tr>
      <td>Maîtrise d'ouvrage</td>
      <td>
        <a v-if="input.moa.url" :href="input.moa.url" target="_blank">
          {{ input.moa.name }}
        </a>
        <span v-else>
          {{ input.moa.name }}
        </span>
      </td>
    </tr>
    <tr v-if="input.classement">
      <td>Monuments historiques</td>
      <td>
        {{ input.classement }}
      </td>
    </tr>
  </table>
</template>
