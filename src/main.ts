import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import vuetify from "./plugins/vuetify";
import { loadFonts } from "./plugins/webfontloader";
import { createPinia } from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";

loadFonts();
const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

createApp(App).use(router).use(vuetify).use(pinia).mount("#app");
