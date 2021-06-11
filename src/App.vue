<template>
  <StateProvider :state="state">
    <router-view />
  </StateProvider>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import StateProvider from "./hooks/providers/StateProvider.vue";
import { State } from "./state";

export default defineComponent({
  name: "App",
  components: { StateProvider },
  setup() {
    const state: State = {
      loggedIn: !!localStorage.userName,
      userName: localStorage.userName,
      subscribedGroups: [],
      interests: [],
    };

    return { state };
  },
});
</script>

<style>
@import 'assets/styles/niched-styles.css';
</style>
