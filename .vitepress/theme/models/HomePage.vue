<script setup lang="ts">
import { MenuItem } from "../widgets/interfaces/MenuItem";

const menu: MenuItem[] = [
  { href: "/realisations", label: "Réalisations" },
  { href: "/clients", label: "Clients" },
];
</script>

<template>
  <main class="flex-grow flex flex-col">
    <section class="block h-[80vh] relative bg-fuchsia-900 text-white">
      <div role="presentation" class="block absolute background">
        <img src="/home/plan.svg" alt="Plan" class="w-96" />
      </div>
      <div class="flex flex-col items-center justify-center h-full gap-12">
        <p class="text-5xl md:text-6xl text-center">
          Réussissez votre projet architectural&nbsp;!
        </p>
        <div
          class="flex flex-col sm:flex-row sm:gap-x-20 gap-y-5 flex-wrap sm:justify-center w-full px-4"
        >
          <a
            v-for="item in menu"
            :href="item.href"
            class="border-white border-2 px-8 py-4 text-xl sm:text-4xl text-center"
          >
            {{ item.label }}
          </a>
        </div>
      </div>
    </section>
  </main>
</template>
