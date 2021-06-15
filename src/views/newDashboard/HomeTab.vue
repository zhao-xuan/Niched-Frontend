<template>
  <TopBar />
  <!-- <div class="container shadow py-5 px-4 dashboard-bg"> -->
  <div
    class="container-fluid"
    v-loading.fullscreen.lock="
      postingEvent || postingThread || fetchingEvents || fetchingThreads
    "
  >
    <div class="row py-5 niched-bg draw-bg">
      <div class="col-md-9 pt-2 px-4 mx-auto dashboard-bg shadow-lg">
        <el-tabs v-model="selectedTab" @tab-click="handleClick">
          <el-tab-pane label="Home" name="home">
            <div class="pt-2 px-2">
              <h2 class="pb-3">Featured Events</h2>
              <el-carousel :interval="4000" type="card" height="200px">
                <el-carousel-item v-for="item in 6" :key="item">
                  <img
                    src="https://pokemongolive.com/img/posts/anniversaryposter2019.jpg"
                    alt="Cheetah!"
                  />
                </el-carousel-item>
              </el-carousel>
            </div>
            <div class="px-2 pt-2">
              <h3>Your Niches</h3>
              <div class="row pb-5">
                <div
                  v-for="item in 8"
                  :key="item"
                  class="col-6 col-sm-3 px-2 py-2"
                >
                  <img
                    src="https://pokemongolive.com/img/posts/anniversaryposter2019.jpg"
                    class="img-fluid w-100"
                    alt="Cheetah!"
                  />
                  <h6 class="px-1 pt-1">Pokemon Rangers</h6>
                </div>
              </div>
            </div>

            <div class="row">
              <div class="col-sm-8">
                <h4>Recommended Niches</h4>
                <div class="row">
                  <div
                    v-for="item in 9"
                    :key="item"
                    class="col-6 col-md-4 px-2 py-2"
                  >
                    <img
                      src="https://pokemongolive.com/img/posts/anniversaryposter2019.jpg"
                      class="img-fluid w-100"
                      alt="Cheetah!"
                    />
                  </div>
                  <div class="col-6 col-md-4">.col-6 .col-md-4</div>
                  <div class="col-6 col-md-4">.col-6 .col-md-4</div>
                </div>
              </div>
              <div class="col-sm-4">
                <el-card class="box-card">
                  <slot name="header" class="clearfix">
                    <span><b>Upcoming Events</b></span>
                    <el-button style="float: right; padding: 3px 0" type="text"
                      >More</el-button
                    >
                  </slot>
                  <el-table :data="tableData" style="width: 100%">
                    <el-table-column prop="date" label="Date" width="60">
                    </el-table-column>
                    <el-table-column prop="name" label="Niche" width="100">
                    </el-table-column>
                    <el-table-column prop="address" label="Event Info">
                    </el-table-column>
                  </el-table>
                </el-card>
              </div>
            </div>

            <div class="px-2 pt-2">
              <h3>Your Niches</h3>
              <div class="row pb-5">
                <div
                  v-for="item in 8"
                  :key="item"
                  class="col-6 col-sm-3 px-2 py-2"
                >
                  <img
                    src="https://pokemongolive.com/img/posts/anniversaryposter2019.jpg"
                    class="img-fluid w-100"
                    alt="Cheetah!"
                  />
                  <h6 class="px-1 pt-1">Pokemon Rangers</h6>
                </div>
              </div>
            </div>
          </el-tab-pane>
          <el-tab-pane label="My Events" name="myevents">Config</el-tab-pane>
          <el-tab-pane label="My Niches" name="myniches">Role</el-tab-pane>
          <el-tab-pane label="Find Events" name="fourth">Task</el-tab-pane>
          <el-tab-pane label="Find Niches" name="fifth">Task</el-tab-pane>
        </el-tabs>
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

export default defineComponent({
  name: "Home",
  components: { TopBar },
  setup() {
    const router = useRouter();
    const route = useRoute();

    const { userName, loggedIn } = useState();

    const selectedTab = ref("home");
    return {
      selectedTab,
    };
  },
  data() {
    return {
      tableData: [
        {
          date: "05-03",
          name: "Tom",
          address: "No. 189, Grove St, Los Angeles",
        },
        {
          date: "05-02",
          name: "Tom",
          address: "No. 189, Grove St, Los Angeles",
        },
        {
          date: "05-04",
          name: "Tom",
          address: "No. 189, Grove St, Los Angeles",
        },
        {
          date: "05-01",
          name: "Tom",
          address: "No. 189, Grove St, Los Angeles",
        },
      ],
    };
  },
});
</script>
<style>
@import "../../assets/styles/niched-styles.css";

/* .draw-bg {
  background: url("../../assets/bg1.png") no-repeat center -50px;
  min-height: 900px;
} */

.profile-head {
  transform: translateY(5rem);
}

.cover {
  background-size: cover;
  background-repeat: no-repeat;
}
</style>
