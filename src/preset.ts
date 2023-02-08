import type { App } from "vue";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

import { RSlideIn } from "./components";

export default {
  install: (app: App) => {
    app.component("RSlideIn", RSlideIn);
  },
};
