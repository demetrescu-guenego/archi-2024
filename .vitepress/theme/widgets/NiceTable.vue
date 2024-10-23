<script setup lang="ts">
interface Pair {
  key: string;
  value: string;
}

const props = defineProps<{
  input: Pair[];
}>();
</script>

<template>
  <table class="table">
    <tr v-for="item in props.input" class="">
      <td>{{ item.key }}</td>
      <td>{{ item.value }}</td>
    </tr>
  </table>
</template>
