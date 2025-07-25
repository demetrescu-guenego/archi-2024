<script lang="ts" setup>
import { onMounted, ref, useTemplateRef, watch } from "vue";
import { Localisation } from "../../interfaces/Localisation";
import type { Map } from "leaflet";

const props = defineProps<{
  localisations: Localisation[];
}>();

const mapElt = useTemplateRef("mapRef");

const map = ref<Map | null>(null);
console.log("map: ", map.value);

const greenMarkerIcon = "/marker.svg";

const egliseIcon = "/marker-church.svg";

const shadowUrl =
  "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png";

const getCenterGPS = (): [number, number] => {
  if (props.localisations.length !== 1) {
    return [48.78648245905831, 2.712753660065945];
  }
  const gps = props.localisations[0].gps;
  return [gps.latitude, gps.longitude];
};

const reload = async () => {
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

  const centerGPS = getCenterGPS();

  if (map.value !== null) {
    console.log("map.value: ", map.value);
    console.log("remove");
    map.value.remove();
    map.value = null;
  }

  if (map.value === null) {
    map.value = L.map(mapElt.value).setView(centerGPS, 10);
    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map.value as Map);
  }

  for (const localisation of props.localisations) {
    L.marker([localisation.gps.latitude, localisation.gps.longitude], {
      icon: getIcon(localisation),
    })
      .addTo(map.value as Map)
      .bindPopup(
        `<a href="${localisation.url}" style="text-decoration: underline;">${localisation.title} (${localisation.zipcode})</a>`,
      );
  }
};

onMounted(reload);

watch(() => props.localisations, reload);
</script>

<template>
  <div ref="mapRef" class="h-96 w-full"></div>
</template>
