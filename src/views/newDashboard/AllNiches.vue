<template>
  <div>Hello World from Gavin</div>
</template>

<script lang="ts">
import BaseHeader from "../../components/BaseHeader.vue";
import TopBar from "../Topbar.vue";
import { ref, defineComponent, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useState } from "@/state";
import { postEventCreation } from "@/api/event";
import { postThreadCreation } from "@/api/thread";

export default defineComponent({
  name: "AllNiches",
  setup() {
    const router = useRouter();
    const route = useRoute();
    const groupId = route.params.groupId as string;

    const eventId = route.params.eventId as string;

    const { userName, loggedIn } = useState();
    // Redirect to user profile page
    const imageUrl =
      "https://cdn.britannica.com/06/171306-050-C88DD752/Aurora-borealis-peninsula-Snaefellsnes-Iceland-March-2013.jpg";

    return {
      imageUrl,
    };
  },
});
</script>

<style></style>
