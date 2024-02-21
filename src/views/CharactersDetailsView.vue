<script setup>
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'
import NavbarComponent from '@/components/NavbarComponent.vue'

const route = useRoute()

const responseApi = ref({
  character: {},
  errors: null
})

const fetchOneCharacter = () => {
  axios
    .get('https://rickandmortyapi.com/api/character/' + route.params.id)
    .then((res) => {
      responseApi.value.character = res.data
    })
    .catch((error) => {
      console.log(error)
      responseApi.value.errors = error.message
    })
}

onMounted(() => {
  fetchOneCharacter()
})
</script>
<template>
  <NavbarComponent />
  <div v-if="responseApi.errors">We have encounters errors : {{ responseApi.errors }}</div>

  <h1 class="d-flex justify-content-center mb-5">Character: {{ responseApi.character?.name }}</h1>

  <div class="d-flex justify-content-center mb-3">
    <img :src="responseApi.character.image" alt="" />
  </div>
  <div class="d-flex justify-content-center flex-column align-items-center">
    <p>Gender : {{ responseApi.character?.gender }}</p>
    <p>Species : {{ responseApi.character?.species }}</p>
    <p>Episodes : {{ responseApi.character?.episode?.length }}</p>
    <p>Origin : {{ responseApi.character?.origin?.name }}</p>
    <p>Location : {{ responseApi.character?.location?.name }}</p>
  </div>
</template>
<style scoped></style>
