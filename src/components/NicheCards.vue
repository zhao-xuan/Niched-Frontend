<template>
  <div v-for="item in niches" :key="item" class="col-6 col-sm-3 py-2 px-2">
    <div
      class="niche-card-parent shadow-sm clickable"
      :style="{
        backgroundImage: 'url(' + item.imgUrl + ')',
        backgroundPosition: 'center',
      }"
      @click="jumpToSpace(item.groupId)"
    >
      <div class="niched-card-overlay">
        <div class="niche-description px-2 py-2">
          <b>
            {{ item.detail }}
            <br />
            Members: {{ item.memberList.length }}
          </b>
        </div>
      </div>
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
import { defineComponent, toRefs, ref, PropType, watchEffect } from "vue";
import { useFetch } from "@/hooks/useFetch";
import { SpacesResponse, fetchSpaces } from "@/api/spaces";
import { dashboardFixture } from "./fixtures";

type Niche = {
  title: string;
  detail: string;
  imgUrl: string;
  memberList: string[];
};

export default defineComponent({
  props: {
    niches: {
      required: true,
      type: Array as PropType<Niche[]>,
    },
  },
  //   setup() {
  //     const router = useRouter();
  //     type Niche = {
  //       title: string;
  //       detail: string;
  //       imgUrl: string;
  //       memberList: string[];
  //     };
  //     var randomNiches: Niche[] = [];
  //     const { allNiches, popularNiches } = toRefs(reactive(dashboardFixture));

  //     const { fetched, fetching, data } = useFetch<SpacesResponse>(
  //       fetchSpaces,
  //       true
  //     );
  //     watchEffect(() => {
  //       if (fetched.value) {
  //         const items = Object.values(data.value || {}).map(
  //           ({ group_id, name, description, image_url, members }) => ({
  //             groupId: group_id,
  //             title: name,
  //             detail: description,
  //             imgUrl:
  //               image_url ||
  //               "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8dG9reW98ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80",
  //             memberList: members,
  //           })
  //         );

  //         allNiches.value = items;

  //         // Get 6 random niches to display!
  //         for (let i = 0; i < 6; i++) {
  //           randomNiches.push(items[Math.floor(Math.random() * items.length)]);
  //           console.log(randomNiches);
  //         }

  //         popularNiches.value = randomNiches;
  //       }
  //     });
  //     return {
  //       allNiches,
  //       fetching,
  //       popularNiches,
  //       jumpToSpace(item: string) {
  //         router.push({ name: "Space", params: { id: item } });
  //       },
  //     };
  //   },
});
</script>
<style>
@import "../assets/styles/niched-styles.css";
</style>
