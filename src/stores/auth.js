import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

export const useAuthStore = defineStore('auth', () => {
  const user = ref(null)

  const isLoggedIn = computed(() => !!user.value)

  function login(username, email, password) {
    user.value = { username, email, password }
    localStorage.setItem('user', JSON.stringify(user.value))
  }

  function logout() {
    localStorage.removeItem('user')
    user.value = null
  }

  return { user, isLoggedIn, login, logout }
})
