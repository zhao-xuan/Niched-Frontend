<template>
  <div class="pt-2" v-loading.fullscreen.lock="fetching">
    <div class="row justify-content-between">
      <div class="col-8">
        <h4><i class="el-icon-date"></i> Find Events</h4>
      </div>
      <div class="col-4">
        <div style="color: grey">
          <div class="">
            <el-input
              v-model="titleSearch"
              size="small "
              placeholder="E.g. Tournament"
            />
          </div>
          <div class="px-2" style="float: right">
            <i class="el-icon-search"></i> Search by Keyword
          </div>
        </div>
      </div>
    </div>
    <div class="pt-2">
      <el-tabs v-model="selectedTab">
        <el-tab-pane label="Upcoming" name="upcomingEvents">
          <h6 class="text-dark">
            Check out upcoming events from other Niches!
          </h6>
          <div class="row">
            <div class="col-0 col-md-2"></div>
            <div class="col-12 col-md-8">
              <EventsByMonthDate
                :events="
                  futureEvents.filter(
                    (data) =>
                      !titleSearch ||
                      data.title
                        .toLowerCase()
                        .includes(titleSearch.toLowerCase())
                  )
                "
                :niches="allNiches"
                @click-event="jumpToEvent"
              />
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="Past" name="pastEvents">
          <h6 class="text-dark">Find all past events here.</h6>
          <div class="row">
            <div class="col-0 col-md-2"></div>
            <div class="col-12 col-md-8">
              <EventsByMonthDate
                :events="
                  pastEvents.filter(
                    (data) =>
                      !titleSearch ||
                      data.title
                        .toLowerCase()
                        .includes(titleSearch.toLowerCase())
                  )
                "
                :niches="allNiches"
                @click-event="jumpToEvent"
              />
            </div></div
        ></el-tab-pane>
        <el-tab-pane label="Popular" name="popularEvents">
          <h6 class="text-dark">See the trending events on Niched.</h6>
          <div class="row">
            <div class="col-0 col-md-2"></div>
            <div class="col-12 col-md-8">
              <EventsByMonthDate
                :events="
                  popularEvents.filter(
                    (data) =>
                      !titleSearch ||
                      data.title
                        .toLowerCase()
                        .includes(titleSearch.toLowerCase())
                  )
                "
                :niches="allNiches"
                @click-event="jumpToEvent"
              />
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="All" name="allEvents">
          <h6 class="text-dark">
            Search the entire collection of all events: past, present and
            future!
          </h6>
          <div class="row">
            <div class="col-0 col-md-2"></div>
            <div class="col-12 col-md-8">
              <EventsByMonthDate
                :events="
                  sortedEvents.filter(
                    (data) =>
                      !titleSearch ||
                      data.title
                        .toLowerCase()
                        .includes(titleSearch.toLowerCase())
                  )
                "
                :niches="allNiches"
                @click-event="jumpToEvent"
              />
            </div>
          </div>
        </el-tab-pane>
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
    const router = useRouter();

    const allNiches = ref<Space[]>([]);

    const { events } = useAllEvents(true);
    const sortedEvents = computed(() =>
      [...events.value].sort(
        (a: Event, b: Event) =>
          Number(new Date(b.eventDate)) - Number(new Date(a.eventDate))
      )
    );
    const pastEvents = computed(() =>
      [...sortedEvents.value].filter(
        (a: Event) => Number(new Date()) - Number(new Date(a.eventDate)) >= 0
      )
    );
    const futureEvents = computed(() =>
      [...sortedEvents.value]
        .reverse()
        .filter(
          (a: Event) => Number(new Date()) - Number(new Date(a.eventDate)) < 0
        )
    );

    // Define popular events to be events with more than 1 person interested.
    const popularEvents = computed(() =>
      [...sortedEvents.value].filter(
        (a: Event) => a.members.going.length + a.members.interested.length >= 1
      )
    );

    const {
      fetched: fetchedSpaces,
      fetching,
      data,
    } = useFetch<SpacesResponse>(fetchSpaces, true);

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
    });

    const selectedTab = ref("upcomingEvents");
    const titleSearch = ref("");

    return {
      selectedTab,
      allNiches,
      sortedEvents,
      pastEvents,
      futureEvents,
      popularEvents,
      fetching,
      titleSearch,

      jumpToSpace(item: string) {
        router.push({ name: "Space", params: { id: item } });
      },
      jumpToEvent(eventId: string) {
        const groupId = sortedEvents.value.find(
          (item) => item.eventId === eventId
        )?.groupId;
        router.push({ path: `/event/${groupId}/${eventId}` });
      },
    };
  },
});
</script>

<style>
@import "../../assets/styles/niched-styles.css";
</style>
