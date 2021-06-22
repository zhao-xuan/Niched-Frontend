<template>
  <TopBar />

  <div
    class="container card-page-container"
    v-loading.fullscreen.lock="
      postingEvent || postingThread || fetchingEvents || fetchingThreads
    "
  >
    <div class="row py-5 px-4 niched-bg">
      <div class="col-md-12 mx-auto">
        <div class="bg-light shadow rounded overflow-hidden mt-3s">
          <div
            class="px-4 pt-0 pb-5 cover rounded"
            id="here"
            :style="{
              backgroundImage: 'url(' + imageUrl + ')',
              backgroundPosition: 'center',
              height: '400px',
            }"
          ></div>

          <div
            class="row justify-content-between py-3"
            style="background-color: white"
          >
            <div class="col-12">
              <h6 class="pl-4 pb-0 mb-0" style="color: red">
                <span class="pr-2">
                  <el-tag type="danger" effect="dark">Niche</el-tag>
                </span>
                <span class="pr-2 clickable" @click="jumpToSpace(groupId)">
                  {{ groupId }}
                </span>
              </h6>
            </div>
            <div class="col-sm-12 col-md-8">
              <div class="pl-4 d-flex text-left">
                <h2>{{ name }}</h2>
              </div>
            </div>
            <div class="col-sm-12 col-md-4">
              <div class="row justify-content-end">
                <div class="px-5 col-xl-6 col-lg-8 col-md-12 col-sm-12">
                  <el-button
                    @click="onJoinGroup()"
                    type="primary"
                    :plain="joinedGroup"
                    :loading="joiningGroupStatus || leavingGroupStatus"
                    :icon="joinedGroup && 'el-icon-check'"
                  >
                    <b> {{ joinedGroup ? "Joined" : "Join" }}</b>
                  </el-button>
                </div>
              </div>
            </div>
          </div>

          <div class="row pb-4 px-4">
            <div class="col-md-8">
              <el-tabs v-model="selectedTab">
                <el-tab-pane name="threads" class="px-3">
                  <template #label>
                    <span
                      ><i class="el-icon-chat-line-square"></i> Threads</span
                    >
                  </template>
                  <CreateThread
                    v-show="selectedTab == 'threads'"
                    v-model:postingThread="postingThread"
                  />
                  <div
                    v-for="(thread, i) in threads.slice().reverse()"
                    :key="thread.threadId"
                  >
                    <card class="mt-3 px-3">
                      <div class="d-flex justify-content-between">
                        <div class="d-flex align-items-center">
                          <img
                            class="rounded-circle pl-1"
                            :src="`https://randomuser.me/api/portraits/men/${i}.jpg`"
                            style="width: 32px"
                          />
                          <div class="ml-2 my-2" style="font-weight: 500">
                            {{ thread.authorId }}
                          </div>
                        </div>
                        <div class="text-secondary" style="font-weight: 400">
                          {{ Moment(thread.creationDate).fromNow() }}
                        </div>
                      </div>
                      <div
                        class="clickable"
                        @click="jumpToThread(thread.threadId)"
                      >
                        <div class="my-1">
                          <b>{{ thread.title }}</b>
                        </div>
                        <div class="text item my-1">
                          {{ thread.description }}
                        </div>
                      </div>
                      <div
                        class="
                          d-flex
                          align-items-center
                          justify-content-between
                          mx-1
                        "
                        style="color: #b3b3b3"
                      >
                        <div class="d-flex">
                          <div class="mr-3">
                            <i class="el-icon-chat-line-round mx-1" /><b>{{
                              Math.floor(Math.random() * 100 + 1)
                            }}</b>
                          </div>
                          <div><i class="el-icon-share mr-1" />share</div>
                        </div>
                        <div>
                          <el-button
                            type="primary"
                            class="mx-1 my-2"
                            plain
                            @click="jumpToThread(thread.threadId)"
                          >
                            Reply
                          </el-button>
                        </div>
                      </div>
                    </card>
                  </div>
                </el-tab-pane>
                <el-tab-pane name="upcomingEvents" class="px-3">
                  <template #label>
                    <span><i class="el-icon-place"></i> Upcoming Events</span>
                  </template>
                  <div class="pb-5">
                    <EventsByMonthDate
                      :events="futureEvents"
                      @click-event="jumpToEvent"
                    />
                  </div>
                </el-tab-pane>

                <el-tab-pane name="pastEvents" class="px-3">
                  <template #label>
                    <span><i class="el-icon-place"></i> Past Events</span>
                  </template>
                  <div class="pb-5">
                    <EventsByMonthDate
                      :events="pastEvents"
                      @click-event="jumpToEvent"
                    />
                  </div>
                </el-tab-pane>

                <el-tab-pane name="members">
                  <template #label>
                    <span
                      ><i class="el-icon-user"></i>
                      Members
                    </span>
                  </template>
                  <div class="pt-3 px-2">
                    <Members :userNames="members" />
                  </div>
                </el-tab-pane>
              </el-tabs>
            </div>

            <div class="col-md-4">
              <AboutSpace
                v-show="selectedTab == 'threads' || selectedTab == 'members'"
                :members="members"
                :threads="threads"
                :events="events"
                :tags="tags"
                :groupId="groupId"
              />
              <div class="mt-5">
                <DatePicker
                  v-model="date"
                  v-show="
                    selectedTab == 'upcomingEvents' ||
                    selectedTab == 'pastEvents'
                  "
                  is-expanded
                />
              </div>
              <CreateEvent
                v-show="
                  selectedTab == 'upcomingEvents' || selectedTab == 'pastEvents'
                "
                v-model:postingEvent="postingEvent"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import TopBar from "../Topbar.vue";
