<template>
  <TopBar />
  <!-- <div class="container shadow py-5 px-4 dashboard-bg"> -->
  <div
    class="container-fluid"
    v-loading.fullscreen.lock="
      postingEvent || postingThread || fetchingEvents || fetchingThreads
    "
  >
    <div class="row py-5 niched-bg">
      <div class="col-md-9 pt-2 px-4 mx-auto dashboard-bg">
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="Home" name="first">Hi</el-tab-pane>
          <el-tab-pane label="My Events" name="second">Config</el-tab-pane>
          <el-tab-pane label="My Niches" name="third">Role</el-tab-pane>
          <el-tab-pane label="Find Events" name="fourth">Task</el-tab-pane>
          <el-tab-pane label="Find Niches" name="fifth">Task</el-tab-pane>
        </el-tabs>
        <div class="pt-3">
          <h2>Featured Events</h2>
          <el-carousel :interval="4000" type="card" height="200px">
            <el-carousel-item v-for="item in 6" :key="item">
              <img
                src="https://pokemongolive.com/img/posts/anniversaryposter2019.jpg"
                alt="Cheetah!"
              />
            </el-carousel-item>
          </el-carousel>
        </div>
        <div class="px-2">
          <h3 class="pt-4">Your Niches</h3>
          <div class="row pb-5">
            <div v-for="item in 8" :key="item" class="col-6 col-sm-3 px-1 py-2">
              <img
                src="https://pokemongolive.com/img/posts/anniversaryposter2019.jpg"
                class="img-fluid w-100"
                alt="Cheetah!"
              />
              <h6 class="px-1 pt-1">Pokemon Rangers</h6>
            </div>
          </div>
        </div>
        <div class="px-2">
          <h3 class="pt-4">Your Niches</h3>
          <div class="row pb-5">
            <div v-for="item in 8" :key="item" class="col-6 col-sm-3 px-1 py-2">
              <img
                src="https://pokemongolive.com/img/posts/anniversaryposter2019.jpg"
                class="img-fluid w-100"
                alt="Cheetah!"
              />
              <h6 class="px-1 pt-1">Pokemon Rangers</h6>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import BaseHeader from "../../components/BaseHeader.vue";
import TopBar from "../Topbar.vue";
import { ref, defineComponent, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useState } from "@/state";
import { postEventCreation } from "@/api/event";
import { postThreadCreation } from "@/api/thread";

export default defineComponent({
  name: "Home",
  components: { TopBar },
  setup() {
    const router = useRouter();
    const route = useRoute();
    const groupId = route.params.groupId as string;

    const eventId = route.params.eventId as string;

    const { userName, loggedIn } = useState();
    // Redirect to user profile page
    const imageUrl =
      "https://cdn.britannica.com/06/171306-050-C88DD752/Aurora-borealis-peninsula-Snaefellsnes-Iceland-March-2013.jpg";

    return {
      imageUrl,
    };
  },
});
</script>
<style>
@import "../../assets/styles/niched-styles.css";

.profile-head {
  transform: translateY(5rem);
}

.cover {
  background-size: cover;
  background-repeat: no-repeat;
}
</style>
