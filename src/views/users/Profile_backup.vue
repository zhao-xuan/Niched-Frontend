<template>
  <TopBar />
  <el-container>
    <el-main>
      <el-card style="margin: 20px auto; width: 80%; float: right;">
        <template #header>
          <div>
            <span>Introduction</span>
            <el-button type="text" style="float: right; margin-top: -10px"
              >Edit</el-button
            >
          </div>
        </template>
        <div class="text item">This is Leo the genius :)</div>
      </el-card>

      <el-card style="margin: 20px auto; width: 80%; float: right;%">
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

      <el-card style="margin: 20px auto; width: 80%; float: right;">
        <template #header>
          <div>
            <span>About Hoang</span>
            <el-button type="text" style="float: right; margin-top: -10px"
              >Edit</el-button
            >
          </div>
        </template>
        <div v-for="o in 4" :key="o" class="text item">
          {{ "List item " + o }}
        </div>
      </el-card>

      <el-card style="margin: 20px auto; width: 80%; float: right;">
        <template #header>
          <div>
            <span>Intro</span>
            <el-button type="text" style="float: right; margin-top: -10px"
              >Edit</el-button
            >
          </div>
        </template>
        <div v-for="o in 4" :key="o" class="text item">
          {{ "List item " + o }}
        </div>
      </el-card>

      <el-card style="margin: 20px auto; width: 80%; float: right;">
        <template #header>
          <div>
            <span>Intro</span>
            <el-button type="text" style="float: right; margin-top: -10px"
              >Edit</el-button
            >
          </div>
        </template>
        <div v-for="o in 4" :key="o" class="text item">
          {{ "List item " + o }}
        </div>
      </el-card>
    </el-main>
    <el-aside width="30%;">
      <div style="margin: 40px">
        <el-card style="margin: 20px auto; width: 60%">
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
        <el-card style="margin: 20px auto; width: 60%">
          <div>
            <h3>Your Niches</h3>
            <p>Keep up to date with the things you're interested in!</p>
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
    // const route = useRoute();
    // return {
    //   id: route.params.id,
    // };
    return {
      niches,
      events,
    };
  },
  // mounted() {
  //   // this is a test
  //   axios
  //     .get("http://127.0.0.1:8080/group/somepeople", {
  //       // group_id: "somepeople",
  //       // name: "tom space",
  //       // description: "this is a space created by tom",
  //       // image_url: "https://www.w3.org/Style/Woolly/woolly-mc.png"
  //     })
  //     .then((res) => {
  //       console.log(res);
  //     });
  // },
});
</script>
