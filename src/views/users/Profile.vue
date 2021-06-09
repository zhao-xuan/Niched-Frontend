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
    <div class="text item">this is {{ userName }}</div>
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
import { useRouter } from "vue-router";
import TopBar from "../Topbar.vue";
import { useState } from "@/state";

export default defineComponent({
  name: "Profile",
  components: { TopBar },
  setup() {
    const router = useRouter();
    const { userName, loggedIn } = useState();
    if (!loggedIn.value) {
      router.push({ name: "Login" });
    }
    return {
      userName,
    };
  },
});
</script>
