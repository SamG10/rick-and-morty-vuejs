<script setup>
import { onMounted } from 'vue'
import NavbarComponent from '@/components/NavbarComponent.vue'
import { useFetchApiStore } from '@/stores'

const { fetchOneCharacter, responseApiOneCharacter } = useFetchApiStore()

onMounted(() => {
  fetchOneCharacter()
})
</script>
<template>
  <NavbarComponent />
  <div v-if="responseApiOneCharacter.error">
    An error occured : {{ responseApiOneCharacter.error }}
  </div>

  <h1 class="d-flex justify-content-center mb-5">
    Character: {{ responseApiOneCharacter.character.name }}
  </h1>

  <div class="d-flex justify-content-center mb-3">
    <img :src="responseApiOneCharacter.character.image" alt="" />
  </div>
  <div class="d-flex justify-content-center flex-column align-items-center">
    <p>Gender : {{ responseApiOneCharacter.character?.gender }}</p>
    <p>Species : {{ responseApiOneCharacter.character?.species }}</p>
    <p>Episodes : {{ responseApiOneCharacter.character?.episode?.length }}</p>
    <p>Origin : {{ responseApiOneCharacter.character?.origin?.name }}</p>
    <p>Location : {{ responseApiOneCharacter.character?.location?.name }}</p>
  </div>
</template>
<style scoped></style>
