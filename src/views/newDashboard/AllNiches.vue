<template>
  <div>
    <div class="px-2 pt-2">
      <el-carousel indicator-position="outside">
        <el-carousel-item v-for="item in 6" :key="item">
          <img
            src="https://pokemongolive.com/img/posts/anniversaryposter2019.jpg"
            alt="Cheetah!"
          />
        </el-carousel-item>
      </el-carousel>
    </div>
    <div class="px-2 pt-2">
      <h3>Niche Catalogue</h3>
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
      ],
    };
  },
});
</script>
<style>
@import "../../assets/styles/homepage-styles.css";
</style>
