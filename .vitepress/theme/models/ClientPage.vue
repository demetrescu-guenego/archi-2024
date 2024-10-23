<script setup lang="ts">
import { useData } from "vitepress";
import MairieTable from "../widgets/MairieTable.vue";
import ParallaxImage from "../widgets/ParallaxImage.vue";

const { frontmatter } = useData();
</script>

<template>
  <main class="">
    <section class="bg-white p-2">
      <div class="flex-grow flex flex-col max-w-5xl mx-auto pb-16">
        <h1>Nos clients</h1>
        <p>
          Nous indiquons ici seulement nos clients publics, les clients privés
          souhaitant la plupart rester sous confidence.
        </p>
        <h2>Public</h2>
        <h3>Mairies</h3>
        <MairieTable :input="frontmatter.mairies" />
      </div>
    </section>
    <section class="parallax">
      <ParallaxImage
        portrait="/home/clients-portrait.jpg"
        landscape="/home/clients-landscape.jpg"
        alt="Avec nos clients"
      />
      <div class="bg-white text-center">
        Chateau de Ferrières-en-Brie (1855-1859, famille Rothschild),
        restauration par notre cabinet en 2016.
      </div>
    </section>
    <section class="bg-white p-2">
      <div class="flex-grow flex flex-col max-w-5xl mx-auto pb-16">
        <h3>Autres entités publiques</h3>
        <MairieTable :input="frontmatter.publicOthers" />
      </div>
    </section>
  </main>
</template>
