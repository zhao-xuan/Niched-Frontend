<template>
  <TopBar />
  <div
    class="container homepage-container"
    v-loading.fullscreen.lock="fetching"
  >
    <div class="row py-5 px-4 niched-bg">
      <div class="col-md-10 mx-auto">
        <!-- Profile widget -->
        <div class="bg-light shadow rounded overflow-hidden mt-3s">
          <div
            class="px-4 pt-0 pb-5 cover rounded"
            :style="{
              backgroundImage: 'url(' + imageUrl + ')',
              backgroundPosition: 'center',
              height: '400px',
            }"
          >
            <div class="mb-2 text-white d-flex justify-content-center">
              <div class="px-4"></div>
            </div>
          </div>

          <div class="row">
            <div class="col-sm-6">
              <div class="px-4 pt-3 pb-2 d-flex text-left">
                <h2>{{ userName }}'s Profile</h2>
              </div>
            </div>
          </div>

          <div class="row pb-4 px-4">
            <div class="col-md-8 order-0">
              <el-card style="margin: 20px auto">
                <template #header>
                  <div>
                    <span>@{{ userName }}'s <b>Interests</b></span>
                    <el-button
                      type="text"
                      style="float: right; margin-top: -10px"
                      >Edit</el-button
                    >
                  </div>
                </template>
                <div
                  v-for="interest in interests"
                  :key="interest"
                  class="pr-2"
                  style="display: inline"
                >
                  <el-tag type="success">
                    {{ interest }}
                  </el-tag>
                </div>
              </el-card>

              <el-card style="margin: 20px auto">
                <template #header>
                  <div>
                    <span>@{{ userName }}'s <b>Niches</b></span>
                    <el-button
                      type="text"
                      style="float: right; margin-top: -10px"
                      >Edit</el-button
                    >
                  </div>
                </template>
                <div class="row px-2">
                  <NicheCards :niches="userNiches" />
                </div>
              </el-card>
            </div>

            <div class="col-md-4 order-1">
              <el-card style="margin: 20px auto">
                <div>
                  <h3>Welcome, @{{ userName }}</h3>
                  <p>
                    Your personalized Niched homepage. Come here to check in
                    with your favorite communities
                  </p>
                  <div style="width: 150px; margin: auto">
                    <el-avatar
                      :size="150"
                      src="https://www.petage.com/wp-content/uploads/2019/09/Depositphotos_74974941_xl-2015-e1569443284386-670x627.jpg"
                      style="margin-top: 10px; margin-bottom: 10px; width: 100%"
                    ></el-avatar>
                  </div>
                  <div class="px-4 d-flex justify-content-end text-center">
                    <ul class="list-inline mb-0">
                      <li class="list-inline-item">
                        <h5 class="font-weight-bold mb-0 d-block">
                          {{ subscribedGroups.length }}
                        </h5>
                        <small class="text-muted">
                          <i class="fas fa-user mr-1"></i>Niches Joined</small
                        >
                      </li>
                    </ul>
                  </div>
                </div>
              </el-card>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, toRefs, watch, ref, watchEffect } from "vue";
import { useRouter, useRoute } from "vue-router";
import TopBar from "../Topbar.vue";
import { useState } from "@/state";
import { useFetch } from "@/hooks/useFetch";
import { SpacesResponse, fetchSpaces } from "@/api/spaces";
import NicheCards from "@/components/NicheCards.vue";

export default defineComponent({
  name: "Profile",
  components: { TopBar, NicheCards },

  setup() {
    const router = useRouter();
    const route = useRoute();
    const { loggedIn, userName, subscribedGroups, interests } = useState();
    const imageUrl =
      "https://cdn.britannica.com/06/171306-050-C88DD752/Aurora-borealis-peninsula-Snaefellsnes-Iceland-March-2013.jpg";

    type Niche = {
      title: string;
      detail: string;
      imgUrl: string;
      memberList: string[];
      groupId: string;
    };
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
        // Get user's niches
        userNiches.value = items.filter((data) =>
          subscribedGroups.value.includes(data.groupId)
        );
      }
    });

    watch([loggedIn, userName], ([l, u]) => {
      if (!l) {
        router.push({ name: "Login" });
      } else {
        if (u !== route.params.userName) {
          alert("please log in as:" + route.params.userName);
        }
      }
    });

    return {
      userName,
      fetching,
      subscribedGroups,
      interests,
      imageUrl,
      userNiches,
    };
  },
});
</script>

<style>
@import "../../assets/styles/niched-styles.css";
@import "../../assets/styles/niched-styles.css";

.homepage-container {
  max-width: 1600px;
  width: 100%;
}
</style>
