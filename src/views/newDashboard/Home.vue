<template>
  <div>
    <div class="pt-2">
      <h1 class="text-dark" style="text-align: center">Welcome to niched</h1>
      <p style="text-align: center">
        <h7 style="color: red">
          Discover new hobbies, attend new events, make new friends
        </h7>
      </p>
      <!-- <h1 class="px-2" style="text-align: center">Welcome to Niched!</h1> -->
    </div>
    <div class="pt-2 px-2">
      <h5 style="color: red">
        <i class="el-icon-medal-1"></i> Featured Niches
      </h5>
      <el-carousel :interval="4000" type="card" height="200px">
        <el-carousel-item v-for="item in 6" :key="item">
          <img
            src="https://pokemongolive.com/img/posts/anniversaryposter2019.jpg"
            alt="Cheetah!"
            style="object-fit: cover"
          />
        </el-carousel-item>
      </el-carousel>
    </div>
    <div class="px-2 pt-2 pb-3">
      <h5 style="color: red">
        <i class="el-icon-medal-1"></i> Your Favourite Niches
      </h5>
      <div class="row">
        <NicheCards :niches="allNiches" />
      </div>
    </div>
    <div class="px-2 pt-2 pb-3">
      <h5 style="color: red">
        <i class="el-icon-medal-1"></i> Most Popular Niches
      </h5>
      <div class="row">
        <NicheCards :niches="mostMemberNiches" />
      </div>
    </div>

    <div class="row">
      <div class="col-sm-6">
        <div class="px-2 pt-2 pb-3">
          <h5 style="color: red">
            <i class="el-icon-medal-1"></i> Recommended for You
          </h5>
          <div class="row">
            <NicheCards :niches="recommendedNiches" />
          </div>
        </div>
      </div>
      <div class="col-sm-6">
        <div class="px-2 pt-2 pb-3">
          <h5 style="color: red">
            <i class="el-icon-medal-1"></i> Suggested Events
          </h5>
          <div class="row">
            <NicheCards :niches="recommendedNiches" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { ref, defineComponent, watch } from "vue";
import { useRouter } from "vue-router";
import { toRefs, reactive, watchEffect } from "vue";
import { useFetch } from "@/hooks/useFetch";
import { SpacesResponse, fetchSpaces } from "@/api/spaces";
import { dashboardFixture } from "../../components/fixtures";
import NicheCards from "@/components/NicheCards.vue";

export default defineComponent({
  components: { NicheCards },
  name: "Home",
  setup() {
    const router = useRouter();
    const { allNiches, popularNiches, mostMemberNiches, recommendedNiches } =
      toRefs(reactive(dashboardFixture));

    const { fetched, fetching, data } = useFetch<SpacesResponse>(
      fetchSpaces,
      true
    );
    watchEffect(() => {
      if (fetched.value) {
        const items = Object.values(data.value || {}).map(
          ({ group_id, name, description, image_url, members }) => ({
            groupId: group_id,
            title: name,
            detail: description,
            imgUrl:
              image_url ||
              "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8dG9reW98ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80",
            memberList: members,
          })
        );
        allNiches.value = items.slice(0, 8);
        mostMemberNiches.value = items.slice(8, 12);
        recommendedNiches.value = items.slice(0, 12);
      }
    });
    return {
      allNiches,
      fetching,
      popularNiches,
      mostMemberNiches,
      recommendedNiches,
      jumpToSpace(item: string) {
        router.push({ name: "Space", params: { id: item } });
      },
    };
  },
  data() {
    return {
      // Data for "Featured Events" Top carousel section.
      // Should be an array of length 6 with top suggested events
      // TODO

      // Data for "Upcoming Events" section
      // Should be a short array of user's events
      upcomingEvents: [
        {
          date: "05-03",
          name: "Ramen Lovers",
          address: "No. 189, Grove St, Los Angeles",
        },
        {
          date: "05-02",
          name: "Mario Kart",
          address: "No. 189, Grove St, Los Angeles",
        },
        {
          date: "05-04",
          name: "Badminton",
          address: "No. 189, Grove St, Los Angeles",
        },
        {
          date: "05-01",
          name: "CSGO",
          address: "No. 189, Grove St, Los Angeles",
        },
      ],
    };
  },
});
</script>
<style>
@import "../../assets/styles/niched-styles.css";
</style>
