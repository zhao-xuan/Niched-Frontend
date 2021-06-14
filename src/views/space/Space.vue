<template>
  <TopBar />
  <div
    class="container-fluid"
    v-loading.fullscreen.lock="
      postingEvent || postingThread || fetchingEvents || fetchingThreads
    "
  >
    <div class="row py-5 px-4 niched-bg">
      <div class="col-md-10 mx-auto">
        <!-- Profile widget -->
        <div class="bg-light shadow rounded overflow-hidden mt-3s">
          <div
            class="px-4 pt-0 pb-5 cover rounded"
            id="here"
            :style="{
              backgroundImage: 'url(' + imageUrl + ')',
              backgroundPosition: 'center',
              height: '400px',
            }"
          >
            <div class="mb-2 text-white d-flex justify-content-center">
              <div class="px-4">
                <!-- <h2 class="pt-5 my-4">

                {{ "Apple WWDC Event Watching Session" }}
              </h2> -->
              </div>
            </div>
          </div>

          <div class="row">
            <div class="col-sm-6">
              <div class="px-4 pt-3 d-flex text-left">
                <h2>{{ name }}</h2>
              </div>
            </div>
          </div>

          <div class="row pb-4 px-4">
            <div class="col-md-8">
              <el-tabs v-model="selectedTab">
                <el-tab-pane name="threads">
                  <template #label>
                    <span
                      ><i class="el-icon-chat-line-square"></i> Threads</span
                    >
                  </template>
                  <el-card
                    class="m-3"
                    shadow="hover"
                    v-for="thread in threads.slice().reverse()"
                    :key="thread.threadId"
                  >
                    <template #header>
                      <div class="d-flex flex-row justify-content-between">
                        <div>
                          <span
                            ><b>{{ thread.title }}</b></span
                          >
                        </div>
                        <div>
                          <el-button type="text"
                            >{{
                              creationDate.split("-")[1] +
                              "/" +
                              creationDate.split("-")[0]
                            }}<b>@{{ thread.authorId }}</b></el-button
                          >
                        </div>
                      </div>
                    </template>
                    <div class="text item">
                      {{ thread.description }}
                    </div>
                  </el-card>
                </el-tab-pane>

                <el-tab-pane name="events">
                  <template #label>
                    <span><i class="el-icon-place"></i> Events </span>
                  </template>
                  <el-card
                    v-for="event in events.slice().reverse()"
                    :key="event.eventId"
                    style="margin: 20px auto; background-color: #ffe8e0"
                  >
                    <template #header>
                      <div>
                        <span>
                          <a href="" @click="jumpToEvent(event.eventId)">
                            <b
                              ><font color="#FF7744">Event: </font>
                              {{ event.title }}</b
                            >
                          </a>
                        </span>
                        <el-button
                          type="text"
                          style="
                            float: right;
                            margin-top: -10px;
                            text-align: right;
                          "
                          >{{ event.eventDate.split("T")[0] }} at
                          {{ event.eventDate.split("T")[1] }}<br /><b
                            >@{{ event.authorId }}</b
                          ></el-button
                        >
                      </div>
                    </template>
                    <div class="text item">
                      {{ event.description }}
                    </div>
                  </el-card>
                </el-tab-pane>

                <el-tab-pane name="popular">
                  <template #label>
                    <span>
                      <i class="el-icon-star-off"></i>
                      Popular
                    </span>
                  </template>
                  TODO
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
              <el-card class="my-5">
                <div>
                  <div>
                    <h3>About the group</h3>
                  </div>
                </div>
                <div class="p-2">
                  <div class="mb-3">
                    {{ description }}
                  </div>
                  <div class="d-flex flex-row justify-content-between mb-3">
                    <div class="font-weight-bold">
                      <div>
                        {{ members.length }}
                      </div>
                      <div>members</div>
                    </div>
                    <div class="font-weight-bold">
                      {{ threads.length }}
                      <div class="font-weight-bold">threads</div>
                    </div>
                    <div class="font-weight-bold">
                      {{ events.length }}
                      <div class="font-weight-bold">events</div>
                    </div>
                  </div>
                  <div class="border-top pt-2 text-muted font-weight-bold">
                    created :
                    {{
                      creationDate.split("-")[1] +
                      "/" +
                      creationDate.split("-")[0]
                    }}
                  </div>
                </div>
              </el-card>
              <CreateThread
                v-show="selectedTab == 'threads'"
                v-model:postingThread="postingThread"
              />
              <CreateEvent
                v-show="selectedTab == 'events'"
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
import { ref, defineComponent, watch } from "vue";
import { useSpace } from "@/hooks/useSpace";
import { useEvents } from "@/hooks/useEvent";
import { useThreads } from "@/hooks/useThread";
import { useRoute, useRouter } from "vue-router";
import CreateThread from "../thread/CreateThread.vue";
import CreateEvent from "../event/CreateEvent.vue";
import Members from "@/components/Members.vue";
export default defineComponent({
  name: "Space",
  components: { TopBar, CreateThread, CreateEvent, Members },
  setup() {
    const postingThread = ref(false);
    const postingEvent = ref(false);

    const router = useRouter();
    const route = useRoute();
    const groupId = route.params.id as string;
    const { name, imageUrl, description, members, creationDate } = useSpace(
      groupId,
      true
    );
    const {
      events,
      fetching: fetchingEvents,
      doFetch: doFetchEvents,
    } = useEvents(groupId, true);

    const {
      threads,
      fetching: fetchingThreads,
      doFetch: doFetchThreads,
    } = useThreads(groupId, true);

    const jumpToEvent = (eventId: string) => {
      router.push({ path: `/event/${groupId}/${eventId}` });
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

    return {
      name,
      imageUrl,
      description,
      members,
      creationDate,

      events,
      fetchingEvents,
      postingEvent,

      threads,
      fetchingThreads,
      postingThread,

      jumpToEvent,

      selectedTab,
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
