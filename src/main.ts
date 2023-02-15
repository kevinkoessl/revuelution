import { createApp } from "vue";
import App from "./App.vue";
import Revuelution from "./preset";

import VueHighlightJS from "vue3-highlightjs";
import "highlight.js/styles/github.css";

import "./assets/main.css";

const app = createApp(App);

app.use(Revuelution);
app.use(VueHighlightJS);

app.mount("#app");
