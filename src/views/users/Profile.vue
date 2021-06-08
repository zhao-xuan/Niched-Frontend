<template>
  <TopBar />
  <div class="container">
  <div class="row">
    <div class="col-md-8 order-0">
      <el-card style="margin: 20px auto;">
        <template #header>
          <div>
            <span>Introduction</span>
            <el-button type="text" style="float: right; margin-top: -10px"
              >Edit</el-button
            >
          </div>
        </template>
        <div class="text item">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          <br>
          <br>
          Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </div>
      </el-card>

      <el-card style="margin: 20px auto;">
        <template #header>
          <div>
            <span>Following Spaces</span>
            <el-button type="text" style="float: right; margin-top: -10px"
              >Edit</el-button
            >
          </div>
        </template>
        <p> HELLO WORLD </p>
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
      <el-card style="margin: 20px auto;">
          <div>
            <h3>Welcome, Hoang</h3>
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

</template>

<script lang="ts">
import { defineComponent, toRefs, reactive } from "vue";
import SpaceGroup from "../dashboard/SpaceGroup.vue";
import { useRoute } from "vue-router";
import TopBar from "../Topbar.vue";
import { dashboardFixture } from "../dashboard/fixtures"
import axios from "axios";

export default defineComponent({
  name: "Profile",
  components: { TopBar },
  setup() {
    const { niches, events } = toRefs(reactive(dashboardFixture));
    return {
      niches,
      events,
    };
  },
});
</script>
