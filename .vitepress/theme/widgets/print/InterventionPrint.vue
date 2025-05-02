<script setup lang="ts">
import { Intervention } from "../../../interfaces/Intervention";

const props = defineProps<{
  input: Intervention[];
}>();
</script>

<template>
  <ul>
    <li v-for="(intervention, index) in props.input.slice(0, 4)" :key="index">
      {{ intervention.year }}
      <span v-if="intervention.ongoing">- en cours </span>:
      {{ intervention.title }} <br />
      <span v-if="intervention.missions"
        >{{ intervention.missions.join(", ") }} <br />
      </span>
      <span v-if="intervention.price">
        Montant des Travaux : {{ intervention.price }}
      </span>
    </li>
    <li v-if="props.input.length > 4">
      Autres interventions en
      {{
        props.input
          .slice(4)
          .map((i) => i.year)
          .join(", ")
      }}
    </li>
  </ul>
</template>
