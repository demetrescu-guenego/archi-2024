<script setup lang="ts">
import { computed, onMounted, reactive, ref, useTemplateRef } from "vue";
import { Point, Vector } from "../../interfaces/Point";

defineProps<{
  src: string;
}>();

const frame = useTemplateRef("frame");
const img = useTemplateRef("img");

const scale = ref(1);
const initScale = ref(1);
const tr = reactive<Point>({ x: 0, y: 0 });
const style = computed(
  () =>
    `transform: ` +
    `translate(${tr.x}px, ${tr.y}px) ` +
    `scale(${scale.value}) `,
);

const render = () => {
  if (frame.value === null) {
    return;
  }

  if (img.value === null) {
    return;
  }

  const width = img.value.width;
  const height = img.value.height;

  const ratio = width / height;

  const frameWidth = frame.value.clientWidth;
  const frameHeight = frame.value.clientHeight;

  const frameRatio = frameWidth / frameHeight;

  if (ratio < frameRatio) {
    console.log("portrait");
    console.log("height: ", height);
    console.log("frameHeight: ", frameHeight);

    initScale.value = frameHeight / height;
  } else {
    console.log("paysage");

    initScale.value = frameWidth / width;
  }
  console.log("initScale.value: ", initScale.value);

  scale.value = initScale.value;

  const start: Point = { x: 0, y: 0 };

  img.value.addEventListener("mousedown", (event: MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();

    start.x = event.pageX - tr.x;
    start.y = event.pageY - tr.y;

    const mousemove = (event: MouseEvent) => {
      event.preventDefault();
      event.stopPropagation();
      tr.x = event.pageX - start.x;
      tr.y = event.pageY - start.y;
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
    if (img.value === null) {
      return;
    }

    const zoomIn = event.deltaY < 0;

    if (scale.value < 0.1 * initScale.value && !zoomIn) {
      return;
    }

    const zf = 1.5; // zoom factor
    const zoom = zoomIn ? zf : 1 / zf;
    const newScaleValue = zoom * scale.value;

    const rect = img.value.getBoundingClientRect();

    const center: Point = {
      x: rect.x + rect.width / 2,
      y: rect.y + rect.height / 2,
    };

    const ptc: Vector = {
      x: center.x - event.pageX,
      y: center.y - event.pageY,
    };

    const ctnc: Vector = {
      x: ptc.x * (zoom - 1),
      y: ptc.y * (zoom - 1),
    };

    const newTrx = tr.x + ctnc.x;
    const newTry = tr.y + ctnc.y;

    scale.value = newScaleValue;
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
    render();
  });
});
</script>

<template>
  <div class="flex">
    <div
      ref="frame"
      class="flex flex-grow select-none items-center justify-center overflow-hidden"
    >
      <img
        :src="src"
        class="animate-[fadein_300ms_ease-in] cursor-move"
        :style="style"
        ref="img"
        @click.stop
      />
    </div>
  </div>
</template>
