import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Home from "../views/Home.vue";
import Profile from "../views/users/Profile.vue";
import Space from "../views/space/Space.vue";
import CreateSpace from "../views/space/CreateSpace.vue";

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
    path: "/space/create",
    name: "CreateSpace",
    component: CreateSpace,
  },
  {
    path: "/space/:id",
    name: "Space",
    component: Space,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
