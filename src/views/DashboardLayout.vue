<template>
  <TopBar />
  <div class="container">
    <div class="row py-5">
      <div
        class="
          niched-corner
          col-md-12
          pt-2
          pb-5
          px-4
          mx-auto
          shadow-lg
          home-card-bg
          homepage-container
        "
      >
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
