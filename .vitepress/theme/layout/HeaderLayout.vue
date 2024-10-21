<script setup lang="ts">
import { MenuItem } from "../widgets/interfaces/MenuItem";
import ResponsiveMenu from "../widgets/ResponsiveMenu.vue";

const list: MenuItem[] = [
  { href: "/", label: "Accueil" },
  { href: "/realisations", label: "Réalisations" },
  { href: "/clients", label: "Clients" },
  { href: "/contact", label: "Contact" },
];
</script>

<template>
  <header
    class="flex h-16 items-center justify-between bg-fuchsia-800 text-white px-4"
  >
    <a href="#" class="flex items-center">
      <img
        src="/logo-white.svg"
        alt="Logo Cabinet d'architecture DEMETRESCU - GUÉNÉGO"
        class="h-10"
      />
      <span class="text-xl max-w-64">
        Cabinet d'architecture DEMETRESCU - GUÉNÉGO
      </span>
    </a>
    <ResponsiveMenu :list="list" />
  </header>
</template>
