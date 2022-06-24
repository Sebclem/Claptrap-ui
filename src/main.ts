import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import vuetify from "./plugins/vuetify";
import { loadFonts } from "./plugins/webfontloader";
import { createPinia } from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";
import axios from "axios";

loadFonts();
const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL;

createApp(App).use(router).use(vuetify).use(pinia).mount("#app");
