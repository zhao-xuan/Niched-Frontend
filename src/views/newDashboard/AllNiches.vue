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
    <div class="pt-2">
      <h5 style="color: red">
        <i class="el-icon-medal-1"></i> Niche Catalogue
      </h5>
      <el-tabs v-model="selectedTab" @tab-click="handleClick">
        <el-tab-pane label="Catalogue" name="catalogue">
          <div class="row pb-5 px-2">
            <NicheCards :niches="allNiches" />
          </div>
        </el-tab-pane>
        <el-tab-pane label="Search" name="search">
          <el-card class="box-card" style="border-radius: 4px" shadow="hover">
            <div style="color: red">
              <div class="pb-2">
                <i class="el-icon-search"></i> Search by Space
              </div>
              <div class="pb-2">
                <el-input
                  v-model="search"
                  size="small "
                  placeholder="E.g. Counter Strike"
                />
              </div>
            </div>

            <el-table
              ref="filterTable"
              :data="
                allNiches.filter(
                  (data) =>
                    !search ||
                    data.title.toLowerCase().includes(search.toLowerCase())
                )
              "
              style="width: 100%"
              :row-class-name="tableRowClassName"
            >
              <el-table-column prop="title" label="Title"> </el-table-column>
              <el-table-column prop="groupId" label="Group ID">
              </el-table-column>
              <el-table-column prop="memberList.length" label="Members">
              </el-table-column>
              <el-table-column prop="detail" label="Detail" min-width="300">
              </el-table-column>
            </el-table>
          </el-card>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script lang="ts">
import { useRouter } from "vue-router";
import { defineComponent, ref, toRefs, reactive, watchEffect } from "vue";
import { useFetch } from "@/hooks/useFetch";
import { SpacesResponse, fetchSpaces } from "@/api/spaces";
import { dashboardFixture } from "../../components/fixtures";
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
      groupId: string;
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

    const selectedTab = ref("catalogue");

    return {
      allNiches,
      fetching,
      popularNiches,
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
