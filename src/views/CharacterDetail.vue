<template>
  <div class="character-detail">
    <button @click="$router.go(-1)" class="back-button">← Back</button>
    
    <div v-if="loading" class="loading">Cargando...</div>
    <div v-if="error" class="error">{{ error }}</div>

    <div v-if="character" class="detail-container">
      <img :src="character.image" :alt="character.name" class="character-image">
      <div class="character-details">
        <h1>{{ character.name }}</h1>
        <div class="details-grid">
          <div class="detail-item">
            <span class="detail-label">Estado:</span>
            <span class="detail-value">{{ character.status }}</span>
          </div>
          <div class="detail-item">
            <span class="detail-label">Especie:</span>
            <span class="detail-value">{{ character.species }}</span>
          </div>
          <div class="detail-item">
            <span class="detail-label">Sexo:</span>
            <span class="detail-value">{{ character.gender }}</span>
          </div>
          <div class="detail-item">
            <span class="detail-label">Origen:</span>
            <span class="detail-value">{{ character.origin.name }}</span>
          </div>
          <div class="detail-item">
            <span class="detail-label">Ubicacion:</span>
            <span class="detail-value">{{ character.location.name }}</span>
          </div>
          <div class="detail-item">
            <span class="detail-label">Type:</span>
            <span class="detail-value">{{ character.type || 'Unknown' }}</span>
          </div>
          <div class="detail-item">
            <span class="detail-label">Episodios:</span>
            <span class="detail-value">{{ character.episode.length }}</span>
          </div>
          <div class="detail-item">
            <span class="detail-label">Creado:</span>
            <span class="detail-value">{{ new Date(character.created).toLocaleDateString() }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'CharacterDetail',
  props: {
    id: {
      type: [String, Number],
      required: true
    }
  },
  computed: {
    ...mapGetters(['character', 'loading', 'error'])
  },
  created() {
    this.fetchCharacterById(this.id)
  },
  methods: {
    ...mapActions(['fetchCharacterById'])
  }
}
</script>

<style scoped>
.character-detail {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

.back-button {
  padding: 8px 16px;
  margin-bottom: 20px;
  background-color: #f0f0f0;
  border: 1px solid #ddd;
  border-radius: 4px;
  cursor: pointer;
}

.back-button:hover {
  background-color: #e0e0e0;
}

.detail-container {
  display: flex;
  flex-direction: column;
  gap: 30px;
}

@media (min-width: 768px) {
  .detail-container {
    flex-direction: row;
  }
}

.character-image {
  width: 100%;
  max-width: 400px;
  border-radius: 8px;
  align-self: flex-start;
}

.character-details {
  flex: 1;
}

.details-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
  margin-top: 20px;
}

.detail-item {
  padding: 10px;
  background-color: #f9f9f9;
  border-radius: 4px;
}

.detail-label {
  display: block;
  font-weight: bold;
  margin-bottom: 5px;
  color: #666;
}

.detail-value {
  display: block;
  font-size: 16px;
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