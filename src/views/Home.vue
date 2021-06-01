<template>
  <el-menu
    :default-active="activeIndex2"
    mode="horizontal"
    @select="handleSelect"
    background-color="#8a00e6"
    text-color="#fff"
    active-text-color="#ffd04b"
  >
    <el-col :span="16" class="bg-purple">
      <div style="margin: 30px">niched</div></el-col
    >

    <el-menu-item index="1">Processing Center</el-menu-item>
    <el-submenu index="2">
      <template #title>Workspace</template>
      <el-menu-item index="2-1">item one</el-menu-item>
      <el-menu-item index="2-2">item two</el-menu-item>
      <el-menu-item index="2-3">item three</el-menu-item>
      <el-submenu index="2-4">
        <template #title>item four</template>
        <el-menu-item index="2-4-1">item one</el-menu-item>
        <el-menu-item index="2-4-2">item two</el-menu-item>
        <el-menu-item index="2-4-3">item three</el-menu-item>
      </el-submenu>
    </el-submenu>
    <el-menu-item index="4"
      ><a href="https://www.ele.me" target="_blank">Orders</a></el-menu-item
    >
  </el-menu>
  <Dashboard />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Dashboard from "./dashboard/Dashboard.vue";

export default defineComponent({
  name: "Home",
  components: { Dashboard },
});
</script>
