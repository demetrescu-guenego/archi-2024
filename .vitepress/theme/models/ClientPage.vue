<script setup lang="ts">
import { useData } from "vitepress";
import MairieTable from "../widgets/MairieTable.vue";
import ParallaxImage from "../widgets/ParallaxImage.vue";

const { frontmatter } = useData();
</script>

<template>
  <main class="">
    <section class="bg-white p-2">
      <div class="mx-auto flex max-w-5xl flex-grow flex-col pb-16">
        <h1>Nos clients</h1>
        <p>
          Nous indiquons ici seulement nos clients publics, les clients privés
          souhaitant la plupart rester sous confidence.
        </p>
        <h2>Public</h2>
        <h3 class="block-title">Mairies</h3>
        <MairieTable :input="frontmatter.mairies" />
      </div>
    </section>

    <section class="bg-white p-2">
      <div class="mx-auto flex max-w-5xl flex-grow flex-col pb-16">
        <h3 class="block-title">Collectivités locales, ...</h3>
        <MairieTable :input="frontmatter.publicOthers" />
      </div>
    </section>
    <section class="parallax">
      <ParallaxImage
        portrait="/home/clients-portrait.jpg"
        landscape="/home/clients-landscape.jpg"
        alt="Avec nos clients"
      />
    </section>
  </main>
</template>
