<script setup lang="ts">
import { Intervention } from "../interfaces/Intervention";

const props = defineProps<{
  input: Intervention[];
}>();
</script>

<template>
  <table class="table">
    <tbody
      v-for="intervention in props.input"
      class="border-b-[2rem] border-white"
    >
      <tr>
        <td>
          <b>
            {{ intervention.year }}
            <span ng-if="intervention.ongoing">- en cours</span>
          </b>
        </td>
        <td>{{ intervention.title }}</td>
      </tr>
      <tr v-if="intervention.missions">
        <td>Missions</td>
        <td>
          {{ intervention.missions.join(", ") }}
        </td>
      </tr>
      <tr v-if="intervention.price">
        <td>Montant des travaux</td>
        <td>
          {{ intervention.price }}
        </td>
      </tr>
    </tbody>
  </table>
</template>
