# revuelution

Animated UI components for Vue.js based on gsap.

## Documentation

The documentation is in the docs directory, it serves as the demo as well.

Browse [online documentation here](https://revuelution.com/).

## Quick start

You need [Vue.js] **version 3+** or **Nuxt 3**.

### 1 Install via npm

```bash
npm install revuelution --save
```

### 2 Import and use Revuelution

Bundle

```javascript
import { createApp } from "vue";
import App from "./App.vue";

import Revuelution from "revuelution";
import "revuelution/styles.css";

const app = createApp(App);

app.use(Revuelution);

app.mount("#app");
```

or Individual Components

```vue
<script setup>
import { RUnderline } from "revuelution";
import { RSlideIn } from "revuelution";
</script>

<template>
  <r-slide-in>
    <r-underline>Hello World!</r-underline>
  </r-slide-in>
</template>
```

## SSR

If you are using Nuxt 3, you need to take some additional steps.

### 1 Install @css-render/vue3-ssr package

```bash
npm install @css-render/vue3-ssr --save
```

### 2 Add Revuelution plugin

In your _/plugins_ folder create a file _revuelution.plugin.js_.

Paste this Nuxt Plugin configuration into the file you just created:

```javascript
import { setup } from "@css-render/vue3-ssr";
import { defineNuxtPlugin } from "#app";

export default defineNuxtPlugin((nuxtApp) => {
  if (process.server) {
    const { collect } = setup(nuxtApp.vueApp);
    const originalRenderMeta = nuxtApp.ssrContext?.renderMeta;
    nuxtApp.ssrContext = nuxtApp.ssrContext || {};
    nuxtApp.ssrContext.renderMeta = () => {
      if (!originalRenderMeta) {
        return {
          headTags: collect(),
        };
      }
      const originalMeta = originalRenderMeta();
      if ("then" in originalMeta) {
        return originalMeta.then((resolvedOriginalMeta) => {
          return {
            ...resolvedOriginalMeta,
            headTags: resolvedOriginalMeta["headTags"] + collect(),
          };
        });
      } else {
        return {
          ...originalMeta,
          headTags: originalMeta["headTags"] + collect(),
        };
      }
    };
  }
});
```

### 3 Add styling

In your _nuxt.config.js_ or _nux.config.ts_ add the following line:

```javascript
export default defineNuxtConfig({
  ...
  css: ["revuelution/styles.css"],
  ...
});

```

Now you should be good to go!

## Current status

Right now Revuelution is just a side project that is meant to test some things out.
Future developments and maintenance are unknown.
