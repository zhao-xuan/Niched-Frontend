<template>
  <StateProvider :state="state">
    <router-view />
  </StateProvider>
</template>

<script lang="ts">
import { defineComponent, reactive } from "vue";
import StateProvider from "./hooks/providers/StateProvider.vue";
import { State } from "./state";
import { fetchUser } from "./api/user";
import { setAuthToken } from "./api/auth";

export default defineComponent({
  name: "App",
  components: { StateProvider },
  setup() {
    const state = reactive<State>({
      loading: false,
      loggedIn: false,
      userName: "",
      subscribedGroups: [],
      interests: [],
    });

    const fetchAndSetUser = async () => {
      try {
        state.loading = true;
        const { user_name, email, bio, interests, subscribed_groups } =
          await fetchUser(localStorage.userName);
        state.loggedIn = true;
        state.userName = user_name;
        state.bio = bio || "";
        state.email = email || "";
        state.interests = interests;
        state.subscribedGroups = subscribed_groups;
        state.loading = false;
        setAuthToken(localStorage.token);
      } catch (err) {
        alert("cannot fetch user info");
        state.loading = false;
      }
    };

    if (localStorage.userName) {
      fetchAndSetUser();
    }
    return { state };
  },
});
</script>

<style>
@import "assets/styles/niched-styles.css";
</style>
