<script setup lang="ts">
import { ProjectData } from "../../interfaces/ProjectData";

defineProps<{
  input: ProjectData;
}>();
</script>

<template>
  <table class="table">
    <thead>
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
    </thead>
    <tbody>
      <tr v-if="input.classement">
        <td>Monuments historiques</td>
        <td>
          {{ input.classement }}
        </td>
      </tr>
    </tbody>
  </table>
</template>
