<template>
  <TopBar />
  <div class="container-fluid">
    <div class="row py-5 px-4 niched-bg">
      <div class="col-md-10 mx-auto">
        <!-- Profile widget -->
        <div class="bg-light shadow rounded overflow-hidden mt-3s">
          <div
            class="px-4 pt-0 pb-5 cover rounded"
            :style="{
              backgroundImage: 'url(' + imageUrl +')',
              backgroundPosition: 'center',
              height: '400px',
            }"
          >
            <div class="mb-2 text-white d-flex justify-content-center">
              <div class="px-4">
              </div>
            </div>
          </div>

          <div class="row">
            <div class="col-sm-6">
              <div class="px-4 pt-3 d-flex text-left">
                <h2>Name</h2>
              </div>
            </div>
            <div class="col-sm-4">
              <div class="px-4 pt-3 d-flex text-left">
                <p>Description</p>
              </div>
            </div>
            <div class="col-sm-2">
              <div class="px-4 py-3 d-flex justify-content-end text-center">
                <ul class="list-inline mb-0">
                  <li class="list-inline-item">
                    <h5 class="font-weight-bold mb-0 d-block">
                      {{ subscribedGroups.length }}
                    </h5>
                    <small class="text-muted">
                      <i class="fas fa-user mr-1"></i>Spaces</small
                    >
                  </li>
                  <li class="list-inline-item">
                    <h5 class="font-weight-bold mb-0 d-block">23</h5>
                    <small class="text-muted">
                      <i class="fas fa-user mr-1"></i>Threads</small
                    >
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div class="row pb-4 px-4">
            <div class="col-md-8 order-0">
              <el-card style="margin: 20px auto">
                <template #header>
                  <div>
                    <span><b>Introduction</b></span>
                    <el-button type="text" style="float: right; margin-top: -10px"
                      >Edit</el-button
                    >
                  </div>
                </template>
                <div class="text item">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                  eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  <br />
                  <br />
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
                  nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
                  reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                  pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                  culpa qui officia deserunt mollit anim id est laborum.
                </div>
              </el-card>

              <el-card style="margin: 20px auto">
                <template #header>
                  <div>
                    <span>@{{ userName }}'s <b>Interests</b></span>
                    <el-button type="text" style="float: right; margin-top: -10px"
                      >Edit</el-button
                    >
                  </div>
                </template>
                <p>{{ interests }}</p>
                <!-- <SpaceGroup
                v-for="item in niches"
                :key="item"
                :spacelist="item.spaces"
                :title="item.tagName"
              /> -->
              </el-card>

              <el-card style="margin: 20px auto">
                <template #header>
                  <div>
                    <span>@{{ userName }}'s <b>Spaces</b></span>
                    <el-button type="text" style="float: right; margin-top: -10px"
                      >Edit</el-button
                    >
                  </div>
                </template>
                <p>{{ subscribedGroups }}</p>
                <!-- <SpaceGroup
                v-for="item in niches"
                :key="item"
                :spacelist="item.spaces"
                :title="item.tagName"
              /> -->
                <div v-for="o in 4" :key="o" class="text item">
                  {{ "List item " + o }}
                </div>
              </el-card>
            </div>

            <div class="col-md-4 order-1">
              <el-card style="margin: 20px auto">
                <div>
                  <h3>Welcome, @{{ userName }}</h3>
                  <p>
                    Your personalized Niched homepage. Come here to check in with your
                    favorite communities
                  </p>
                  <div style="width: 150px; margin: auto">
                    <el-avatar
                      :size="150"
                      src="https://www.petage.com/wp-content/uploads/2019/09/Depositphotos_74974941_xl-2015-e1569443284386-670x627.jpg"
                      style="margin-top: 40px; margin-bottom: 40px; width: 100%"
                    ></el-avatar>
                  </div>
                </div>
              </el-card>
              <el-card style="margin: 20px auto">
                <div>
                  <h3>Your Events</h3>
                  <p>Check out the latest events you've signed up for here!</p>
                  <el-card
                    style="border-radius: 10px; margin-bottom: 10px"
                    v-for="event in events"
                    :key="event"
                  >
                    <h5>{{ event.title + " @ " + event.location }}</h5>
                    <p>{{ event.datetime }}</p>
                    <p>{{ event.detail }}</p>
                  </el-card>
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
import TopBar from "../Topbar.vue";
import { ref, defineComponent, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useState } from "@/state";
import { postEventCreation } from "@/api/event";
import { postThreadCreation } from "@/api/thread";

export default defineComponent({
  name: "Playground",
  components: { TopBar },
  setup() {
    const router = useRouter();
    const route = useRoute();
    const groupId = route.params.groupId as string;

    const eventId = route.params.eventId as string;

    const { userName, loggedIn } = useState();
    // Redirect to user profile page
    const imageUrl = "https://cdn.britannica.com/06/171306-050-C88DD752/Aurora-borealis-peninsula-Snaefellsnes-Iceland-March-2013.jpg"

    return {
      imageUrl,
    };
  },
});
</script>
<style>
.profile-head {
  transform: translateY(5rem);
}

.cover {
  background-size: cover;
  background-repeat: no-repeat;
}
</style>
