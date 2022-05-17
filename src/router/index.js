import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from '@/stores/user'
import HomeView from '../views/HomeView.vue'
import Callback from '../components/oauth/Callback.vue'
import Test from '../components/Test.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: { requiresAuth: false }
    },
    {
      path: '/oauth2/callback',
      name: 'oauth-callback',
      component: Callback,
      meta: { requiresAuth: false }
    },
    {
      path: '/test',
      name: 'test',
      component: Test,
      meta: { requiresAuth: true }
    }
  ]
})

router.beforeEach((to, from) =>{
  const store = useUserStore();
  if (to.meta.requiresAuth && !store.isLoggedIn) {
    // TODO Change this to env var ?
    window.location = 'https://discord.com/api/oauth2/authorize?client_id=238351507634913280&redirect_uri=http%3A%2F%2F10.23.0.31%3A3000%2Foauth2%2Fcallback&response_type=code&scope=identify'
  }
})

export default router
