<script lang="ts" setup>
import { onMounted, useTemplateRef } from "vue";
import { Localisation } from "../../interfaces/Localisation";

const props = defineProps<{
  localisations: Localisation[];
}>();
console.log("props: ", props);

const mapElt = useTemplateRef("map");

const greenMarkerIcon = "/marker.svg";

const egliseIcon = "/marker-church.svg";

const shadowUrl =
  "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png";

onMounted(async () => {
  const L = await import("leaflet");
  if (mapElt.value === null) {
    return;
  }

  const getIcon = (localisation: Localisation) => {
    const isEglise = localisation.url.match("(eglises/|abbaye/)");
    return new L.Icon({
      iconUrl: isEglise ? egliseIcon : greenMarkerIcon,
      shadowUrl,
      iconSize: [28, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41],
    });
  };

  const map = L.map(mapElt.value).setView(
    [48.78648245905831, 2.712753660065945],
    10,
  );
  L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(map);

  for (const localisation of props.localisations) {
    L.marker([localisation.gps.latitude, localisation.gps.longitude], {
      icon: getIcon(localisation),
    })
      .addTo(map)
      .bindPopup(
        `<a href="${localisation.url}" style="text-decoration: underline;">${localisation.title} (${localisation.zipcode})</a>`,
      );
  }
});
</script>

<template>
  <div ref="map" class="h-96 w-full"></div>
</template>
