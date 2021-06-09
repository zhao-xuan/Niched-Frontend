<template>
  <StateProvider :state="state">
    <router-view />
  </StateProvider>
</template>

<script lang="ts">
import { defineComponent, reactive } from "vue";
import StateProvider from "./StateProvider.vue";
import { State } from "./state";
import { useUser } from "@/hooks/useUser";

export default defineComponent({
  name: "App",
  components: { StateProvider },
  setup() {
    const { userName, email, subscribedGroups, interests } = useUser(
      "alice",
      true
    );
    const state: State = reactive({
      loggedIn: true,
      userName,
      email,
      subscribedGroups,
      interests,
    });

    return { state };
  },
});
</script>

<style>
body {
  background: #654ea3;
  background: linear-gradient(to right, #32b368, #329eb3);
  overflow-x: hidden;
}
</style>
