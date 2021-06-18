<template>
  <div
    v-for="item in niches"
    :key="item"
    class="col-6 col-sm-3 py-2 px-2"
    style="overflow: hidden"
  >
    <div
      class="niche-card-parent shadow-sm clickable"
      :style="{
        backgroundImage: 'url(' + item.imgUrl + ')',
        backgroundPosition: 'center',
      }"
      @click="jumpToSpace(item.groupId)"
    >
      <div class="niched-card-overlay"></div>
    </div>
    <div class="row niche-card-header px-2">
      <div class="col-sm-10">
        {{ item.title }}
        <br />
        {{ item.detail }}
      </div>
      <div class="col-sm-2 d-flex justify-content-end">
        <i class="el-icon-user"> {{ item.memberList.length }}</i>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { useRouter } from "vue-router";
import { defineComponent, toRefs, ref, PropType, watchEffect } from "vue";
import { useFetch } from "@/hooks/useFetch";
import { SpacesResponse, fetchSpaces } from "@/api/spaces";
import { dashboardFixture } from "./fixtures";

type Niche = {
  title: string;
  detail: string;
  imgUrl: string;
  memberList: string[];
  id: string;
};

export default defineComponent({
  props: {
    niches: {
      required: true,
      type: Array as PropType<Niche[]>,
    },
  },
  setup() {
    const router = useRouter();
    return {
      jumpToSpace(item: string) {
        router.push({ name: "Space", params: { id: item } });
      },
    };
  },
});
</script>
<style>
@import "../assets/styles/niched-styles.css";
</style>
