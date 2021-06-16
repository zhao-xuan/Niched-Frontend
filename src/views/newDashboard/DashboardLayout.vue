<template>
  <TopBar />
  <!-- <div class="container shadow py-5 px-4 dashboard-bg"> -->
  <div class="container-fluid">
    <div class="row py-5 niched-bg draw-bg">
      <div class="col-md-9 pt-2 pb-5 px-4 mx-auto dashboard-bg shadow-lg">
        <div class="pt-2">
          <router-link :to="{ name: 'Home' }">Home </router-link>|
          <router-link :to="{ name: 'MyNiches' }">My Events </router-link>|
          <router-link :to="{ name: 'MyEvents' }">Home </router-link>|
          <router-link :to="{ name: 'AllNiches' }">Find Niches </router-link>|
          <router-link :to="{ name: 'AllEvents' }">Find Events </router-link>
        </div>

        <hr />
        <router-view />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
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
});
</script>
