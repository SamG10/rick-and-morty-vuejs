<script setup>
import NavbarComponent from '@/components/NavbarComponent.vue'
import { useAuthStore } from '@/stores/auth'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const user = ref({
  email: '',
  password: ''
})

const router = useRouter()
const authStore = useAuthStore()

const handleSubmit = () => {
  authStore.login(user.value.email, user.value.password)
  user.value.email = ''
  user.value.password = ''
  router.push('/')
}
</script>

<template>
  <NavbarComponent />
  <form @submit.prevent="handleSubmit">
    <div class="mb-3">
      <label for="email" class="form-label">Email</label>
      <input
        type="email"
        class="form-control"
        id="email"
        aria-describedby="emailHelp"
        v-model="user.email"
      />
    </div>
    <div class="mb-3">
      <label for="password" class="form-label">Password</label>
      <input type="password" class="form-control" id="password" v-model="user.password" />
    </div>
    <button type="submit" class="btn btn-primary">Login</button>
  </form>
</template>
<style scoped>
form {
  padding: 10px;
}
</style>
