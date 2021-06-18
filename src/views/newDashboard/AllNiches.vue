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
            class="all-niches-carousel header-carousel-parent clickable"
            :style="{
              backgroundImage: 'url(' + item.imgUrl + ' )',
              backgroundPosition: 'center',
            }"
            @click="jumpToSpace(item.groupId)"
          >
            <div class="header-carousel-overlay">
              <!-- <div class="niche-description px-2 py-2"></div> -->
            </div>
          </div>
          <div class="row header-carousel-header px-5">
            <div class="col-sm-10">
              <h4 class="pb-3">{{ item.title }}</h4>
              <h6>{{ item.detail }}</h6>
            </div>
            <div class="col-sm-2 d-flex justify-content-end">
              <i class="el-icon-user"> {{ item.memberList.length }}</i>
            </div>
          </div>
        </el-carousel-item>
      </el-carousel>
    </div>
    <div class="pt-2">
      <div class="row justify-content-between">
        <div class="col-8">
          <h4 style="color: red">
            <i class="el-icon-medal-1"></i> Niche Catalogue
          </h4>
        </div>
        <div class="col-4">
          <div style="color: grey">
            <div class="">
              <el-input
                v-model="search"
                size="small "
                placeholder="E.g. Counter Strike"
              />
            </div>
            <div class="px-2" style="float: right">
              <i class="el-icon-search"></i> Search by Space
            </div>
          </div>
        </div>
      </div>
      <el-tabs v-model="selectedTab" @tab-click="handleClick">
        <el-tab-pane label="Catalogue" name="catalogue">
          <div class="row pb-5 px-2">
            <NicheCards
              :niches="
                allNiches.filter(
                  (data) =>
                    !search ||
                    data.title.toLowerCase().includes(search.toLowerCase())
                )
              "
            />
          </div>
        </el-tab-pane>

        <el-tab-pane label="Your Niches" name="userniche">
          <div class="row pb-5 px-2">
            <NicheCards
              :niches="
                userNiches.filter(
                  (data) =>
                    !search ||
                    data.title.toLowerCase().includes(search.toLowerCase())
                )
              "
            />
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script lang="ts">
import { useRoute, useRouter } from "vue-router";
import { useState } from "@/state";
import { defineComponent, ref, watchEffect } from "vue";
import { useFetch } from "@/hooks/useFetch";
import { SpacesResponse, fetchSpaces } from "@/api/spaces";
import NicheCards from "@/components/NicheCards.vue";

export default defineComponent({
  components: { NicheCards },
  name: "Home",
  setup() {
    const router = useRouter();
    const { subscribedGroups } = useState();
    type Niche = {
      title: string;
      detail: string;
      imgUrl: string;
      memberList: string[];
      groupId: string;
    };
    var randomNiches: Niche[] = [];
    // const { allNiches, popularNiches } = toRefs(reactive(dashboardFixture));
    const allNiches = ref<Niche[]>([]);
    const popularNiches = ref<Niche[]>([]);
    const userNiches = ref<Niche[]>([]);

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
        }
        popularNiches.value = randomNiches;

        // Get user's niches
        userNiches.value = items.filter((data) =>
          subscribedGroups.value.includes(data.groupId)
        );
      }
    });

    const selectedTab = ref("catalogue");

    return {
      allNiches,
      fetching,
      popularNiches,
      userNiches,
      jumpToSpace(item: string) {
        router.push({ name: "Space", params: { id: item } });
      },
      selectedTab,
    };
  },
  data() {
    return {
      search: "",
    };
  },
});
</script>
<style>
@import "../../assets/styles/niched-styles.css";
</style>
