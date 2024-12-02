<script setup lang="ts">
import HeaderLayout from "./layout/HeaderLayout.vue";
import FooterLayout from "./layout/FooterLayout.vue";
import BodyLayout from "./layout/BodyLayout.vue";
import RegisterSW from "./widgets/RegisterSW.vue";
</script>

<template>
  <div class="printable flex min-h-screen flex-col justify-between">
    <HeaderLayout />
    <BodyLayout />
    <FooterLayout />
  </div>

  <RegisterSW />
</template>
