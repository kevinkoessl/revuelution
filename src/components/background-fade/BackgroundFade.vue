<template>
  <div>
    <div :id="`start-trigger_${_uid}`"></div>
    <div :id="`r-background-fade_${_uid}`" :style="sectionStyle">
      <slot></slot>
    </div>
  </div>
</template>
<script lang="ts">
import gsap from "gsap";

let timelines: Record<string, ReturnType<typeof gsap.timeline>> = {};

export default {
  name: "RBackgroundFade.vue",

  props: {
    scrub: {
      default: true,
      required: false,
    },

    isActive: {
      type: Boolean,
      required: false,
      default: true,
    },

    scrollStart: {
      type: Number,
      required: false,
      default: -25,
    },

    scrollDistance: {
      type: Number,
      required: false,
      default: 200,
    },

    fromColor: {
      type: String,
      required: false,
      default: "#ffffff",
    },

    toColor: {
      type: String,
      required: false,
      default: "#000000",
    },

    ease: {
      type: String,
      required: false,
      default: "",
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
    window.addEventListener("resize", this.onResize);
    setTimeout(this.renderTimeline, 10);
  },

  computed: {
    sectionStyle() {
      return {
        paddingTop: `${this.scrollDistance * 1.5}px`,
      };
    },
    fromVars() {
      return {
        backgroundColor: this.fromColor,
      };
    },
    toVars() {
      return {
        backgroundColor: this.toColor,
        ease: this.ease,
      };
    },
  },

  watch: {
    animationVars: "renderTimeline",
    isActive: "renderTimeline",
  },

  methods: {
    renderTimeline() {
      let timeline = timelines[this._uid];

      if (typeof timeline?.kill === "function") {
        timeline.kill();
        delete timelines[this._uid];
      }

      if (!this.isActive) return;

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
        `#r-background-fade_${this._uid}`,
        this.fromVars,
        this.toVars
      );
      timelines[this._uid] = timeline;
    },
    onResize() {
      this.renderTimeline();
    },
  },
};
</script>
