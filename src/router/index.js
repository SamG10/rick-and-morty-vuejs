import { useAuthStore } from '@/stores/auth'
import AuthViewVue from '@/views/AuthView.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      component: AuthViewVue
    },
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/HomeView.vue')
    },
    {
      path: '/characters',
      name: 'characters',
      component: () => import('@/views/CharactersView.vue')
    },
    {
      path: '/characters/:id',
      name: 'charactersDetails',
      props: true,
      component: () => import('@/views/CharactersDetailsView.vue')
    }
  ]
})

router.beforeEach((to, from) => {
  const authStore = useAuthStore()
  if (authStore.isLoggedIn) {
    console.log('okok')
    return true
  } else if (to.fullPath.startsWith('/characters')) return '/login'
  return true
})

export default router
