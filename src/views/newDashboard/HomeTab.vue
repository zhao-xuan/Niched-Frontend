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
      <div class="col-md-9 pt-2 pb-5 px-4 mx-auto dashboard-bg shadow-lg">
        <el-tabs v-model="selectedTab" @tab-click="handleClick">
          <el-tab-pane label="Home" name="home">
            <div class="pt-2 px-2">
              <h2 class="pb-3">Featured Events</h2>
              <el-carousel :interval="4000" type="card" height="200px">
                <el-carousel-item v-for="item in 10" :key="item">
                  <img
                    src="https://pokemongolive.com/img/posts/anniversaryposter2019.jpg"
                    alt="Cheetah!"
                  />
                </el-carousel-item>
              </el-carousel>
            </div>
            <div class="px-2 pt-2">
              <h3>Favourite Niches</h3>
              <div class="row pb-5">
                <div
                  v-for="item in userNiches"
                  :key="item"
                  class="col-6 col-sm-3 py-2 px-2"
                >
                  <a href="www.google.co.uk">
                    <div
                      class="niche-card-div niche-image shadow-sm"
                      :style="{
                        backgroundImage: 'url(' + item.imageUrl + ')',
                      }"
                    >
                      <div class="niche-description px-2 py-2">
                        <b>
                          {{ item.description }}
                          <br />
                          Members: {{ item.members }}
                        </b>
                      </div>
                      <!-- <div class="niche-image">hello</div> -->
                    </div>
                  </a>
                  <a href="www.google.co.uk">
                    <h6 class="px-1 pt-1">{{ item.name }}</h6>
                  </a>
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
                  <el-table :data="upcomingEvents" style="width: 100%">
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
      // Data for "Featured Events" Top carousel section.
      // Should be an array of length 6 with top suggested events
      // TODO

      // Data for "Upcoming Events" section
      // Should be a short array of user's events
      upcomingEvents: [
        {
          date: "05-03",
          name: "Ramen Lovers",
          address: "No. 189, Grove St, Los Angeles",
        },
        {
          date: "05-02",
          name: "Mario Kart",
          address: "No. 189, Grove St, Los Angeles",
        },
        {
          date: "05-04",
          name: "Badminton",
          address: "No. 189, Grove St, Los Angeles",
        },
        {
          date: "05-01",
          name: "CSGO",
          address: "No. 189, Grove St, Los Angeles",
        },
      ],
      // Data for "Favourite Niches" section.
      // Should be array of length 8 with the following format:
      userNiches: [
        {
          name: "Ramen Lovers",
          imageUrl:
            "https://pokemongolive.com/img/posts/anniversaryposter2019.jpg",
          description: "We are the ramen tasters of tokyo",
          members: "5",
        },
        {
          name: "Mario Kart Legends",
          imageUrl:
            "https://img.redbull.com/images/c_fill,w_480,h_320,g_auto,f_auto,q_auto/redbullcom/2017/04/28/b9a93b62-0a42-437c-b850-c4b2ce064549/mario-kart-8-deluxe",
          description: "We are the ramen tasters of tokyo",
          members: "5",
        },
        {
          name: "Ramen Lovers",
          imageUrl:
            "https://pokemongolive.com/img/posts/anniversaryposter2019.jpg",
          description: "We are the ramen tasters of tokyo",
          members: "5",
        },
        {
          name: "Ramen Lovers",
          imageUrl:
            "https://pokemongolive.com/img/posts/anniversaryposter2019.jpg",
          description: "We are the ramen tasters of tokyo",
          members: "5",
        },
        {
          name: "Ramen Lovers",
          imageUrl:
            "https://pokemongolive.com/img/posts/anniversaryposter2019.jpg",
          description: "We are the ramen tasters of tokyo",
          members: "5",
        },
        {
          name: "Mario Kart Legends",
          imageUrl:
            "https://img.redbull.com/images/c_fill,w_480,h_320,g_auto,f_auto,q_auto/redbullcom/2017/04/28/b9a93b62-0a42-437c-b850-c4b2ce064549/mario-kart-8-deluxe",
          description: "We are the ramen tasters of tokyo",
          members: "5",
        },
        {
          name: "Ramen Lovers",
          imageUrl:
            "https://pokemongolive.com/img/posts/anniversaryposter2019.jpg",
          description: "We are the ramen tasters of tokyo",
          members: "5",
        },
        {
          name: "Ramen Lovers",
          imageUrl:
            "https://pokemongolive.com/img/posts/anniversaryposter2019.jpg",
          description: "We are the ramen tasters of tokyo",
          members: "5",
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

.niche-image {
  border-radius: 3px;
  background-size: cover;
  height: 150px;
  width: 100%;
}

.niche-image:hover {
  overflow: hidden;
  display: block;
  background-size: cover;
  opacity: 0.6;
  height: 150px;
  width: 100%;
  transition: all 0.35s cubic-bezier(0.28, 0.04, 0.18, 0.97);
  animation: recommend-fade 0.45s cubic-bezier(0.28, 0.04, 0.18, 0.97);
  animation-fill-mode: forwards;
}

.niche-description {
  display: none;
}

.niche-card-div:hover > .niche-description {
  display: block;
  color: black;
}
/*
.recommend-info {
  padding-left: 10px;
  position: absolute;
  font-size: 14px;
  color: #fff;
  width: 100%;
  bottom: -23px;
  transition: all 0.35s cubic-bezier(0.28, 0.04, 0.18, 0.97);
} */
</style>
