import type { App } from "vue";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

import { RSlideIn } from "./components/slide-in";
import { RUnderline } from "./components/underline";
import { RBackgroundFade } from "./components/background-fade";

export * from "./components";

export default {
  install: (app: App) => {
    app.component("RSlideIn", RSlideIn);
    app.component("RUnderline", RUnderline);
    app.component("RBackgroundFade", RBackgroundFade);
  },
};
