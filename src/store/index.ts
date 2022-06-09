import Joke from "@/models/joke";
import axios from "axios";
import { createStore } from "vuex";

export default createStore({
  state: {
    error: "",
    loading: false,
    jokes: [] as Joke[],
    selectedStudents: [] as string[],
  },
  getters: {},
  mutations: {
    setError(state, error) {
      state.error = error;
    },
    setLoading(state, loading) {
      state.loading = loading;
    },
    setJokes(state, jokes) {
      state.jokes = jokes;
    },
    addName(state, name) {
      state.selectedStudents = [...state.selectedStudents, name];
    },
    resetNames(state) {
      state.selectedStudents = [];
    },
  },
  actions: {
    async fetchJokes({ dispatch }, category) {
      console.log(
        `https://v2.jokeapi.dev/joke/${category}?type=single&amount=10`
      );
      dispatch("loadingAction", true);
      try {
        const response = await axios.get(
          `https://v2.jokeapi.dev/joke/${category}?type=single&amount=10`
        );
        dispatch("jokesAction", response.data.jokes);
      } catch (err: any) {
        if (axios.isAxiosError(err)) {
          if (err.response?.status === 404) {
            dispatch("errorAction", "No Data");
          } else {
            dispatch("errorAction", err.message);
          }
        } else {
          dispatch("errorAction", "Not Axios Error");
        }
      } finally {
        dispatch("loadingAction", false);
      }
    },
    errorAction({ commit }, error) {
      commit("setError", error);
    },
    loadingAction({ commit }, loading) {
      commit("setLoading", loading);
    },
    jokesAction({ commit }, jokes) {
      commit("setJokes", jokes);
    },
    selectName({ commit }, name) {
      commit("addName", name);
    },
    resetNames({ commit }) {
      commit("resetNames");
    },
  },
  modules: {},
});
