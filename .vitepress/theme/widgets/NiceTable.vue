<script setup lang="ts">
interface Pair {
  key: string;
  value: string;
  class?: string;
}

const props = defineProps<{
  input: Pair[];
}>();
</script>

<template>
  <table class="table-auto animate-[accordion_500ms_forwards]">
    <tr
      v-for="item in props.input"
      class="even:bg-neutral-50 odd:bg-neutral-100"
    >
      <td class="p-2" :class="item.class">{{ item.key }}</td>
      <td class="p-2">{{ item.value }}</td>
    </tr>
  </table>
</template>
