<script setup lang="ts">
import HeaderLayout from "./layout/HeaderLayout.vue";
import FooterLayout from "./layout/FooterLayout.vue";
import BodyLayout from "./layout/BodyLayout.vue";
</script>

<template>
  <div class="min-h-screen flex flex-col justify-between">
    <HeaderLayout />
    <BodyLayout />
    <FooterLayout />
  </div>
</template>
