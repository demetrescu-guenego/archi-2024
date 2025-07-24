<script setup lang="ts">
import { GPSCoord } from "../../interfaces/GPSCoord";
import { ProjectData } from "../../interfaces/ProjectData";
import { normalizeGPS } from "../../utils/normalize-gps";

defineProps<{
  input: ProjectData;
}>();

const showGPS = (gps: GPSCoord | undefined) => {
  if (gps === undefined) {
    return "";
  }
  const gpsCoord = normalizeGPS(gps);
  return `gps(${gpsCoord.latitude.toFixed(3)}, ${gpsCoord.longitude.toFixed(3)})`;
};
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
      <tr>
        <td>Localisation</td>
        <td>
          <div class="flex gap-2">
            <a :href="`/carte?project=${input.client.gps}`"> Voir la carte </a>
            <span class="text-sm text-gray-500">{{
              showGPS(input.client.gps)
            }}</span>
          </div>
        </td>
      </tr>
      <tr v-if="input.classement">
        <td>Monuments historiques</td>
        <td>
          {{ input.classement }}
        </td>
      </tr>
    </tbody>
  </table>
</template>
