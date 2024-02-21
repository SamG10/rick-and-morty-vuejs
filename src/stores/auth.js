import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'

export const useAuthStore = defineStore('auth', () => {
  const localStorageUser = localStorage.getItem('user')

  console.log(JSON.parse(localStorageUser))

  const user = ref(JSON.parse(localStorageUser) || null)
  const router = useRouter()

  const isLoggedIn = computed(() => !!user.value)

  function register(username, email, password) {
    user.value = { username, email, password }
    localStorage.setItem('user', JSON.stringify(user.value))
  }

  function login(email, password) {
    if (localStorageUser) {
      const user = JSON.parse(localStorageUser)

      if (user?.email === email && user?.password === password) {
        router.push('/')
      } else throw new Error('Email or Password are wrong')
    } else throw new Error('User is not register')
  }

  function logout() {
    localStorage.removeItem('user')
    user.value = null
  }

  return { user, isLoggedIn, register, login, logout }
})
