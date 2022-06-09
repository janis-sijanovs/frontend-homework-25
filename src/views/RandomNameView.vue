<template>
  <div class="home">
    <button @click="addName()">Get Random Student</button>
    <p>{{ currentName }}</p>
  </div>
</template>

<script lang="ts">
import getStudentNames from "@/data/data";
import { defineComponent } from "vue";
import { mapActions } from "vuex";

const randomArrayElement = (array: string[]) =>
  array[Math.floor(Math.random() * array.length)];

export default defineComponent({
  name: "RandomNameView",
  data: () => ({
    currentName: "",
  }),
  computed: {
    allNames() {
      return getStudentNames();
    },
    usedNames() {
      return this.$store.state.selectedStudents;
    },
    unusedNames(): string[] {
      return this.allNames.filter((name) => !this.usedNames.includes(name));
    },
    randomName(): string {
      return randomArrayElement(this.unusedNames);
    },
  },
  methods: {
    addName() {
      if (this.unusedNames.length > 1) {
        const newName = this.randomName;
        this.currentName = newName;
        this.$store.dispatch("selectName", newName);
      } else {
        const newName = this.unusedNames[0];
        this.currentName = newName;
        this.$store.dispatch("resetNames");
      }
      console.log(this.unusedNames);
    },
    checkName() {
      console.log(this.unusedNames);
    },
    ...mapActions(["selectName", "resetNames"]),
  },
});
</script>