import { ref, defineComponent, watch, computed, ComputedRef } from "vue";
import { useSpace } from "@/hooks/useSpace";
import { useEvents } from "@/hooks/useEvent";
import { useThreads } from "@/hooks/useThread";
import { useRoute, useRouter } from "vue-router";
import AboutSpace from "./AboutSpace.vue";
import CreateThread from "../thread/CreateThread.vue";
import CreateEvent from "../event/CreateEvent.vue";
import Members from "@/components/Members.vue";
import { useState } from "@/state";
import { usePost } from "@/hooks/usePost";
import { postJoinGroup, postLeaveGroup } from "@/api/space";
import Card from "@/components/Card.vue";
import EventsByMonthDate from "../event/EventsByMonthDate.vue";
import { Event } from "@/api/event";
import Moment from "moment";
import { DatePicker } from "v-calendar";

export default defineComponent({
  name: "Space",
  components: {
    TopBar,
    AboutSpace,
    EventsByMonthDate,
    CreateThread,
    CreateEvent,
    Members,
    Card,
    DatePicker,
  },
  setup() {
    const postingThread = ref(false);
    const postingEvent = ref(false);

    const joinedGroup = ref(false);

    const router = useRouter();
    const route = useRoute();
    const groupId = route.params.id as string;
    const { userName, loggedIn } = useState();

    const {
      name,
      imageUrl,
      description,
      members,
      creationDate,
      tags,
      doFetch: doFetchSpace,
    } = useSpace(groupId, true);
    const {
      events,
      fetching: fetchingEvents,
      doFetch: doFetchEvents,
    } = useEvents(groupId, true);
    const sortedEvents = computed(() =>
      [...events.value].sort(
        (a: Event, b: Event) =>
          Number(new Date(b.eventDate)) - Number(new Date(a.eventDate))
      )
    );

    const pastEvents = computed(() =>
      [...sortedEvents.value].filter((e: Event) => {
        if (!date.value) {
          return Number(new Date()) - Number(new Date(e.eventDate)) >= 0;
        } else {
          return (
            new Date(e.eventDate).getFullYear() === date.value.getFullYear() &&
            new Date(e.eventDate).getDate() === date.value.getDate() &&
            new Date(e.eventDate).getMonth() === date.value.getMonth()
          );
        }
      })
    );

    const futureEvents = computed(() =>
      [...sortedEvents.value].reverse().filter((e: Event) => {
        if (!date.value) {
          return Number(new Date()) - Number(new Date(e.eventDate)) < 0;
        } else {
          return (
            new Date(e.eventDate).getFullYear() === date.value.getFullYear() &&
            new Date(e.eventDate).getDate() === date.value.getDate() &&
            new Date(e.eventDate).getMonth() === date.value.getMonth()
          );
        }
      })
    );

    const { doPost: doPostJoinGroup, posting: joiningGroupStatus } =
      usePost(postJoinGroup);
    const { doPost: doPostLeaveGroup, posting: leavingGroupStatus } =
      usePost(postLeaveGroup);

    watch(members, (members) => {
      joinedGroup.value = members.includes(userName.value);
    });

    watch([joiningGroupStatus, leavingGroupStatus], ([cj, cl], [pj, pl]) => {
      if ((!cj && pj) || (!cl && pl)) {
        //fetch after posting event status is completed
        doFetchSpace();
      }
    });

    const onJoinGroup = async () => {
      if (!loggedIn.value) {
        alert("Please login first");
        return;
      }

      const userStatus = {
        userName: userName.value,
        groupId,
      };
      if (joinedGroup.value) {
        doPostLeaveGroup(userStatus);
      } else {
        doPostJoinGroup(userStatus);
      }
    };

    const {
      threads,
      fetching: fetchingThreads,
      doFetch: doFetchThreads,
    } = useThreads(groupId, true);

    const jumpToEvent = (eventId: string) => {
      router.push({ path: `/event/${groupId}/${eventId}` });
    };

    const jumpToThread = (threadId: string) => {
      router.push({ path: `/thread/${groupId}/${threadId}` });
    };

    watch([postingEvent, postingThread], ([ce, ct], [oe, ot]) => {
      //reload events data when posting new event/thread ends
      if (!ce && oe) {
        doFetchEvents();
      }
      if (!ct && ot) {
        doFetchThreads();
      }
    });

    const selectedTab = ref("threads");

    const date = ref<Date | null>(null);
    const filteredSortedEvents = ref(sortedEvents.value);

    watch(sortedEvents, (se) => {
      filteredSortedEvents.value = se;
    });

    return {
      userName,

      name,
      imageUrl,
      description,
      members,
      creationDate,
      tags,
      groupId,

      events: filteredSortedEvents,
      fetchingEvents,
      postingEvent,

      threads,
      fetchingThreads,
      postingThread,

      jumpToEvent,
      jumpToThread,

      selectedTab,

      joinedGroup,
      onJoinGroup,

      joiningGroupStatus,
      leavingGroupStatus,

      Moment,
      date,

      pastEvents,
      futureEvents,
    };
  },
});
</script>

<style>
@import "../../assets/styles/niched-styles.css";

.profile-head {
  transform: translateY(5rem);
}

.cover {
  background-size: cover;
  background-repeat: no-repeat;
}
</style>
