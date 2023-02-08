import { createApp } from "vue";
import App from "./App.vue";
import Revuelution from "./preset";

import "./assets/main.css";

const app = createApp(App);

app.use(Revuelution);

app.mount("#app");
