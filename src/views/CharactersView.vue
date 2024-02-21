<script setup>
import { onMounted, ref } from 'vue'
import axios from 'axios'
import NavbarComponent from '@/components/NavbarComponent.vue'

const responseApi = ref({
  pagination: {},
  characters: [],
  errors: null
})

const name = ref(null)
const currentPage = ref(1)

async function fetchCharacterByName() {
  if (name.value) {
    await axios
      .get(`https://rickandmortyapi.com/api/character?name=${name.value}`)
      .then((res) => {
        responseApi.value.characters = res.data.results
      })
      .catch((error) => {
        console.log(error)
        responseApi.value.errors = error.message
      })
  }
}

function onPageChange() {
  fetchAllCharacters(currentPage.value)
}

function fetchAllCharacters(page) {
  axios
    .get(`https://rickandmortyapi.com/api/character?page=${page}`)
    .then((res) => {
      responseApi.value.characters = res.data.results
      responseApi.value.pagination = res.data.info
    })
    .catch((error) => {
      console.log(error)
      responseApi.value.errors = error.message
    })
}

onMounted(() => {
  fetchAllCharacters()
})
</script>

<template>
  <NavbarComponent />
  <div class="d-flex justify-content-center align-items-center">
    <h1 class="p-2">All Characters</h1>
    <p>({{ responseApi.pagination.count }})</p>
  </div>

  <!-- Pagination -->
  <div class="d-flex justify-content-center">
    <vue-awesome-paginate
      :total-items="responseApi.pagination.count"
      :items-per-page="20"
      :max-pages-shown="3"
      v-model="currentPage"
      :on-click="onPageChange"
    />
  </div>

  <div v-if="responseApi.errors">
    We encounters a problems to retrieve Rick & Morty Characters, the error is:
    {{ responseApi.errors }}
  </div>

  <div class="container d-flex justify-content-center">
    <form @submit.prevent="fetchCharacterByName">
      <div class="input-group input-group-md">
        <input
          type="text"
          class="form-control"
          aria-label="Sizing example input"
          aria-describedby="inputGroup-sizing-lg"
          v-model="name"
          placeholder="Search by name"
        />
        <button type="submit" class="btn btn-info">Search</button>
      </div>
    </form>
  </div>

  <div class="d-flex flex-wrap justify-content-center">
    <div class="p-1" v-for="character in responseApi.characters" :key="character.id">
      <div class="card" style="width: 18rem">
        <img :src="character.image" class="card-img-top" alt="character image" />
        <div class="card-body">
          <h5 class="card-title">{{ character.name }}</h5>
          <p class="card-text"></p>
          <RouterLink
            :to="{
              path: '/characters/:id',
              params: { id: character.id },
              name: 'charactersDetails'
            }"
            class="btn btn-outline-success btn-sm"
            >More informations</RouterLink
          >
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
p {
  margin: 0px;
}

.pagination-container {
  display: flex;
  column-gap: 10px;
}
.paginate-buttons {
  height: 40px;
  width: 40px;
  border-radius: 20px;
  cursor: pointer;
  background-color: rgb(242, 242, 242);
  border: 1px solid rgb(217, 217, 217);
  color: black;
}
.paginate-buttons:hover {
  background-color: #d8d8d8;
}
.active-page {
  background-color: #3498db;
  border: 1px solid #3498db;
  color: white;
}
.active-page:hover {
  background-color: #2988c8;
}
</style>
