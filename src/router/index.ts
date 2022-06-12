import { logout } from "@/services/authService";
import { getMutualGuilds } from "@/services/guildService";
import { useMutualGuildsStore } from "@/stores/mutualGuilds";
import { useUserStore } from "@/stores/user";
import GuildHomeViewVue from "@/views/GuildHomeView.vue";
import OauthCallbackViewVue from "@/views/oauth/OauthCallbackView.vue";
import OauthRedirectViewVue from "@/views/oauth/OauthRedirectView.vue";
import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

declare module "vue-router" {
  interface RouteMeta {
    requiresAuth: boolean;
    title: string;
  }
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
      meta: {
        requiresAuth: false,
        title: "Home",
      },
    },
    {
      path: "/guild/:guildId",
      name: "guildHome",
      component: GuildHomeViewVue,
      meta: {
        requiresAuth: true,
        title: "Home",
      },
    },
    {
      path: "/oauth2/callback",
      name: "oauth-callback",
      component: OauthCallbackViewVue,
      meta: {
        requiresAuth: false,
        title: "Login",
      },
    },
    {
      path: "/oauth2/redirect",
      name: "oauth-redirect",
      component: OauthRedirectViewVue,
      meta: {
        requiresAuth: false,
        title: "Login",
      },
    },
  ],
});

router.beforeEach((to, from) => {
  const store = useUserStore();
  document.title = `${import.meta.env.VITE_APP_TITLE} -  ${to.meta.title}`;
  if (to.meta.requiresAuth && !store.isLoggedIn) {
    return { name: "oauth-redirect" };
  } else {
    const mutualGuildsStore = useMutualGuildsStore();
    if (store.isLoggedIn) {
      getMutualGuilds()
        .then((value) => {
          mutualGuildsStore.guilds = value;
          mutualGuildsStore.loaded = true;
        })
        .catch((reason) => {
          if (reason?.response.status == 401) {
            console.log("401, Login expired, logout...");
            logout(true, false);
            router.push({ name: "home" });
          }
        });
    }
  }
});

export default router;
