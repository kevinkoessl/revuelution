<template>
  <section
    :class="type"
    class="light-blub-section hero is-fullheight"
    ref="container"
    @mousemove="onMouseMove($event)"
    @mouseenter="onMouseEnter()"
    @mouseleave="dimLight()"
  >
    <div
      class="light-blub-section__light"
      :class="type === 'is-light' ? 'is-dark' : 'is-light'"
      :style="lightStyle"
    ></div>
    <slot></slot>
  </section>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "LightBulbSection",
  props: {
    type: {
      required: false,
      default: "is-light",
    },
    hasLight: {
      required: false,
      default: true,
    },
  },

  data() {
    return {
      lightScale: 1,
      lightOpacity: 0,
      lightPosition: {
        x: 0,
        y: 0,
      },
      containerPosition: {
        x: 0,
        y: 0,
      },
    };
  },
  computed: {
    textClass() {
      return this.type.replace("is", "has-text");
    },
    lightStyle() {
      return {
        transform: `translate3d(${this.lightPosition.x}px, ${
          this.lightPosition.y - this.containerPosition.y
        }px, 0) scale(${this.lightScale})`,
        opacity: this.lightOpacity,
      };
    },
    contaienrRef() {
      return this.$refs.container as HTMLElement;
    },
  },
  methods: {
    onScroll() {
      let containerRect = this.contaienrRef.getBoundingClientRect();

      requestAnimationFrame(() => {
        this.containerPosition = {
          x: containerRect.x,
          y: containerRect.y,
        };
      });
    },

    onMouseEnter() {
      this.lightScale = 1;
      this.lightOpacity = 1;
    },

    onMouseMove(event: MouseEvent) {
      let containerRect = this.contaienrRef.getBoundingClientRect();

      requestAnimationFrame(() => {
        this.containerPosition = {
          x: containerRect.x,
          y: containerRect.y,
        };

        this.lightPosition = {
          x: event.clientX - 250,
          y: event.clientY - 250,
        };
      });
    },
    dimLight() {
      console.log("dim light");
      this.lightScale = 0.8;
      this.lightOpacity = 0;
    },
  },

  mounted() {
    window.addEventListener("mousemove", this.onMouseMove);
    window.addEventListener("scroll", this.onScroll);
  },
  beforeDestroy() {
    window.removeEventListener("mousemove", this.onMouseMove);
    window.removeEventListener("scroll", this.onScroll);
  },
});
</script>
<style lang="scss">
.light-blub-section {
  user-select: none;
  position: relative;
  overflow: visible;
  &__light {
    display: block;
    position: absolute;
    width: 500px;
    height: 500px;
    pointer-events: none;
    background: radial-gradient(
      #10b981,
      rgba(250, 255, 129, 0.3) 50%,
      rgba(250, 255, 129, 0) 51%
    );

    &.is-dark {
      background: radial-gradient(
        rgba(192, 38, 211, 0.9),
        rgba(96, 165, 250, 0.3) 50%,
        rgba(255, 255, 255, 0) 70%
      );
    }
    transition: all 3000ms cubic-bezier(0.1, 1.58, 0.19, 0.96);
  }
}
</style>
