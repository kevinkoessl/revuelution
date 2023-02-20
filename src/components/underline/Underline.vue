<template>
  <div v-if="selector" :id="`r-underline-container_${_uid}`">
    <slot></slot>
  </div>
  <span v-else>
    <span :id="`start-trigger_${_uid}`"></span>
    <span class="r-underline">
      <span style="overflow: hidden" class="r-underline__wrapper"
        ><span
          :id="`r-underline_${_uid}`"
          class="r-underline__segment"
          :style="lineStyle"
        ></span>
      </span>
      <span class="r-underline__content">
        <slot></slot>
      </span>
    </span>
  </span>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import gsap from "gsap";

let timeline: ReturnType<typeof gsap.timeline>;

export default defineComponent({
  name: "RUnderline",

  props: {
    selector: {
      type: String,
      required: false,
    },

    scrub: {
      required: false,
      default: 1,
    },

    scrollStart: {
      type: [Number, String],
      required: false,
      default: 50,
    },

    scrollDistance: {
      type: [Number, String],
      required: false,
      default: 100,
    },

    lineBackground: {
      type: String,
      required: false,
      default: "#000000",
    },

    ease: {
      type: String,
      required: false,
      default: "",
    },

    opacity: {
      type: [Number, String],
      required: false,
      default: 1,
    },

    hasMarkers: {
      type: Boolean,
      required: false,
      default: false,
    },
  },

  data() {
    return {
      timeline: null,
      _uid: "",
    };
  },

  mounted() {
    this._uid = Math.random().toString().replace(".", "");

    setTimeout(this.setupDom, 10);
    window.addEventListener("resize", this.onResize);
    setTimeout(this.renderTimeline, 20);
  },

  computed: {
    lineStyle() {
      return {
        background: this.lineBackground,
      };
    },
    toVars() {
      return {
        x: 0,
        opacity: 1,
        ease: this.ease,
      };
    },

    fromVars() {
      return {
        x: "-100%",
        opacity: this.opacity,
      };
    },
  },

  watch: {
    animationVars: "renderTimeline",
  },

  methods: {
    setupDom() {
      if (!this.selector) return;

      const parentDiv = document.querySelector(
        `#r-underline-container_${this._uid}`
      );

      if (!parentDiv) return;

      const elementsToAnimate = parentDiv?.querySelectorAll(this.selector);

      console.log("elems", elementsToAnimate);
      elementsToAnimate.forEach((element, key) => {
        const triggerNode = document.createElement("span");
        triggerNode.setAttribute("id", `start-trigger_${this._uid}_${key}`);
        element.parentNode.insertBefore(triggerNode, element);

        const lineNode = document.createElement("span");
        lineNode.classList.add("r-underline__wrapper");

        const lineBackground = document.createElement("span");

        lineBackground.setAttribute("id", `r-underline_${this._uid}_${key}`);
        lineBackground.classList.add("r-underline__segment");
        lineBackground.setAttribute(
          "style",
          `background: ${this.lineBackground}`
        );

        lineNode.appendChild(lineBackground);

        const contentNode = document.createElement("span");
        contentNode.classList.add("r-underline__content");
        contentNode.innerHTML = element.innerHTML;

        element.innerHTML = "";

        element.classList.add("r-underline");
        element.setAttribute(
          "style",
          `${element.getAttribute("style")}; white-space: nowrap;`
        );
        element.appendChild(lineNode);
        element.appendChild(contentNode);
      });
    },
    renderTimeline() {
      console.log(this.selector);
      if (!this.selector) {
        if (typeof timeline?.kill === "function") timeline.kill();
        timeline = gsap.timeline({
          scrollTrigger: {
            trigger: `#start-trigger_${this._uid}`,
            start: `top ${this.scrollStart}%`,
            end: `+=${this.scrollDistance}px`,
            scrub: this.scrub,
            markers: this.hasMarkers && {
              startColor: "black",
              endColor: "#70bed1",
              fontSize: "20px",
            },
          },
        });

        timeline.clear();
        timeline.fromTo(
          `#r-underline_${this._uid}`,
          this.fromVars,
          this.toVars
        );

        return;
      }

      timeline = gsap.timeline({
        scrollTrigger: {
          trigger: `#r-underline-container_${this._uid}`,
          start: `top ${this.scrollStart}%`,
          end: `+=${this.scrollDistance}px`,
          scrub: this.scrub,
          markers: this.hasMarkers && {
            startColor: "black",
            endColor: "#70bed1",
            fontSize: "20px",
          },
        },
      });

      console.log("Attaching scroll trigger to html");

      timeline.fromTo(
        `#r-underline-container_${this._uid} .r-underline__segment`,
        this.fromVars,
        this.toVars
      );
    },
    onResize() {
      this.renderTimeline();
    },
  },
});
</script>
<style lang="scss">
.r-underline__wrapper {
  overflow: hidden;
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 0.1em;
}

.r-underline__segment {
  display: block;
  width: 100%;
  height: 100%;
}

.r-underline {
  position: relative;
}

.r-underline__content {
  position: relative;
  width: 100%;
}
</style>
