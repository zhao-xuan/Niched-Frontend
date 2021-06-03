<template>
  <TopBar />
  <div style="background-color : rgb(212, 225, 253)">
    <el-avatar size="60px" src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useRoute } from "vue-router";
import TopBar from '../Topbar.vue';

export default defineComponent({
  name: "Profile",
  components : { TopBar },
  setup() {
    const route = useRoute();
    return { id: route.params.id };
  },
});
</script>
