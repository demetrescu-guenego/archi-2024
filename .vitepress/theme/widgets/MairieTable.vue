<script setup lang="ts">
import { useRouter } from "vitepress";
import { Client } from "../interfaces/Client";

const props = defineProps<{
  input: Client[];
}>();

const router = useRouter();

const mairies = props.input.sort((a, b) => (a.name < b.name ? -1 : 1));

const gotoUrl = async (url: string) => {
  await router.go(`/clients/${url}`);
};
</script>

<template>
  <table class="table">
    <tbody>
      <tr class="bg-fuchsia-800 text-white font-bold">
        <th>Nom</th>
        <th>Code postal</th>
        <th>Année</th>
      </tr>
      <tr
        v-for="client in mairies"
        :key="client.name"
        @click="gotoUrl(client.name)"
      >
        <td>
          {{ client.name }}
        </td>
        <td>{{ client.zip }}</td>
        <td>{{ client.years.join(", ") }}</td>
      </tr>
    </tbody>
  </table>
</template>
