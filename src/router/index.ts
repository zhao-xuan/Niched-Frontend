import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Home from "../views/Home.vue";
import Profile from "../views/users/Profile.vue";
import Space from "../views/space/Space.vue";
import CreateSpace from "../views/space/CreateSpace.vue";
import Event from "../views/space/Event.vue";
import Login from "../views/Login.vue";
import Register from "../views/Register.vue";
import Playground from "../views/space/Playground.vue";

import Dashboard from "../views/newDashboard/HomeTab.vue";
const routes: Array<RouteRecordRaw> = [
  {
    path: "/dashboard",
    name: "Dashboard",
    component: Dashboard,
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/signup",
    name: "Register",
    component: Register,
  },
  {
    path: "/home",
    name: "Home",
    component: Home,
  },
  {
    path: "/users/:userName",
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
  {
    path: "/event/:groupId/:eventId",
    name: "Event",
    component: Event,
  },
  {
    path: "/playground",
    name: "Playground",
    component: Playground,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
