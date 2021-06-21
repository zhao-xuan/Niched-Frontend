<template>
  <TopBar />
  <div class="container homepage-container">
    <div class="row py-5">
      <div
        class="
          niched-corner
          col-md-8
          pt-2
          pb-5
          px-4
          mx-auto
          shadow-lg
          home-card-bg
        "
      >
        <div class="pt-2">
          <router-link class="px-2" :to="{ name: 'Home' }">Home </router-link>
          <el-divider direction="vertical"></el-divider>
          <router-link class="px-2" :to="{ name: 'MyEvents' }">
            My Events
          </router-link>
          <!-- <el-divider direction="vertical"></el-divider>
          <router-link class="px-2" :to="{ name: 'AllEvents' }">
            Find Events</router-link
          > -->
        </div>

        <hr />
        <router-view />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import TopBar from "./Topbar.vue";
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
});
</script>

<style>
@import "../assets/styles/niched-styles.css";
</style>
