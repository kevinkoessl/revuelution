<template>
  <div
    class="word-cluster"
    @mouseenter="scattered = true"
    @mouseleave="scattered = false"
  >
    <component
      v-for="(word, index) in words"
      :key="`word-cluster__word-${index}`"
      :is="typeof words === 'string' ? 'span' : 'p'"
      :style="positions[index]"
      class="word-cluster__word"
    >
      {{ word }}
      <span> </span>
    </component>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "LetterCluster",
  props: {
    words: [] || String,
  },
  data() {
    return {
      scattered: false,
    };
  },
  computed: {
    positions() {
      let words = this.words;
      if (typeof words === "string") {
        words = words.split("");
      }
      return words.map(() => {
        let rotate = 45 - Math.floor(Math.random() * 90);
        let translateX = 20 - Math.floor(Math.random() * 40);
        let translateY = 40 - Math.floor(Math.random() * 80);

        if (this.scattered)
          return {
            transform: `translate3d(${translateX}px, ${translateY}px, 0) rotate(${rotate}deg) `,
          };
      });
    },
  },
});
</script>
<style lang="scss">
.word-cluster {
  display: inline-block;

  &__word {
    display: inline-block;
    transition: all 1000ms cubic-bezier(0.31, 0.45, 0.19, 1);
    line-height: 9rem;
  }
}
</style>
