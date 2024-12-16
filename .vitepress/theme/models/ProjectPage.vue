<script setup lang="ts">
import { useData, useRoute } from "vitepress";
import { ref } from "vue";
import { CardContent } from "../../interfaces/CardContent";
import { Photo } from "../../interfaces/Photo";
import { ProjectData } from "../../interfaces/ProjectData";
import ImageGallery from "../widgets/ImageGallery.vue";
import InterventionTable from "../widgets/InterventionTable.vue";
import ParallaxImage from "../widgets/ParallaxImage.vue";
import PresentationTable from "../widgets/PresentationTable.vue";
import InterventionPrint from "../widgets/print/InterventionPrint.vue";
import PhotoPrint from "../widgets/print/PhotoPrint.vue";
import PresentationPrint from "../widgets/print/PresentationPrint.vue";
import ProjectCards from "../widgets/ProjectCards.vue";

const { frontmatter } = useData<ProjectData>();
const route = useRoute();

const [, , category, name] = route.path.split("/");

const parallax = `/photos/projects/${category}/${name}/parallax.jpg`;

const photos: Photo[] = frontmatter.value.photos ?? [];

// dangerous code
const projectData: ProjectData = frontmatter.value as ProjectData;

const cards: CardContent[] = photos.map((p) => {
  return {
    title: p.title,
    url: `/viewer?src=/photos/projects/${category}/${name}/${p.url}`,
    imageUrl: `/photos/projects/${category}/${name}/${p.url}`,
  } satisfies CardContent;
});

const isShowingImage = ref(false);
const currentIndex = ref(0);

const handleView = (index: number) => {
  console.log("index: ", index);
  isShowingImage.value = true;
  currentIndex.value = index;
};

const handleClose = () => {
  isShowingImage.value = false;
};
</script>

<template>
  <main class="flex flex-grow flex-col print:hidden">
    <section class="bg-white">
      <div class="mx-auto max-w-5xl px-2 pb-4">
        <h1>Réalisation: {{ frontmatter.title }}</h1>
        <h2>Présentation</h2>
        <PresentationTable :input="projectData" />
        <h2>Interventions</h2>
        <InterventionTable :input="frontmatter.interventions" />
      </div>
    </section>
    <section class="parallax print:hidden">
      <ParallaxImage
        :portrait="parallax"
        :landscape="parallax"
        alt="Chateau de Ferrières en brie (1855-1859, famille Rothschield), restauration par notre catbinet en 2015."
      />
    </section>
    <section>
      <div class="mx-auto max-w-5xl px-2 pb-4">
        <h2>Description</h2>
        <Content />
        <template v-if="cards.length > 0">
          <h2>Photos</h2>
          <div>
            <ProjectCards :input="cards" @view="handleView" />
          </div>
        </template>
      </div>
    </section>
  </main>
  <ImageGallery
    v-if="isShowingImage"
    :cards="cards"
    :index="currentIndex"
    @close="handleClose()"
  />
  <main
    class="hidden print:flex print:flex-grow print:flex-col print:justify-between"
  >
    <section>
      <div class="mx-auto max-w-5xl px-2 pb-4">
        <h1>Réalisation: {{ frontmatter.title }}</h1>
        <h2>Présentation</h2>
        <PresentationPrint :input="projectData" />
        <h2>Interventions</h2>
        <InterventionPrint :input="frontmatter.interventions" />
        <h2>Description</h2>
        <Content />
      </div>
    </section>

    <PhotoPrint :input="cards" />
  </main>
</template>
