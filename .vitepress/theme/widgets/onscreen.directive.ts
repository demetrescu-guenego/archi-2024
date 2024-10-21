import { Directive } from "vue";

export const vOnscreen: Directive<HTMLElement, string> = {
  mounted: (el, binding, vnode) => {
    console.log("binding: ", binding);
    const className = binding.value;
    let firstTime = true;

    const check = () => {
      const wh = window.innerHeight;
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

    window.document.addEventListener("touchmove", () => {
      check();
    });

    // for browsers
    window.document.addEventListener("scroll", () => {
      check();
    });
    check();
  },
};
