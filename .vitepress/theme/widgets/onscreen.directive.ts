import { Directive } from "vue";

export const vOnscreen: Directive<HTMLElement, string> = {
  mounted: (el, binding) => {
    if (!("window" in globalThis)) {
      return;
    }
    const className = binding.value;
    let firstTime = true;

    const check = () => {
      const wh = globalThis.window.innerHeight;
      const rect = el.getBoundingClientRect();

      const isVisible = rect.bottom >= 0 && rect.top <= wh;

      if (isVisible) {
        el.classList.add(className);
        if (firstTime) {
          firstTime = false;
          el.classList.add("first-time");
        }
      } else {
        el.classList.remove(className);
        el.classList.remove("first-time");
      }
    };

    globalThis.window.document.addEventListener("touchmove", () => {
      check();
    });

    // for browsers
    globalThis.window.document.addEventListener("scroll", () => {
      check();
    });
    check();
  },
};
