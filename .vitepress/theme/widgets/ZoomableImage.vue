<script setup lang="ts">
import { computed, onMounted, reactive, ref, useTemplateRef } from "vue";
import { Point } from "../../interfaces/Point";

const props = defineProps<{
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
    `scale(${scale.value}) ` +
    `translate(${tr.x}px, ${tr.y}px)`,
);

const render = (width: number, height: number) => {
  if (frame.value === null) {
    return;
  }

  if (img.value === null) {
    return;
  }

  const ratio = width / height;

  const frameWidth = frame.value.clientWidth;
  const frameHeight = frame.value.clientHeight;

  const frameRatio = frameWidth / frameHeight;

  if (ratio < frameRatio) {
    console.log("paysage");
    if (frameHeight > height) {
      initScale.value = frameHeight / height;
    }
  } else {
    console.log("portrait");
    if (frameWidth > width) {
      initScale.value = frameWidth / width;
    }
  }
  console.log("zoom: ", initScale.value);
  scale.value = initScale.value;

  const start: Point = { x: 0, y: 0 };

  img.value.addEventListener("mousedown", (event: MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    console.log("mouse down");
    console.log("zoom: ", scale.value);

    console.log("event.pageX: ", event.pageX);

    const f = 1 / scale.value;
    start.x = event.pageX * f - tr.x;
    start.y = event.pageY * f - tr.y;

    const mousemove = (event: MouseEvent) => {
      event.preventDefault();
      event.stopPropagation();
      console.log("mousemove");
      console.log("zoom: ", scale.value);

      tr.x = event.pageX * f - start.x;
      console.log("tr.x: ", tr.x);
      tr.y = event.pageY * f - start.y;
    };

    const mouseup = (event: MouseEvent) => {
      event.preventDefault();
      event.stopPropagation();
      console.log("mouse up");
      document.removeEventListener("mousemove", mousemove);
      document.removeEventListener("mouseup", mouseup);
    };

    document.addEventListener("mousemove", mousemove);
    document.addEventListener("mouseup", mouseup);
  });

  frame.value.addEventListener("wheel", (event) => {
    console.log("event: ", event);
    console.log("event: ", event.deltaY);
    const zoomIn = event.deltaY < 0;
    // compute the scale factor
    const zoomFactor = 1.5;
    scale.value *= zoomIn ? zoomFactor : 1 / zoomFactor;

    scale.value = Math.max(scale.value, 0.1 * initScale.value);

    const delta = { x: 0, y: 0 };

    tr.x = tr.x - delta.x;
    tr.y = tr.y - delta.y;
  });
};

onMounted(() => {
  if (!("window" in globalThis)) {
    return;
  }

  const modelImg = document.createElement("img");
  modelImg.src = props.src;
  modelImg.addEventListener("load", () => {
    render(modelImg.width, modelImg.height);
  });
});
</script>

<template>
  <div class="flex">
    <div
      ref="frame"
      class="flex flex-grow items-center justify-center overflow-hidden"
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
