import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Profile from "../views/users/Profile.vue";
import Space from "../views/space/Space.vue";
import CreateSpace from "../views/space/CreateSpace.vue";
import Event from "../views/space/Event.vue";
import Login from "../views/Login.vue";
import Register from "../views/Register.vue";
import Playground from "../views/space/Playground.vue";
import Thread from "../views/thread/Thread.vue";

import DashboardLayout from "../views/DashboardLayout.vue";
import MyEvents from "../views/newDashboard/MyEvents.vue";
import AllNiches from "../views/newDashboard/AllNiches.vue";
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
        path: "/my-events",
        name: "MyEvents",
        components: { default: MyEvents },
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
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
