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
              <h4 class="pb-3">{{ item.name }}</h4>
              <h6>{{ item.description }}</h6>
            </div>
            <div class="col-sm-2 d-flex justify-content-end">
              <i class="el-icon-user"> {{ item.members.length }}</i>
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
        <el-tab-pane label="Hot" name="hot">
          <div class="row">
            <div class="col" style="color: red">
              <i class="el-icon-trophy"></i> Recommended for You
            </div>
          </div>
          <div class="row pb-4 px-2">
            <NicheCards
              :niches="
                recommendedNiches.filter(
                  (data) =>
                    !search ||
                    data.name.toLowerCase().includes(search.toLowerCase())
                )
              "
            />
          </div>

          <div class="row">
            <div class="col" style="color: red">
              <i class="el-icon-trophy"></i> Most Popular
            </div>
          </div>
          <div class="row pb-4 px-2">
            <NicheCards
              :niches="
                mostMemberNiches.filter(
                  (data) =>
                    !search ||
                    data.name.toLowerCase().includes(search.toLowerCase())
                )
              "
            />
          </div>

          <div class="row">
            <div class="col" style="color: red">
              <i class="el-icon-trophy"></i> Newest Niches
            </div>
          </div>
          <div class="row pb-4 px-2">
            <NicheCards
              :niches="
                newNiches.filter(
                  (data) =>
                    !search ||
                    data.name.toLowerCase().includes(search.toLowerCase())
                )
              "
            />
          </div>
        </el-tab-pane>

        <el-tab-pane label="Catalogue" name="catalogue">
          <div class="row">
            <div class="col" style="color: red">
              <i class="el-icon-trophy"></i> Browse all Niches!
            </div>
          </div>
          <div class="row pb-5 px-2">
            <NicheCards
              :niches="
                allNiches.filter(
                  (data) =>
                    !search ||
                    data.name.toLowerCase().includes(search.toLowerCase())
                )
              "
            />
          </div>
        </el-tab-pane>

        <el-tab-pane label="Your Niches" name="userniche">
          <div class="row">
            <div class="col" style="color: red">
              <i class="el-icon-trophy"></i> Find Niches you've joined here
            </div>
          </div>
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
import { Space } from "@/api/space";

export default defineComponent({
  components: { NicheCards },
  name: "Home",
  setup() {
    const router = useRouter();
    const { userName, subscribedGroups } = useState();
    var randomNiches: Space[] = [];
    const allNiches = ref<Space[]>([]);
    const popularNiches = ref<Space[]>([]);
    const userNiches = ref<Space[]>([]);
    const recommendedNiches = ref<Space[]>([]);
    const mostMemberNiches = ref<Space[]>([]);
    const newNiches = ref<Space[]>([]);
    const chosenNiches = [
      "minecraft",
      "csgo",
      "k-drama",
      "tech",
      "drp-15",
      "anime",
      "casual-arena",
      "bts",
    ];

    const { fetched, fetching, data } = useFetch<SpacesResponse>(
      fetchSpaces,
      true
    );
    watchEffect(() => {
      if (fetched.value) {
        const items = Object.values(data.value || {}).map(
          ({
            group_id,
            author_id,
            name,
            description,
            image_url,
            creation_date,
            members,
            tags,
          }) => ({
            groupId: group_id,
            authorId: author_id,
            name,
            description,
            imageUrl:
              image_url ||
              "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8dG9reW98ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80",
            members,
            tags,
            creationDate: creation_date,
          })
        );

        allNiches.value = items;

        newNiches.value = [...items].reverse().slice(0, 8);

        // Get 6 random niches to display!
        for (let i = 0; i < 6; i++) {
          randomNiches.push(items[Math.floor(Math.random() * items.length)]);
        }
        popularNiches.value = randomNiches;

        // Get user's niches
        userNiches.value = items.filter((group) =>
          group.members.includes(userName.value)
        );

        // Display recommended Niches on first tab
        recommendedNiches.value = items.filter((data) =>
          chosenNiches.includes(data.groupId)
        );

        mostMemberNiches.value = items
          .sort(function (a, b) {
            return b.members.length - a.members.length;
          })
          .slice(0, 8);
      }
    });

    const selectedTab = ref("hot");

    return {
      allNiches,
      fetching,
      popularNiches,
      userNiches,
      recommendedNiches,
      mostMemberNiches,
      newNiches,
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
