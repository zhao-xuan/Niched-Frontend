<template>
  <TopBar />
<<<<<<< HEAD
  <div class="container-fluid" v-loading.fullscreen.lock="lock">
    <div class="row py-5 px-4 niched-bg justify-content-center">
      <div class="col-lg-6 col-md-8">
        <card class="bg-light">
          <img :src="imageUrl" style="height: 200px; object-fit: cover" />
          <div class="container-fluid">
            <div class="row justify-content-center">
              <el-avatar class="my-1" :size="60"> {{ userName }}</el-avatar>
=======
  <div
    class="container homepage-container"
    v-loading.fullscreen.lock="fetching"
  >
    <div class="row py-5 px-4 niched-bg">
      <div class="col-md-10 mx-auto">
        <!-- Profile widget -->
        <div class="bg-light shadow rounded overflow-hidden mt-3s">
          <div
            class="px-4 pt-0 pb-5 cover rounded"
            :style="{
              backgroundImage: 'url(' + imageUrl + ')',
              backgroundPosition: 'center',
              height: '400px',
            }"
          >
            <div class="mb-2 text-white d-flex justify-content-center">
              <div class="px-4"></div>
>>>>>>> develop
            </div>
            <div class="row my-2 justify-content-center">
              <div class="col-11">
                <h5>
                  Interests
                  <el-tooltip
                    content="Your common interests are highlighted!"
                    placement="top-start"
                    transition="el-fade-in-linear"
                    v-if="!selfProfile"
                  >
                    <i class="el-icon-info" style="font-size: 0.8em"> </i
                  ></el-tooltip>
                </h5>
              </div>
              <div class="col-11">
                <el-tag
                  class="mx-1 my-1"
                  v-for="interest in interests"
                  :key="interest"
                  :effect="
                    loggedInInterests.includes(interest) ? 'dark' : 'plain'
                  "
                  type="success"
                >
                  {{ interest }}
                </el-tag>
              </div>
            </div>
            <div class="row my-2 justify-content-center">
              <div class="col-11">
                <h5>Niches</h5>
                <div class="row">
                  <div class="col-12 my-1 mx-1">
                    {{ selfProfile ? "Your Niches" : "Your common Niches" }}
                  </div>
                  <div
                    v-for="group in groupsJoined.filter((x) =>
                      x.members.includes(loggedInUserName)
                    )"
                    :key="group.groupId"
                    class="col-6 col-sm-3 my-2 mx-2"
                    style="overflow: hidden"
                  >
                    <div
                      class="niche-card-parent shadow-sm clickable"
                      :style="{
                        backgroundImage: 'url(' + group.imageUrl + ')',
                        backgroundPosition: 'center',
                      }"
                      @click="jumpToSpace(group.groupId)"
                    >
                      <div class="niched-card-overlay"></div>
                    </div>
                    <div class="row niche-card-header px-2">
                      <div class="col-sm-10">
                        {{ group.name }}
                        <br />
                        {{ group.description }}
                      </div>
                      <div class="col-sm-2 d-flex justify-content-end">
                        <i class="el-icon-user"> {{ group.members.length }}</i>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="row" v-if="!selfProfile">
                  <div class="col-12 my-2 mx-2">
                    {{ "Niches " + userName + " is interested in" }}
                  </div>
                  <div
                    v-for="group in groupsJoined.filter(
                      (x) => !x.members.includes(loggedInUserName)
                    )"
                    :key="group.groupId"
                    class="col-6 col-sm-3 my-2 mx-2"
                    style="overflow: hidden"
                  >
                    <div
                      class="niche-card-parent shadow-sm clickable"
                      :style="{
                        backgroundImage: 'url(' + group.imageUrl + ')',
                        backgroundPosition: 'center',
                      }"
                      @click="jumpToSpace(group.groupId)"
                    >
                      <div class="niched-card-overlay"></div>
                    </div>
                    <div class="row niche-card-header px-2">
                      <div class="col-sm-10">
                        {{ group.name }}
                        <br />
                        {{ group.description }}
                      </div>
                      <div class="col-sm-2 d-flex justify-content-end">
                        <i class="el-icon-user"> {{ group.members.length }}</i>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="row my-1 justify-content-center">
              <div class="col-11"><h5>Events</h5></div>
              <div class="col-11">
                <div class="row">
                  <div class="col-11">
                    <card
                      class="mt-3 p-3"
                      v-for="event in eventsJoined.slice(0, 5)"
                      :key="event.eventId"
                      style="cursor: pointer"
                      @click="$emit('click-event', event.eventId)"
                    >
                      <div class="row">
                        <div
                          class="text-secondary col-12 col-sm-2 mr-0 pr-0"
                          style="font-size: 15px; min-width: 37px"
                        >
                          {{
                            new Date(event.eventDate).toLocaleString("en-US", {
                              hour: "numeric",
                              minute: "numeric",
                              hour12: true,
                            })
                          }}
                        </div>
                        <div class="col-12 col-sm-10">
                          <div v-if="!selfProfile" class="pb-2">
                            <el-tag
                              v-if="
                                event.members.going.includes(loggedInUserName)
                              "
                            >
                              You're also going!
                            </el-tag>
                            <el-tag v-else> You're interested in this </el-tag>
                          </div>
                          <div class="p-1">
                            <p>{{ event.title }}</p>
                          </div>
                          <div
                            class="d-flex justify-content-end"
                            style="
                              font-weight: 400;
                              font-size: 14px;
                              color: #a6a6a6;
                            "
                          >
                            Organised by {{ event.authorId }}
                          </div>
                        </div>
                      </div>
                    </card>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </card>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, watch, ref, watchEffect } from "vue";
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

export default defineComponent({
  name: "Profile",
  components: { TopBar, Card },
  setup() {
    const lock = ref(true);
    const groupsJoined = ref<Space[]>([]);
    const eventsJoined = ref<Event[]>([]);
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

    const { interests } = useUser(userName, true);
    const { events } = useAllEvents(true);

    const redirect = (loading: boolean, loggedIn: boolean) => {
      if (!loading) {
        lock.value = false;
        if (!loggedIn) {
          router.push({ name: "Login" });
        }
      }
    };

    watch([loading, loggedIn], ([loading, loggedIn]) => {
      redirect(loading, loggedIn);
    });

    redirect(loading.value, loggedIn.value);

    watch(loggedInUserName, (name) => (selfProfile.value = userName === name));

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

        groupsJoined.value = items.filter((group) =>
          group.members.includes(userName)
        );
      }

      if (events.value && loggedInUserName.value) {
        eventsJoined.value = events.value.filter(
          (e) =>
            e.members.going.includes(loggedInUserName.value) ||
            e.members.interested.includes(loggedInUserName.value)
        );
      }
    });

    return {
      eventsJoined,
      groupsJoined,

      userName,
      interests,
      imageUrl: "",
      selfProfile,

      loggedInUserName,
      loggedInInterests,
      loggedInGroups,
      lock,
      jumpToSpace(item: string) {
        router.push({ name: "Space", params: { id: item } });
      },
    };
  },
});
</script>
