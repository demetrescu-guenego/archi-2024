<script lang="ts" setup>
import * as L from "leaflet";
import { onMounted, useTemplateRef } from "vue";
import { Localisation } from "../../interfaces/Localisation";

const props = defineProps<{
  localisations: Localisation[];
}>();
console.log("props: ", props);

const mapElt = useTemplateRef("map");

onMounted(() => {
  console.log("map");
  if (mapElt.value === null) {
    return;
  }

  const map = L.map(mapElt.value).setView(
    [48.78648245905831, 2.712753660065945],
    10,
  );
  L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(map);

  L.marker([48.78648245905831, 2.712753660065945])
    .addTo(map)
    .bindPopup("A pretty CSS popup.<br> Easily customizable.");

  for (const localisation of props.localisations) {
    L.marker([localisation.gps.latitude, localisation.gps.longitude])
      .addTo(map)
      .bindPopup(
        `<a href="${localisation.url}" style="color: black;">${localisation.label} (${localisation.zipcode})</a>`,
      );
  }
});
</script>

<template>
  <div ref="map" class="h-96 w-full"></div>
</template>
