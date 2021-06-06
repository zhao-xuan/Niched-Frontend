<template>
  <TopBar />
  <div style="background-color: rgb(212, 225, 253)">
    <div style="width: 150px; margin: auto">
      <el-avatar
        :size="150"
        src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
        style="margin-top: 40px; margin-bottom: 40px; width: 100%"
      ></el-avatar>
    </div>
  </div>

  <el-card style="margin: 20px auto; width: 60%">
    <template #header>
      <div>
        <span>Intro</span>
        <el-button type="text" style="float: right; margin-top: -10px"
          >Edit</el-button
        >
      </div>
    </template>
    <div class="text item">This is Leo the genius :)</div>
  </el-card>

  <el-card style="margin: 20px auto; width: 60%">
    <template #header>
      <div>
        <span>Tags</span>
        <el-button type="text" style="float: right; margin-top: -10px"
          >Edit</el-button
        >
      </div>
    </template>
    <div v-for="o in 4" :key="o" class="text item">
      {{ "List item " + o }}
    </div>
  </el-card>

  <el-card style="margin: 20px auto; width: 60%">
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

  <el-card style="margin: 20px auto; width: 60%">
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

  <el-card style="margin: 20px auto; width: 60%">
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
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useRoute } from "vue-router";
import TopBar from "../Topbar.vue";
import axios from "axios";

export default defineComponent({
  name: "Profile",
  components: { TopBar },
  setup() {
    const route = useRoute();
    return {
      id: route.params.id,
    };
  },
  mounted() {
    // this is a test
    axios
      .get("http://127.0.0.1:8080/group/somepeople", {
        // group_id: "somepeople",
        // name: "tom space",
        // description: "this is a space created by tom",
        // image_url: "https://www.w3.org/Style/Woolly/woolly-mc.png"
      })
      .then((res) => {
        console.log(res);
      });
  },
});
</script>
