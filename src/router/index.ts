import { useUserStore } from "@/stores/user";
import OauthCallbackViewVue from "@/views/oauth/OauthCallbackView.vue";
import OauthRedirectViewVue from "@/views/oauth/OauthRedirectView.vue";
import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

declare module "vue-router" {
  interface RouteMeta {
    requiresAuth: boolean;
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
        requiresAuth: true,
      },
    },
    {
      path: "/oauth2/callback",
      name: "oauth-callback",
      component: OauthCallbackViewVue,
      meta: {
        requiresAuth: false,
      },
    },
    {
      path: "/oauth2/redirect",
      name: "oauth-redirect",
      component: OauthRedirectViewVue,
      meta: {
        requiresAuth: false,
      },
    }
  ],
});

router.beforeEach((to, from) => {
  const store = useUserStore();
  if (to.meta.requiresAuth && !store.isLoggedIn) {
    (<any>window).location = import.meta.env.VITE_OAUTH_REDIRECT_URL;
    return false;
  }
});

export default router;
