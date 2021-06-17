<template>
  <div v-loading.fullscreen.lock="fetching">
    <div class="px-2 pt-2">
      <div class="row">
        <div class="col" style="color: red">
          <i class="el-icon-trophy"></i> Trending Niches
        </div>
      </div>
      <el-carousel indicator-position="outside">
        <el-carousel-item v-for="item in popularNiches" :key="item">
          <div
            class="all-niches-carousel clickable"
            :style="{
              backgroundImage: 'url(' + item.imgUrl + ' )',
              backgroundPosition: 'center',
            }"
            @click="jumpToSpace(item.groupId)"
          >
            <h2 class="py-4" style="color: white; text-align: center">
              {{ item.title }}
            </h2>
          </div>
        </el-carousel-item>
      </el-carousel>
    </div>
    <div class="px-2 pt-2">
      <h3>Niche Catalogue</h3>
      <div class="row pb-5">
        <NicheCards :niches="allNiches" />
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
import NicheCards from "@/components/NicheCards.vue";

export default defineComponent({
  components: { NicheCards },
  name: "Home",
  setup() {
    const router = useRouter();
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
      jumpToSpace(item: string) {
        router.push({ name: "Space", params: { id: item } });
      },
    };
  },
});
</script>
<style>
@import "../../assets/styles/niched-styles.css";
</style>
