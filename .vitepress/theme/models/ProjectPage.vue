<script setup lang="ts">
import { useData, useRoute } from "vitepress";
import { onMounted, onUnmounted, ref } from "vue";
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
const credit_photos = frontmatter.value.credit_photos;

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
const currentIndex = ref(-1);

const prefix = "#viewer-";

const handleView = (index: number) => {
  isShowingImage.value = true;
  currentIndex.value = index;
  const url = window.location.pathname + prefix + (index + 1);
  if (!window.location.hash) {
    history.pushState({}, "", url);
  } else {
    history.replaceState({}, "", url);
  }
};

const handleClose = () => {
  isShowingImage.value = false;
  currentIndex.value = -1;
  history.replaceState({}, "", window.location.pathname);
};

const getCurrentIndex = () => {
  const hash = window.location.hash;
  if (!hash.startsWith(prefix)) {
    return -1;
  }
  const index = parseInt(hash.substring(prefix.length));
  if (isNaN(index)) {
    return -1;
  }
  return index - 1;
};

const onBackEvent = (event) => {
  console.log("Back or forward button clicked!");
  console.log("Current URL:", window.location.href);
  console.log("State:", event.state);

  const index = getCurrentIndex();
  console.log("index: ", index);
  if (index !== -1) {
    handleView(index);
  } else {
    handleClose();
  }
};

onMounted(() => {
  console.log("mounted");
  const index = getCurrentIndex();
  console.log("index: ", index);
  if (index !== -1) {
    handleView(index);
  }

  window.addEventListener("popstate", onBackEvent);
});

onUnmounted(() => {
  window.removeEventListener("popstate", onBackEvent);
});
</script>

<template>
  <main class="flex flex-grow flex-col print:hidden">
    <section class="bg-white">
      <div class="mx-auto max-w-5xl px-2 pb-4">
        <h1>Réalisation : {{ frontmatter.title }}</h1>
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
        :alt="frontmatter.title"
      />
    </section>
    <section>
      <div class="project-description mx-auto max-w-5xl px-2 pb-4">
        <template v-if="cards.length > 0">
          <h2>Photos</h2>
          <div>
            <ProjectCards :input="cards" @view="handleView" />
          </div>
          <div v-if="credit_photos" class="text-sm text-neutral-400">
            Crédit: {{ credit_photos }}
          </div>
        </template>
        <h2>Description</h2>
        <div class="description">
          <Content />
        </div>
      </div>
    </section>
  </main>
  <ImageGallery
    v-if="isShowingImage"
    :cards="cards"
    :index="currentIndex"
    @close="handleClose()"
    @update="handleView"
  />
  <main
    class="hidden print:flex print:flex-grow print:flex-col print:justify-between"
  >
    <section>
      <div class="mx-auto max-w-5xl px-2 pb-4">
        <h1>Réalisation : {{ frontmatter.title }}</h1>
        <h2>Présentation</h2>
        <PresentationPrint :input="projectData" />
        <h2>Interventions</h2>
        <InterventionPrint :input="frontmatter.interventions" />
      </div>
    </section>

    <PhotoPrint :input="cards" />
  </main>
</template>
