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
    class="flex h-16 items-center justify-between bg-fuchsia-900 text-white"
  >
    <a href="#" class="flex items-center px-4">
      <img
        src="/logo-white.svg"
        alt="Logo Cabinet d'architecture DEMETRESCU - GUÉNÉGO"
        class="h-12"
      />
      <span class="font-bold md:font-normal text-sm md:text-xl">
        <span>
          Cabinet d'architecture<br />
          DEMETRESCU - GUÉNÉGO
        </span>
      </span>
    </a>
    <ResponsiveMenu :list="list" />
  </header>
</template>
