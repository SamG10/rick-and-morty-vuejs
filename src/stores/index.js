import { defineStore } from 'pinia'
import { ref } from 'vue'
import axios from 'axios'
import { useRoute } from 'vue-router'

export const useFetchApiStore = defineStore('useFetchApiStore', () => {
  const route = useRoute()

  const responseApi = ref({
    pagination: {},
    characters: [],
    loading: false,
    error: null
  })

  const responseApiOneCharacter = ref({
    character: {},
    loading: false,
    error: null
  })

  // Add functions to fetch api
  async function fetchAllCharacters(page) {
    try {
      responseApi.value.loading = true
      const res = await axios.get(`https://rickandmortyapi.com/api/character?page=${page}`)

      responseApi.value.characters = res.data.results
      responseApi.value.pagination = res.data.info
    } catch (error) {
      console.log(error)
      responseApi.value.error = error.message
    } finally {
      responseApi.value.loading = false
    }
  }

  async function fetchCharactersByName(name) {
    if (name) {
      try {
        responseApi.value.loading = true
        const res = await axios.get(`https://rickandmortyapi.com/api/character?name=${name}`)
        console.log(res)

        responseApi.value.characters = res.data.results
      } catch (error) {
        console.log(error)
        responseApi.value.error = error.message
      } finally {
        responseApi.value.loading = false
      }
    }
  }

  async function fetchOneCharacter() {
    try {
      responseApiOneCharacter.value.loading = true

      const res = await axios.get('https://rickandmortyapi.com/api/character/' + route.params.id)
      responseApiOneCharacter.value.character = res.data
    } catch (error) {
      console.log(error)
      responseApiOneCharacter.value.error = error.message
    } finally {
      responseApiOneCharacter.value.loading = false
    }
  }

  async function fetchCharactersByFilters(filters) {
    console.log('filters in sotre', filters)
    try {
      responseApi.value.loading = true
      let url = 'https://rickandmortyapi.com/api/character'
      if (filters.type) {
        url += `?type=${filters.type}&`
      }
      if (filters.genre) {
        url += `?gender=${filters.gender}&`
      }
      if (filters.species) {
        url += `?species=${filters.species}&`
      }
      if (filters.status) {
        url += `?status=${filters.status}&`
      }

      console.log('url', url)
      const res = await axios.get(url)
      responseApi.value.characters = res.data.results
    } catch (error) {
      console.log(error)
      responseApi.value.error = error.message
    } finally {
      responseApi.value.loading = false
    }
  }

  return {
    fetchAllCharacters,
    fetchCharactersByName,
    responseApi,
    fetchOneCharacter,
    responseApiOneCharacter,
    fetchCharactersByFilters
  }
})
