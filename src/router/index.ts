import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import JokesView from "../views/JokesView.vue";
import JokeView from "../views/JokeView.vue";
import RandomNameView from "../views/RandomNameView.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/random-jokes",
    name: "jokes",
    component: JokesView,
  },
  {
    path: "/random-jokes/:id",
    name: "joke",
    component: JokeView,
    props: true,
  },
  {
    path: "/random-names",
    name: "names",
    component: RandomNameView,
  },
  {
    path: "/",
    redirect: "random-jokes",
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
