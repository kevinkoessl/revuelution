<template>
  <span v-if="!selector">
    <span :id="`start-trigger_${_uid}`"></span>
    <span class="r-underline">
      <span style="overflow: hidden" class="r-underline__segment"
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
  <div v-else></div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import gsap from "gsap";

interface Process {
  server: any;
}

let process: Process | undefined;

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
    renderTimeline() {
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
      timeline.fromTo(`#r-underline_${this._uid}`, this.fromVars, this.toVars);
    },
    onResize() {
      this.renderTimeline();
    },
  },
});
</script>
<style lang="scss" scoped>
.r-underline__segment {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 0.1em;
}

.r-underline {
  position: relative;
}

.r-underline__content {
  position: relative;
  width: 100%;
}
</style>
