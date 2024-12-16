<script setup lang="ts">
import { computed, onMounted, reactive, ref, useTemplateRef } from "vue";
import { Point, Vector } from "../../interfaces/Point";
import { CardContent } from "../../interfaces/CardContent";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { loadImage } from "../utils/loadImage";

const props = defineProps<{
  cards: CardContent[];
  index: number;
}>();

const emit = defineEmits<{
  (e: "close"): void;
}>();

const currentIndex = ref(props.index);

const frame = useTemplateRef("frame");
const img = useTemplateRef("img");

const width = ref(0);
const height = ref(0);

const scale = ref(1);
const initScale = ref(1);
const tr = reactive<Point>({ x: 0, y: 0 });
const style = computed(
  () =>
    `transform: ` +
    `translate(${tr.x}px, ${tr.y}px) ` +
    `scale(${scale.value}) `,
);

const render = async () => {
  console.log("start render");
  if (frame.value === null) {
    return;
  }

  if (img.value === null) {
    return;
  }

  tr.x = 0;
  tr.y = 0;

  const image = await loadImage(props.cards[currentIndex.value].imageUrl);
  width.value = image.width;
  height.value = image.height;

  console.log("width.value: ", width.value);
  console.log("height.value: ", height.value);

  const ratio = width.value / height.value;
  console.log("ratio: ", ratio);

  const frameWidth = frame.value.clientWidth;
  const frameHeight = frame.value.clientHeight;

  console.log("frameWidth: ", frameWidth);
  console.log("frameHeight: ", frameHeight);
  const frameRatio = frameWidth / frameHeight;
  console.log("frameRatio: ", frameRatio);

  if (ratio < frameRatio) {
    console.log("portrait");
    initScale.value = frameHeight / height.value;
  } else {
    console.log("paysage");
    initScale.value = frameWidth / width.value;
  }
  console.log("initScale.value: ", initScale.value);

  scale.value = initScale.value;

  initEvent();

  console.log("finish render");
};

let alreadyDone = false;

const initEvent = () => {
  if (alreadyDone) {
    return;
  }
  alreadyDone = true;
  if (frame.value === null) {
    return;
  }

  if (img.value === null) {
    return;
  }

  const start: Point = { x: 0, y: 0 };

  img.value.addEventListener("mousedown", (event: MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();

    start.x = event.clientX - tr.x;
    start.y = event.clientY - tr.y;

    const mousemove = (event: MouseEvent) => {
      event.preventDefault();
      event.stopPropagation();
      tr.x = event.clientX - start.x;
      tr.y = event.clientY - start.y;
    };

    const mouseup = (event: MouseEvent) => {
      event.preventDefault();
      event.stopPropagation();
      document.removeEventListener("mousemove", mousemove);
      document.removeEventListener("mouseup", mouseup);
    };

    document.addEventListener("mousemove", mousemove);
    document.addEventListener("mouseup", mouseup);
  });

  img.value.addEventListener("wheel", (event) => {
    event.preventDefault();
    event.stopPropagation();
    if (img.value === null) {
      return;
    }

    const zoomIn = event.deltaY < 0;

    if (scale.value < 0.1 * initScale.value && !zoomIn) {
      return;
    }

    const zf = 1.5; // zoom factor
    const zoom = zoomIn ? zf : 1 / zf;
    console.log("zoom: ", zoom);

    const rect = img.value.getBoundingClientRect();

    const center: Point = {
      x: rect.x + rect.width / 2,
      y: rect.y + rect.height / 2,
    };

    const ptc: Vector = {
      x: center.x - event.clientX,
      y: center.y - event.clientY,
    };

    const ctnc: Vector = {
      x: ptc.x * (zoom - 1),
      y: ptc.y * (zoom - 1),
    };

    const newTrx = tr.x + ctnc.x;
    const newTry = tr.y + ctnc.y;

    scale.value *= zoom;
    tr.x = newTrx;
    tr.y = newTry;
  });

  frame.value.addEventListener("dblclick", (event) => {
    event.preventDefault();
    event.stopPropagation();
    scale.value = initScale.value;
    tr.x = 0;
    tr.y = 0;
  });
};

onMounted(() => {
  if (!("window" in globalThis)) {
    return;
  }
  if (img.value === null) {
    return;
  }

  img.value.addEventListener("load", () => {
    (async () => {
      await render();
    })();
  });
});

const handleClose = () => {
  emit("close");
};

const handleNext = async () => {
  if (currentIndex.value < props.cards.length - 1) {
    currentIndex.value++;
    await render();
  }
};

const handlePrevious = async () => {
  if (currentIndex.value > 0) {
    currentIndex.value--;
    await render();
  }
};
</script>

<template>
  <div class="fixed bottom-0 left-0 right-0 top-0 flex cursor-pointer bg-black">
    <div class="fixed right-1 top-1" @click="handleClose">
      <FontAwesomeIcon :icon="faTimes" class="text-white" size="2x" />
    </div>
    <div
      class="fixed left-4 top-1/2"
      @click="handlePrevious"
      v-show="currentIndex > 0"
    >
      <FontAwesomeIcon :icon="faChevronLeft" class="text-white" size="2x" />
    </div>
    <div
      class="fixed right-4 top-1/2"
      @click="handleNext"
      v-show="currentIndex < cards.length - 1"
    >
      <FontAwesomeIcon :icon="faChevronRight" class="text-white" size="2x" />
    </div>
    <div
      ref="frame"
      class="flex flex-grow select-none items-center justify-center overflow-hidden"
    >
      <img
        :src="cards[currentIndex].imageUrl"
        :width
        :height
        class="animate-[fadein_300ms_ease-in] cursor-move"
        :style="style"
        ref="img"
        @click.stop
      />
    </div>
  </div>
</template>
