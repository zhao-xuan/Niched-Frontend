<template>
  <div>
    <div class="px-2 pt-2">
      <el-carousel indicator-position="outside">
        <el-carousel-item v-for="item in popularNiches" :key="item">
          <a href="www.google.co.uk">
            <div
              class="all-niches-carousel"
              :style="{
                backgroundImage: 'url(' + item.imgUrl + ' )',
              }"
            ></div
          ></a>
        </el-carousel-item>
      </el-carousel>
    </div>
    <div class="px-2 pt-2">
      <h3>Niche Catalogue</h3>
      <div class="row pb-5">
        <div
          v-for="item in allNiches"
          :key="item"
          class="col-6 col-sm-3 py-2 px-2"
        >
          <a href="www.google.co.uk">
            <div
              class="niche-card-div niche-image shadow-sm"
              :style="{
                backgroundImage: 'url(' + item.imgUrl + ')',
              }"
            >
              <div class="niche-description px-2 py-2">
                <b>
                  {{ item.detail }}
                  <br />
                  Members: {{ item.memberList.length }}
                </b>
              </div>
              <!-- <div class="niche-image">hello</div> -->
            </div>
          </a>
          <a href="www.google.co.uk">
            <h6 class="px-1 pt-1">{{ item.title }}</h6>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { useRoute, useRouter } from "vue-router";
import { useState } from "@/state";
import { defineComponent, toRefs, reactive, watchEffect } from "vue";
import { useFetch } from "@/hooks/useFetch";
import { SpacesResponse, fetchSpaces } from "@/api/spaces";
import { dashboardFixture } from "./fixtures";

export default defineComponent({
  name: "Home",
  setup() {
    type Niche = {
      title: string;
      detail: string;
      imgUrl: string;
      memberList: string[];
    };
    var randomNiches: Niche[] = [];
    const { allNiches, popularNiches } = toRefs(reactive(dashboardFixture));

    const { fetched, fetching, data } = useFetch<SpacesResponse>(
      fetchSpaces,
      true
    );
    watchEffect(() => {
      if (fetched.value) {
        const items = Object.values(data.value || {}).map(
          ({ group_id, name, description, image_url, members }) => ({
            groupId: group_id,
            title: name,
            detail: description,
            imgUrl:
              image_url ||
              "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8dG9reW98ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80",
            memberList: members,
          })
        );

        allNiches.value = items;

        // Get 6 random niches to display!
        for (let i = 0; i < 6; i++) {
          randomNiches.push(items[Math.floor(Math.random() * items.length)]);
          console.log(randomNiches);
        }

        popularNiches.value = randomNiches;
      }
    });
    return {
      allNiches,
      fetching,
      popularNiches,
    };
  },
});
</script>
<style>
@import "../../assets/styles/homepage-styles.css";
</style>
