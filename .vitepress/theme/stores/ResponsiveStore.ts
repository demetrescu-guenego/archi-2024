import { computed, ref } from "vue";

export type ResponsiveMode = "mobile" | "desktop";

const isLarge = () => {
  if (!("window" in globalThis)) {
    return true;
  }
  return globalThis.window.innerWidth > 768;
};

const getMode = (): ResponsiveMode => {
  let result: ResponsiveMode = "mobile";
  if (isLarge()) {
    result = "desktop";
  }
  return result;
};

const mode = ref<ResponsiveMode>(getMode());

const init = () => {
  if (!("window" in globalThis)) {
    return;
  }
  globalThis.window.addEventListener("resize", () => {
    mode.value = getMode();
  });
};

init();

export const isMobile = computed(() => mode.value === "mobile");
export const isDesktop = computed(() => mode.value === "desktop");
