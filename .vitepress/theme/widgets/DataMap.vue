<script lang="ts" setup>
import { onMounted, useTemplateRef } from "vue";
import { Localisation } from "../../interfaces/Localisation";

const props = defineProps<{
  localisations: Localisation[];
}>();
console.log("props: ", props);

const mapElt = useTemplateRef("map");

onMounted(async () => {
  const L = await import("leaflet");
  console.log("L: ", L);
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

  const greenIcon = new L.Icon({
    iconUrl:
      "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png",
    shadowUrl:
      "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
  });

  for (const localisation of props.localisations) {
    L.marker([localisation.gps.latitude, localisation.gps.longitude], {
      icon: greenIcon,
    })
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
