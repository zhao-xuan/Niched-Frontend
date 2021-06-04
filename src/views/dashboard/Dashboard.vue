<template>
  <el-container>
    <el-main>
      <SpaceGroup
        v-bind:spacelist="recommend"
        title="Today's Recommended Niches"
      />
      <SpaceGroup
        v-for="item in niches"
        :key="item"
        :spacelist="item.spaces"
        :title="item.tagName"
      />
    </el-main>
    <el-aside width="30%">
      <div style="margin: 40px">
        <el-card style="border-radius: 20px">
          <div>
            <h3>Home</h3>
            <p>
              Your personalized Niched homepage. Come here to check in with your
              favorite communities
            </p>
          </div>
          <div>
            <h3>Event</h3>
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
    </el-aside>
  </el-container>
</template>

<style>
.niche-card-image {
  width: 80px;
  height: 80px;
}

.niche-card {
  margin: 10px;
}
</style>

<script lang="ts">
import { defineComponent, toRefs, reactive, watchEffect } from "vue";
import SpaceGroup from "./SpaceGroup.vue";
import { useFetch } from "@/hooks/useFetch";
import { useIsMountedRef } from "@/hooks/useIsMountedRef";
import { dashboardFixture } from "./fixtures";
import { SpacesResponse, fetchSpaces } from "@/api/dashboard/spaces";

export default defineComponent({
  name: "Dashboard",
  components: { SpaceGroup },
  setup() {
    const { recommend, niches, events } = toRefs(reactive(dashboardFixture));

    const { fetched, data } = useFetch<SpacesResponse>(fetchSpaces, true);
    watchEffect(() => {
      if (fetched.value) {
        const items = Object.values(data.value || {}).map(
          ({ name, description, image_url }) => ({
            title: name,
            detail: description,
            imgUrl:
              image_url ||
              "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8dG9reW98ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80",
          })
        );

        recommend.value = items;
      }
    });
    return {
      recommend,
      niches,
      events,
    };
  },
});
</script>
