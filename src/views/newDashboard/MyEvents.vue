<template>
  <div>
    <div class="px-2 pt-2">
      <div class="row">
        <div class="col" style="color: red">
          <i class="el-icon-date"></i> Upcoming Events
        </div>
      </div>
      <el-carousel indicator-position="outside">
        <el-carousel-item v-for="item in 4" :key="item">
          <div
            class="all-niches-carousel clickable"
            :style="{
              backgroundImage:
                'url(https://pokemongolive.com/img/posts/anniversaryposter2019.jpg)',
              backgroundPosition: 'center',
            }"
            @click="jumpToSpace(item.groupId)"
          >
            <h2 class="py-4" style="color: white; text-align: center"></h2>
          </div>
        </el-carousel-item>
      </el-carousel>
    </div>

    <div class="row justify-content-between">
      <div class="col-8">
        <h4 style="color: red"><i class="el-icon-medal-1"></i> Find Events</h4>
      </div>
      <div class="col-4">
        <div style="color: grey">
          <div class="">
            <el-input
              v-model="search"
              size="small "
              placeholder="E.g. Counter Strike"
            />
          </div>
          <div class="px-2" style="float: right">
            <i class="el-icon-search"></i> Search by Space
          </div>
        </div>
      </div>
    </div>
    <div class="pt-2">
      <el-tabs v-model="selectedTab" @tab-click="handleClick">
        <el-tab-pane label="Upcoming" name="upcomingEvents">
          <div class="row">
            <div class="col-0 col-md-2"></div>
            <div class="col-12 col-md-8">
              <EventsByMonthDate
                :events="allEvents"
                :niches="allNiches"
                @click-event="jumpToEvent"
              />
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="Past" name="pastEvents"> </el-tab-pane>
        <el-tab-pane label="Popular" name="popularEvents"> </el-tab-pane>
        <el-tab-pane label="All" name="allEvents"> </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  watch,
  ref,
  watchEffect,
  computed,
  ComputedRef,
} from "vue";
import { useRoute, useRouter } from "vue-router";
import TopBar from "../Topbar.vue";
import Card from "@/components/Card.vue";
import { useState } from "@/state";
import { useSpace } from "@/hooks/useSpace";
import { Space } from "@/api/space";
import { Event } from "@/api/event";
import { useUser } from "@/hooks/useUser";
import { useFetch } from "@/hooks/useFetch";
import { fetchSpaces, SpacesResponse } from "@/api/spaces";
import { useAllEvents } from "@/hooks/useEvent";
import EventsByMonthDate from "../event/EventsForHomepage.vue";

export default defineComponent({
  name: "AllEvents",
  components: { EventsByMonthDate },
  setup() {
    const lock = ref(true);
    const groupsJoined = ref<Space[]>([]);
    const allEvents = ref<Event[]>([]);
    const selfProfile = ref(true);

    const route = useRoute();
    const router = useRouter();
    const userName = route.params.userName as string;
    const {
      loading,
      loggedIn,
      userName: loggedInUserName,
      subscribedGroups: loggedInGroups,
      interests: loggedInInterests,
    } = useState();
    const allNiches = ref<Space[]>([]);

    const { events } = useAllEvents(true);
    const sortedEvents = computed(() =>
      [...events.value].sort(
        (a: Event, b: Event) =>
          Number(new Date(b.eventDate)) - Number(new Date(a.eventDate))
      )
    );

    const { fetched: fetchedSpaces, data } = useFetch<SpacesResponse>(
      fetchSpaces,
      true
    );

    watchEffect(() => {
      if (fetchedSpaces.value) {
        const items = Object.values(data.value || {}).map(
          ({
            group_id,
            author_id,
            name,
            description,
            image_url,
            creation_date,
            members,
            tags,
          }) => ({
            groupId: group_id,
            authorId: author_id,
            name,
            description,
            imageUrl:
              image_url ||
              "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8dG9reW98ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80",
            members,
            tags,
            creationDate: creation_date,
          })
        );

        allNiches.value = items;
      }

      if (events.value) {
        allEvents.value = events.value;
      }
    });

    const selectedTab = ref("upcomingEvents");

    return {
      selectedTab,
      allEvents,
      allNiches,
      jumpToSpace(item: string) {
        router.push({ name: "Space", params: { id: item } });
      },
    };
  },
});
</script>

<style>
@import "../../assets/styles/niched-styles.css";
</style>
