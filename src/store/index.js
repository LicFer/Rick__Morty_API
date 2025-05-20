import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    characters: [],
    allCharacters: [],
    character: {},
    loading: false,
    error: null
  },
  mutations: {

    SET_CHARACTERS(state, characters) {
      state.characters = characters
    },
    SET_ALL_CHARACTERS(state, characters){
        state.allCharacters = characters;
    },
    SET_CHARACTER(state, character) {
      state.character = character
    },
    SET_LOADING(state, loading) {
      state.loading = loading
    },
    SET_ERROR(state, error) {
      state.error = error
    }
  },
  actions: {
    async fetchCharacters({ commit }, searchTerm) {
      commit('SET_LOADING', true)
      commit('SET_ERROR', null)
      try {
        const response = await axios.get(`https://rickandmortyapi.com/api/character/?name=${searchTerm}`)
        commit('SET_CHARACTERS', response.data.results)
      } catch (error) {
        commit('SET_ERROR', 'No se encontraron personajes')
        commit('SET_CHARACTERS', [])
      } finally {
        commit('SET_LOADING', false)
      }
    },
    async fetchCharacterById({ commit }, id) {
      commit('SET_LOADING', true)
      commit('SET_ERROR', null)
      try {
        const response = await axios.get(`https://rickandmortyapi.com/api/character/${id}`)
        commit('SET_CHARACTER', response.data)
      } catch (error) {
        commit('SET_ERROR', 'No se pudo cargar el personaje')
      } finally {
        commit('SET_LOADING', false)
      }
    },
    async fetchAllCharacters({ commit }) {
        commit('SET_LOADING', true);
        commit('SET_ERROR', null);
        try {
          let allCharacters = [];
          let nextPage = 'https://rickandmortyapi.com/api/character';
          
          while (nextPage) {
            const response = await axios.get(nextPage);
            allCharacters = [...allCharacters, ...response.data.results];
            nextPage = response.data.info.next;
          }
          
          commit('SET_ALL_CHARACTERS', allCharacters);
        } catch (error) {
          commit('SET_ERROR', 'Error al cargar todos los personajes');
        } finally {
          commit('SET_LOADING', false);
        }
    }
  },
  getters: {
    characters: state => state.characters,
    allCharacters: state => state.allCharacters,
    character: state => state.character,
    loading: state => state.loading,
    error: state => state.error
  }
})