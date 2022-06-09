<template>
  <div class="home">
    <div v-if="jokes">
      <p>Select a category:</p>
      <select @change="fetchJokes(category)" v-model="category">
        <option value="Any">Any</option>
        <option value="Programming">Programming</option>
        <option value="Miscellaneous">Miscellaneous</option>
        <option value="Dark">Dark</option>
        <option value="Pun">Pun</option>
      </select>
      <div v-for="joke in jokes" :key="joke.id">
        <p>{{ joke.joke }}</p>
        <button @click="$router.push(`/random-jokes/${joke.id}`)">
          more..
        </button>
      </div>
    </div>
    <p v-if="loading">Loading...</p>
    <p v-if="error">{{ error }}</p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mapActions } from "vuex";

export default defineComponent({
  name: "JokesView",
  data: () => ({
    category: "Any",
  }),
  computed: {
    jokes() {
      return this.$store.state.jokes;
    },
    loading() {
      return this.$store.state.loading;
    },
    error() {
      return this.$store.state.error;
    },
  },
  methods: {
    ...mapActions(["fetchJokes"]),
  },
  mounted() {
    this.$store.dispatch("fetchJokes", this.category);
  },
});
</script>
