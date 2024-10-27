<script setup lang="ts">
import { MenuItem } from "../../interfaces/MenuItem";
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
    <a href="/" class="flex items-center px-2">
      <img
        src="/logo-white.svg"
        alt="Logo Cabinet d'architecture DEMETRESCU - GUÉNÉGO"
        class="h-12 w-12"
      />
      <span class="text-sm font-bold md:text-xl md:font-normal">
        <span>
          Cabinet d'architecture<br />
          DEMETRESCU - GUÉNÉGO
        </span>
      </span>
    </a>
    <ClientOnly>
      <ResponsiveMenu :list="list" />
    </ClientOnly>
  </header>
</template>
