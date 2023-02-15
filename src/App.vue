<script setup lang="ts">
import LightBulbSection from "./components/lightbulb-section/LightBulbSection.vue";
</script>

<template>
  <!-- Intro -->
  <light-bulb-section class="w-full bg-stone-900 font-artistic">
    <div class="w-full flex h-screen items-center justify-center">
      <div class="container text-center">
        <h1 class="text-3xl lg:text-9xl text-white leading-normal">
          REVUELUTION
        </h1>

        <h2 class="lg:text-3xl text-gray-300 font-thin mt-8">
          Animated UI-components for Vue3 based on gsap
        </h2>
      </div>
    </div>

    <!-- Installation -->
    <div class="w-full bg-stone-900 font-artistic">
      <div class="w-full flex h-screen">
        <div class="container lg:px-48">
          <r-slide-in direction="right-to-left" scroll-distance="800">
            <span class="text-4xl lg:text-9xl text-white">Animations</span>
          </r-slide-in>
          <div class="pl-12">
            <r-slide-in
              direction="left-to-right"
              scroll-start="70%"
              scroll-distance="500"
            >
              <span class="text-6xl lg:text-9xl text-white">just</span>
            </r-slide-in>
          </div>

          <div class="pl-48">
            <r-slide-in
              direction="right-to-left"
              scroll-start="80%"
              scroll-distance="400"
            >
              <span class="text-4xl lg:text-9xl text-white">got</span>
            </r-slide-in>
          </div>

          <div class="pl-32 lg:pl-48">
            <r-slide-in
              class="lg:pl-48"
              direction="right-to-left"
              scroll-start="80%"
              scroll-distance="200"
            >
              <span
                class="text-4xl lg:text-9xl text-white mb-8 leading-relaxed"
              >
                <r-underline
                  line-background="linear-gradient(90deg, #c084fc 30%, #f9a8d4 50%, #fb7185)"
                  scroll-start="50%"
                  >easy</r-underline
                >
              </span>
            </r-slide-in>
          </div>
        </div>
      </div>
    </div>

    <r-background-fade from-color="#1c1917" to-color="#fafafa" class="w-full">
      <div class="flex w-full justify-center">
        <div
          class="container items-center px-3 lg:px-24 py-48 mt-48 text-stone-900 leading-relaxed"
        >
          <div class="w-full flex h-96"></div>
          <div>
            <h2 class="text-3xl lg:text-5xl">Getting started</h2>
            <div class="py-9">
              <h3 class="text-2xl lg:text-4xl">
                <span class="text-fuchsia-600"># </span>1 NPM
              </h3>
              <div class="py-12">
                <h4 class="text-xl lg:text-3xl">Installation</h4>
                <pre
                  v-highlightjs
                ><code class="javascript bg-slate-100 lg:px-8 shadow-inner my-4 ">
  npm install revuelution --save
              </code></pre>
              </div>
              <div class="py-12">
                <h4 class="text-xl lg:text-3xl">Usage</h4>
                <div class="mt-4 bg-slate-600 p-4 text-xl text-white">
                  Full bundle
                </div>

                <pre
                  v-highlightjs
                ><code class="javascript bg-slate-100 lg:p-8 shadow-inner mb-4 ">
  import { createApp } from "vue"; 
  import App from "./App.vue";
  
  import Revuelution from "revuelution";
  import "revuelution/styles.css";

  const app = createApp(App);
  app.use(Revuelution);
                
  app.mount("#app");
              </code></pre>
                <h4 class="text-xl lg:text-3xl my-8">or</h4>
                <div class="mt-4 bg-slate-600 p-4 text-xl text-white">
                  Individual components
                </div>

                <pre
                  v-highlightjs
                ><code class="javascript bg-slate-100 lg:p-8 shadow-inner mb-4 ">
  &lt;script setup&gt;
    import { RBackgroundFade} from &quot;revuelution&quot;;
    import { RUnderline } from &quot;revuelution&quot;;
    import { RSlideIn } from &quot;revuelution&quot;;
  &lt;/script&gt;

  &lt;template&gt;
    &lt;r-background-fade from-color="#ffffff" to-color="#ffffff"&gt;
      &lt;h1&gt; Fades the background from white to black &lt;/h1&gt;
    &lt;/r-background-fade&gt;

    &lt;r-slide-in direction="left-to-right"&gt;
      Slides from left to right on scroll...
      &lt;r-underline line-background="#f0abfc" &gt;Animated underline with one color!&lt;/r-underline&gt;
    &lt;/r-slide-in&gt;

     &lt;r-underline line-background="linear-gradient(90deg, #c084fc 30%, #f9a8d4 50%, #fb7185 )"&gt;
        Animated underline with a beatuiful gradient!
      &lt;/r-underline&gt;
  &lt;/template&gt;
              </code></pre>
              </div>
            </div>
          </div>
        </div>
      </div>
    </r-background-fade>
  </light-bulb-section>
  <div>
    <div
      class="w-full flex h-24 items-center justify-center text-white font-artistic"
    >
      <a
        href="https://github.com/kevinkoessl/revuelution"
        class="text-cyan-200 mr-3"
        >GitHub</a
      >
      <a href="https://www.npmjs.com/package/revuelution" class="text-cyan-200"
        >NPM</a
      >
    </div>
    <div
      class="w-full flex h-20 items-center justify-center text-white font-artistic"
    >
      <span>© 2023 Revuelution</span>
    </div>
  </div>
</template>
