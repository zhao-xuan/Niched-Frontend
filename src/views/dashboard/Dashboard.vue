<template>
  <h1>this is a dashboard page where u see a list of spaces to join</h1>
  <!-- <a-icon type="mail" /> icon not loaded from antd-->
  <a-row type="flex" justify="space-around" style="margin-top: 100px">
    <a-card
      hoverable
      v-for="item in items"
      :key="item"
      :title="`${item} space`"
      style="width: 300px"
      @click="jumpToSpace(item)"
    >
      <p>card content</p>
      <p>card content</p>
      <p>card content</p>
    </a-card>
  </a-row>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "Dashboard",
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
