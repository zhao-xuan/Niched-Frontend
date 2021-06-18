<template>
  <div class="container">
    <div class="row py-5">
      <div class="col-sm-8">
        <el-card class="box-card" style="border-radius: 6px">
          <el-calendar v-model="value"> </el-calendar>
        </el-card>
      </div>
      <div class="col-sm-4">
        <el-card class="box-card" style="border-radius: 6px">
          <div v-for="o in 4" :key="o" class="text item">
            {{ "List item " + o }}
          </div>
        </el-card>
      </div>
    </div>
    <div class="row">
      <div class="col-sm">col-sm</div>
      <div class="col-sm">col-sm</div>
      <div class="col-sm">col-sm</div>
    </div>
  </div>
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
  name: "Home",
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
<style>
.profile-head {
  transform: translateY(5rem);
}

.cover {
  background-size: cover;
  background-repeat: no-repeat;
}
</style>
