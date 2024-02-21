<script setup>
import { onMounted, ref, watch } from 'vue'
import NavbarComponent from '@/components/NavbarComponent.vue'
import { useFetchApiStore } from '@/stores'

const { fetchAllCharacters, fetchCharactersByName, responseApi, fetchCharactersByFilters } =
  useFetchApiStore()

const currentPage = ref(1)
const inputName = ref('')
const filters = ref({
  gender: '',
  type: '',
  species: '',
  status: ''
})

function onPageChange() {
  fetchAllCharacters(currentPage.value)
}

const onSubmit = () => {
  fetchCharactersByName(inputName.value)
}

onMounted(() => {
  fetchAllCharacters()
})

watch(
  filters,
  (newF) => {
    console.log('newF', newF)
    fetchCharactersByFilters(newF)
  },
  { deep: true }
)
</script>

<template>
  <NavbarComponent />

  <div class="d-flex justify-content-center align-items-center">
    <h1 class="p-2">All Characters</h1>
    <p>({{ responseApi.pagination.count }})</p>
  </div>

  <div class="d-flex justify-content-center">
    <div v-if="responseApi.loading" class="spinner-border" role="status"></div>
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

  <div v-if="responseApi.error">
    An error occured :
    {{ responseApi.error }}
  </div>

  <div class="container d-flex justify-content-center">
    <form @submit.prevent="onSubmit">
      <div class="input-group input-group-md">
        <input
          type="text"
          class="form-control"
          aria-label="Sizing example input"
          aria-describedby="inputGroup-sizing-lg"
          v-model="inputName"
          placeholder="Search by name"
        />
        <button type="submit" class="btn btn-info">Search</button>
      </div>
    </form>
  </div>

  <div class="d-flex justify-content-center p-2">
    <select
      class="form-select form-select-sm"
      aria-label="Small select example"
      v-model="filters.gender"
    >
      <option selected>Gender</option>
      <option value="female">Female</option>
      <option value="male">Male</option>
      <option value="unknown">Unknown</option>
    </select>
    <select
      class="form-select form-select-sm"
      aria-label="Small select example"
      v-model="filters.type"
    >
      <option selected>Type</option>
      <option value="parasite">Parasite</option>
      <option value="cromulon">Cromulon</option>
      <option value="dog">Dog</option>
    </select>
    <select
      class="form-select form-select-sm"
      aria-label="Small select example"
      v-model="filters.species"
    >
      <option selected>Species</option>
      <option value="human">Human</option>
      <option value="alien">Alien</option>
      <option value="humanoid">Humanoid</option>
    </select>
    <select
      class="form-select form-select-sm"
      aria-label="Small select example"
      v-model="filters.status"
    >
      <option selected>Status</option>
      <option value="alive">Alive</option>
      <option value="dead">Dead</option>
      <option value="unknown">Unknown</option>
    </select>
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
