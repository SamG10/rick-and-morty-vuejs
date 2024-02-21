<script setup>
import { useAuthStore } from '@/stores/auth'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import NavbarComponent from '@/components/NavbarComponent.vue'

const newUser = ref({
  username: '',
  email: '',
  password: ''
})

const router = useRouter()
const authStore = useAuthStore()

const handleSubmit = () => {
  authStore.login(newUser.value.username, newUser.value.email, newUser.value.password)
  newUser.value.email = ''
  newUser.value.username = ''
  newUser.value.password = ''
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
        v-model="newUser.email"
      />
    </div>
    <div class="mb-3">
      <label for="username" class="form-label">Username</label>
      <input type="text" class="form-control" id="username" v-model="newUser.username" />
    </div>
    <div class="mb-3">
      <label for="password" class="form-label">Password</label>
      <input type="password" class="form-control" id="password" v-model="newUser.password" />
    </div>
    <button type="submit" class="btn btn-primary">Submit</button>
  </form>
</template>
<style scoped>
form {
  padding: 10px;
}
</style>
