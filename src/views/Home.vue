<template>
  <div class="home">
    <h1>Personajes de Rick & Morty</h1>
    <div class="search-container">
      <div class="search-wrapper">
        <input 
          v-model="searchTerm" 
          type="text" 
          placeholder="Buscar personajes..."
          @keyup.enter="searchCharacters"
          @focus="showDropdown = true"
          @blur="onInputBlur"
          @input="handleInput"
        >
        <button @click="searchCharacters">Buscar</button>
        
        <div v-if="showDropdown && filteredCharacters.length > 0" class="dropdown">
          <div 
            v-for="character in filteredCharacters"
            :key="character.id"
            class="dropdown-item"
            @mousedown.prevent="selectCharacter(character)"
          >
            <img :src="character.image" :alt="character.name" class="dropdown-image">
            <div class="dropdown-info">
              <span>{{ character.name }}</span>
              <small>{{ character.species }} - {{ character.status }}</small>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-if="loading" class="loading">Cargando...</div>
    <div v-if="error" class="error">{{ error }}</div>

    <div class="characters-grid">
      <div 
        v-for="character in characters" 
        :key="character.id" 
        class="character-card"
        @click="goToDetail(character.id)"
      >
        <img :src="character.image" :alt="character.name">
        <div class="character-info">
          <h3>{{ character.name }}</h3>
          <p>Estado: {{ character.status }}</p>
          <p>Especie: {{ character.species }}</p>
          <p>Sexo: {{ character.gender }}</p>
          <p>Origen: {{ character.origin.name }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'HomeView',
  data() {
    return {
      searchTerm: '',
      showDropdown: false,
      allCharacters: []
    }
  },
  computed: {
    ...mapGetters(['characters', 'loading', 'error']),
    filteredCharacters() {
      // Versión simplificada y corregida
      const results = this.allCharacters.filter(character => {
        return character.name.toLowerCase().includes(this.searchTerm.toLowerCase())
      })
      return results.slice(0, 1000) //<------ cantidad de personajes a mostrar en el slide
    }
  },
  methods: {
    ...mapActions(['fetchCharacters', 'fetchAllCharacters']),
    searchCharacters() {
      this.showDropdown = false;
      if (this.searchTerm.trim()) {
        this.fetchCharacters(this.searchTerm);
      }
    },
    goToDetail(id) {
      this.$router.push({ name: 'CharacterDetail', params: { id } });
    },
    handleInput() {
      if (this.searchTerm.length > 0) {
        this.showDropdown = true;
      }
    },
    onInputBlur() {
      setTimeout(() => {
        this.showDropdown = false;
      }, 200);
    },
    selectCharacter(character) {
      this.searchTerm = character.name;
      this.showDropdown = false;
      this.searchCharacters();
    }
  },
  async created() {
    await this.fetchAllCharacters();
    this.allCharacters = this.$store.getters.allCharacters || [];
  }
}
</script>

<style scoped>
.home {
  padding: 20px;
}

.search-container {
  margin: 20px 0;
  display: flex;
  justify-content: center;
}

.search-wrapper {
  position: relative;
  display: flex;
  gap: 10px;
}

.search-container input {
  padding: 8px;
  width: 300px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.search-container button {
  padding: 8px 16px;
  background-color: #42b983;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.dropdown {
  position: absolute;
  top: 100%;
  left: 0;
  width: 300px;
  max-height: 400px;
  overflow-y: auto;
  background: white;
  border: 1px solid #ddd;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  z-index: 1000;
  margin-top: 5px;
}

.dropdown-item {
  display: flex;
  align-items: center;
  padding: 8px;
  cursor: pointer;
  transition: background-color 0.2s;
}

.dropdown-item:hover {
  background-color: #f5f5f5;
}

.dropdown-image {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 10px;
  object-fit: cover;
}

.dropdown-info {
  display: flex;
  flex-direction: column;
}

.dropdown-info small {
  color: #666;
  font-size: 0.8em;
}

.characters-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  margin-top: 20px;
}

.character-card {
  border: 1px solid #ddd;
  border-radius: 8px;
  overflow: hidden;
  cursor: pointer;
  transition: transform 0.2s;
}

.character-card:hover {
  transform: scale(1.03);
}

.character-card img {
  width: 100%;
  height: 300px;
  object-fit: cover;
}

.character-info {
  padding: 15px;
}

.loading, .error {
  padding: 20px;
  text-align: center;
  font-size: 18px;
}

.error {
  color: red;
}
</style>