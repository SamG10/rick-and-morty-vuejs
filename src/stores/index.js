import { defineStore } from 'pinia'
import { ref } from 'vue'
import axios from 'axios'

export const useSearchByNameStore = defineStore('searchByNameStore', () => {
  const keyword = ref('')

  const responseApi = ref({
    pagination: {},
    characters: [],
    errors: null
  })

  function searchByName() {
    axios
      .get(`https://rickandmortyapi.com/api/character?name=${keyword.value}`)
      .then((res) => {
        responseApi.value.characters = res.data.results
        responseApi.value.pagination = res.data.info
      })
      .catch((error) => {
        console.log(error)
        responseApi.value.errors = error.message
      })
  }

  return { searchByName }
})
