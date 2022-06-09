<template>
  <div class="home">
    <div v-if="joke">
      <p>ID: {{ joke.id }}</p>
      <p>Joke: {{ joke.joke }}</p>
      <p>Type: {{ joke.type }}</p>
      <p>Category: {{ joke.category }}</p>
      <p>Is Safe?: {{ joke.safe }}</p>
      <p>Language: {{ joke.lang.toUpperCase() }}</p>
      <p>Flags:</p>
      <div v-for="flag in jokeFlags" :key="flag.toString()">
        {{ flag }}&nbsp;
      </div>
    </div>
    <p v-if="loading">Loading...</p>
    <p v-if="error">{{ error }}</p>
  </div>
</template>

<script lang="ts">
import Joke from "@/models/joke";
import axios from "axios";
import { defineComponent } from "vue";

export default defineComponent({
  data: () => ({
    loading: false,
    error: "",
    joke: null as null | Joke,
  }),
  name: "JokeView",
  props: ["id", "category"],
  computed: {
    jokeFlags() {
      if (this.joke) {
        const flags = Object.entries(this.joke.flags)
          .filter((flagArray) => flagArray[1])
          .map((flag) => flag[0]);
        if (flags.length > 0) {
          return flags;
        } else {
          return ["none"];
        }
      }
      return false;
    },
  },
  methods: {
    async fetchJoke(id: string) {
      this.loading = true;
      try {
        const response = await axios.get(
          `https://v2.jokeapi.dev/joke/Any?idRange=${id}`
        );
        this.joke = response.data;
      } catch (err: unknown) {
        if (axios.isAxiosError(err)) {
          if (err.response?.status === 404) {
            this.error = "No Data";
          } else {
            this.error = err.message;
          }
        } else {
          this.error = "Not Axios Error";
        }
      } finally {
        this.loading = false;
      }
    },
  },
  mounted() {
    this.fetchJoke(this.id);
  },
});
</script>
