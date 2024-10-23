<script setup lang="ts">
import { useRouter } from "vitepress";
import { Client } from "../interfaces/Client";
import { toSlug } from "../utils/slug";

const props = defineProps<{
  input: Client[];
}>();

const router = useRouter();

const mairies = [...props.input].sort((a, b) => (a.name < b.name ? -1 : 1));
console.log("mairies: ", mairies);

const gotoUrl = async (url: string) => {
  await router.go(`/clients/${toSlug(url)}`);
};
</script>

<template>
  <table class="table">
    <thead>
      <tr class="bg-fuchsia-800 text-white font-bold">
        <th>Nom</th>
        <th>Code postal</th>
        <th>Année</th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="client in mairies"
        :key="client.name"
        @click="gotoUrl(client.name)"
        class="cursor-pointer"
      >
        <td>
          {{ client.name }}
        </td>
        <td>{{ client.zip }}</td>
        <td>{{ client.years.join(" ") }}</td>
      </tr>
    </tbody>
  </table>
</template>
