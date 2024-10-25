<script setup lang="ts">
import { computed, onMounted, reactive, ref, useTemplateRef } from "vue";
import { Point } from "../../interfaces/Point";

const props = defineProps<{
  src: string;
}>();

const frame = useTemplateRef("frame");
const img = useTemplateRef("img");

const zoom = ref(1);
const tr = reactive<Point>({ x: 0, y: 0 });
const style = computed(
  () =>
    `transform: ` + `scale(${zoom.value}) ` + `translate(${tr.x}px, ${tr.y}px)`,
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
    console.log("portrait");
    zoom.value = frameHeight / height;
  } else {
    console.log("paysage");
    zoom.value = frameWidth / width;
  }
  console.log("zoom: ", zoom.value);

  const start: Point = { x: 0, y: 0 };

  img.value.addEventListener("mousedown", (event: MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    console.log("mouse down");
    console.log("zoom: ", zoom.value);

    console.log("event.pageX: ", event.pageX);
    start.x = event.pageX - tr.x;
    start.y = event.pageY - tr.y;

    const mousemove = (event: MouseEvent) => {
      event.preventDefault();
      event.stopPropagation();
      console.log("mousemove");
      console.log("zoom: ", zoom.value);

      tr.x = event.pageX - start.x;
      console.log("tr.x: ", tr.x);
      tr.y = event.pageY - start.y;
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

  //   const handleMouseMove = () => {
  //     console.log("mouse move");
  //   };
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
