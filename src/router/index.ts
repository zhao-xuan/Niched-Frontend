import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Home from "../views/Home.vue";
import Profile from "../views/users/Profile.vue";
import Space from "../views/space/Space.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/users/:id",
    name: "Profile",
    component: Profile,
  },
  {
    path: "/space/:id",
    name: "Space",
    component: Space,
    props: {
      foo: "FOO",
    },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
