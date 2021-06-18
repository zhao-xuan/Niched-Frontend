import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import HomeOld from "../views/HomeOld.vue";
import Profile from "../views/users/Profile.vue";
import Space from "../views/space/Space.vue";
import CreateSpace from "../views/space/CreateSpace.vue";
import Event from "../views/space/Event.vue";
import Login from "../views/Login.vue";
import Register from "../views/Register.vue";
import Playground from "../views/space/Playground.vue";
import Thread from "../views/thread/Thread.vue";

import DashboardLayout from "../views/DashboardLayout.vue";
import Home from "../views/newDashboard/Home.vue";
import MyNiches from "../views/newDashboard/MyNiches.vue";
import MyEvents from "../views/newDashboard/MyEvents.vue";
import AllNiches from "../views/newDashboard/AllNiches.vue";
import AllEvents from "../views/newDashboard/AllEvents.vue";
const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    redirect: "home",
    // name: "Dashboard",
    component: DashboardLayout,
    children: [
      {
        path: "/home",
        name: "Home",
        components: { default: AllNiches },
      },
      {
        path: "/my-niches",
        name: "MyNiches",
        components: { default: MyNiches },
      },
      {
        path: "/my-events",
        name: "MyEvents",
        components: { default: MyEvents },
      },
      {
        path: "/all-niches",
        name: "AllNiches",
        components: { default: AllNiches },
      },
      {
        path: "/all-events",
        name: "AllEvents",
        components: { default: AllEvents },
      },
    ],
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
    path: "/homeold",
    name: "HomeOld",
    component: HomeOld,
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
    path: "/thread/:groupId/:threadId",
    name: "Thread",
    component: Thread,
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
