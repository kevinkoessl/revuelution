<!--script setup lang="ts">
import { ref, computed, onMounted, watch } from "vue";

import gsap from "gsap";

interface Props {
  scrub?: boolean | number;
  scrollStart?: number;
  scrollDistance?: number;
  direction?: string;
  ease?: string;
  opacity?: number;
  hasMarkers?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  scrub: 1,
  scrollStart: 70,
  scrollDistance: 200,
  direction: "bottom-to-top",
  ease: "",
  opacity: 0,
  hasMarkers: false,
});

const _uid = ref("sdolfjosijfeg");

const xDistance = computed(() => {
  if (props.direction.trim() === "right-to-left") return "100px";
  if (props.direction.trim() === "left-to-right") return "-100px";

  return 0;
});

const yDistance = computed(() => {
  if (props.direction.trim() === "bottom-to-top") return "100%";
  if (props.direction.trim() === "top-to-bottom") return "-100%";

  return 0;
});

const animationVars = computed(() => {
  return {
    x: xDistance.value,
    y: yDistance.value,
    opacity: props.opacity,
    ease: props.ease,
  };
});

function renderTimeline() {
  console.log("renderTimeline");

  const timeline = gsap.timeline({
    /** 
    scrollTrigger: {
      trigger: `#start-trigger_${_uid.value}`,
      start: `top ${props.scrollStart}%`,
      end: `+=${props.scrollDistance}px`,
      scrub: props.scrub,
      markers: props.hasMarkers && {
        startColor: "black",
        endColor: "#70bed1",
        fontSize: "20px",
      },
    },
    */
  });

  timeline.clear();
  timeline.from(`#kk-slide-in_${_uid.value}`, animationVars);
}

function onResize() {
  renderTimeline();
}

onMounted(() => {
  window.addEventListener("resize", onResize);
  renderTimeline();
});

watch(animationVars, () => {
  renderTimeline();
});
</script-->
<template>
  <div>
    <div :id="`start-trigger_${_uid}`"></div>
    <div :id="`r-slide-in_${_uid}`">
      <slot>SlideIn</slot>
    </div>
    <div :id="`end-trigger_${_uid}`"></div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import gsap from "gsap";

export default defineComponent({
  name: "RSlideIn",

  props: {
    scrub: {
      default: 1,
      required: false,
    },

    scrollStart: {
      type: Number,
      required: false,
      default: 70,
    },

    scrollDistance: {
      type: Number,
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
      _uid: Math.random().toString().replace(".", ""),
    };
  },

  mounted() {
    window.addEventListener("resize", this.onResize);

    this.renderTimeline();
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
