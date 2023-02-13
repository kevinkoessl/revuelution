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

export default {
  name: "RBackgroundFade.vue",

  props: {
    scrub: {
      default: true,
      required: false,
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
      _uid: Math.random().toString().replace(".", ""),
    };
  },

  mounted() {
    window.addEventListener("resize", this.onResize);

    this.renderTimeline();
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
  },

  methods: {
    renderTimeline() {
      let timeline = null;

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
    },
    onResize() {
      this.renderTimeline();
    },
  },
};
</script>
