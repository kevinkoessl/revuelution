<template>
  <div>
    <div :id="`start-trigger_${_uid}`"></div>
    <div :id="`r-slide-in_${_uid}`">
      <slot></slot>
    </div>
    <div :id="`end-trigger_${_uid}`"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import gsap from "gsap";

interface Process {
  server: any;
}

let process: Process | undefined;

export default defineComponent({
  name: "RSlideIn",

  props: {
    scrub: {
      default: 1,
      required: false,
    },

    scrollStart: {
      type: [Number, String],
      required: false,
      default: 70,
    },

    scrollDistance: {
      type: [Number, String],
      required: false,
      default: 200,
    },

    direction: {
      type: String,
      required: false,
      default: "bottom-to-top",
    },

    ease: {
      type: String,
      required: false,
      default: "",
    },

    opacity: {
      type: Number,
      required: false,
      default: 0,
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

  created() {
    if (typeof process !== "undefined") {
      if (process.server) this._uid = Math.random().toString().replace(".", "");
    } else {
      this._uid = Math.random().toString().replace(".", "");
    }
  },

  mounted() {
    this._uid = Math.random().toString().replace(".", "");
    window.addEventListener("resize", this.onResize);
    setTimeout(this.renderTimeline, 10);
  },
  computed: {
    xDistance() {
      if (this.direction.trim() === "right-to-left") return "100px";
      if (this.direction.trim() === "left-to-right") return "-100px";

      return 0;
    },

    yDistance() {
      if (this.direction.trim() === "bottom-to-top") return "100%";
      if (this.direction.trim() === "top-to-bottom") return "-100%";

      return 0;
    },

    animationVars() {
      return {
        x: this.xDistance,
        y: this.yDistance,
        opacity: this.opacity,
        ease: this.ease,
      };
    },
  },

  watch: {
    animationVars: "renderTimeline",
  },

  methods: {
    renderTimeline() {
      this.timeline = null;

      const timeline = gsap.timeline({
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
      timeline.from(`#r-slide-in_${this._uid}`, this.animationVars);
    },
    onResize() {
      this.renderTimeline();
    },
  },
});
</script>
