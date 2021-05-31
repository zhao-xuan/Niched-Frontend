<template>
  <h1>this is a dashboard page where u see a list of spaces to join</h1>

  <el-row :gutter="20">
    <el-col
      span="6"
      class="box-card"
      v-for="item in items"
      :key="item"
      :title="`${item} space`"
      style="cursor: pointer"
      @click="jumpToSpace(item)"
    >
      <el-card style="color: red">
        {{ "List item " + item }}
      </el-card>
    </el-col>
  </el-row>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "Dashboard",
  components: {},
  setup() {
    const router = useRouter();
    return {
      items: ["ramen", "pokemon", "3D modelling"],
      jumpToSpace(item: string) {
        router.push({ name: "Space", params: { id: item } });
      },
    };
  },
});
</script>
