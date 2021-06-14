<template>
  <TopBar />
  <div class="container-fluid">
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
            </div>
          </div>

          <div class="row">
            <div class="col-sm-12">
              <div class="px-4 py-3 d-flex text-left">
                <h2>{{ name }}</h2>
              </div>
            </div>
          </div>

          <div class="row pb-4 px-4">
            <div class="col-md-8 order-0 pb-4">
              <el-card
                class="margin: 20px auto;"
                style="background-color: #e7eeff"
              >
                <template #header>
                  <div>
                    <span>
                      <b><font color="#FF7744">Event: </font>{{ title }}</b>
                    </span>
                    <el-button
                      type="text"
                      style="float: right; margin-top: -10px; text-align: right"
                      >{{ eventCreationDate }}<br /><b
                        >@{{ authorId }}</b
                      ></el-button
                    >
                  </div>
                </template>
                <div class="text item pb-3">
                  <b> Date and Time: {{ eventDate }} </b>
                </div>
                <div class="text item pb-3">
                  {{ eventDescription }}
                </div>
              </el-card>
            </div>

            <div class="col-md-4 order-1">
              <el-card class="margin: 20px auto;">
                <div>
                  <div class="pb-2">
                    <h4>Express your interest!</h4>
                  </div>
                  <div class="container">
                    <div class="row">
                      <div class="col">
                        <el-button
                          type="warning"
                          @click="onPostEventStatus(EventGroup.INTERESTED)"
                          class="btn btn-block"
                          plain
                          :icon="
                            eventGroup === EventGroup.INTERESTED
                              ? 'el-icon-check'
                              : ''
                          "
                          >Interested</el-button
                        >
                      </div>
                      <div class="col">
                        <el-button
                          type="success"
                          @click="onPostEventStatus(EventGroup.GOING)"
                          class="btn btn-block"
                          plain
                          :icon="
                            eventGroup === EventGroup.GOING
                              ? 'el-icon-check'
                              : ''
                          "
                          >Going!</el-button
                        >
                      </div>
                    </div>
                  </div>
                </div>
              </el-card>

              <el-card class="my-5">
                <div>
                  <h5>Event Organiser</h5>
                  <button
                    type="submit"
                    class="btn btn-info mb-4"
                    @click="goToProfile(authorId)"
                  >
                    @{{ authorId }}
                  </button>
                </div>
                <div class="border-top-0">
                  <div class="pb-4">
                    <h6>Going ({{ members.going.length }})</h6>
                    <Members :userNames="members.going" :sm="true" />
                  </div>
                  <div class="pb-4">
                    <h6>Interested ({{ members.interested.length }})</h6>
                    <Members :userNames="members.interested" :sm="true" />
                  </div>
                </div>
              </el-card>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import TopBar from "../Topbar.vue";
import Members from "@/components/Members.vue";
import { ref, defineComponent, watch } from "vue";
import { useSpace } from "@/hooks/useSpace";
import { usePost } from "@/hooks/usePost";
import { useEvent } from "@/hooks/useEvent";
import { useRoute, useRouter } from "vue-router";
import { useState } from "@/state";
import { EventGroup, postEventCreation, postEventStatus } from "@/api/event";
import { postThreadCreation } from "@/api/thread";
import axios from "axios";
import { SERVER_URL } from "@/api/constant";

export default defineComponent({
  name: "Event",
  components: { TopBar, Members },
  setup() {
    const router = useRouter();
    const route = useRoute();
    const groupId = route.params.groupId as string;
    const { name, imageUrl, description, creationDate } = useSpace(
      groupId,
      true
    );

    const eventId = route.params.eventId as string;
    const {
      authorId,
      title,
      description: eventDescription,
      creationDate: eventCreationDate,
      eventDate,
      tags,
      members,
    } = useEvent(eventId, true);

    const { userName, loggedIn } = useState();
    const { data: eventResponse } = usePost(postEventCreation);

    const { data: threadResponse } = usePost(postThreadCreation);

    const { doPost: doPostEventStatus } = usePost(postEventStatus);

    watch(eventResponse, () => {
      if (eventResponse.value) {
        alert(
          `a new event "${eventResponse.value?.title}"  with an id: ${eventResponse.value?.event_id} 
            is created`
        );
      }
    });
    watch(threadResponse, () => {
      if (threadResponse.value) {
        alert(
          `a new thread "${threadResponse.value?.title}"  with an id: ${threadResponse.value?.thread_id} 
            is created`
        );
      }
    });

    const eventGroup = ref(EventGroup.NONE);

    watch(members, () => {
      if (members?.value.going.includes(userName.value)) {
        eventGroup.value = EventGroup.GOING;
      } else if (members?.value.interested.includes(userName.value)) {
        eventGroup.value = EventGroup.INTERESTED;
      }
    });

    const onPostEventStatus = async (group: EventGroup) => {
      if (!loggedIn.value) {
        alert("Please login first");
        return;
      }

      if (eventGroup.value === group) {
        await axios.delete(`${SERVER_URL}/event/${eventId}/members`, {
          data: {
            user_name: userName.value,
            group: eventGroup.value,
          },
        });
      } else {
        eventGroup.value = group;
        doPostEventStatus({
          userName: userName.value,
          group: eventGroup.value,
          eventId: eventId,
        });
      }

      window.location.reload();
    };

    // Redirect to user profile page
    const goToProfile = async (profile: string) => {
      router.push({ path: "/users/" + profile });
    };
    return {
      name,
      imageUrl,
      description,
      creationDate,
      authorId,
      title,
      eventDescription,
      eventCreationDate,
      eventDate,
      eventGroup,
      tags,
      members,
      goToProfile,
      onPostEventStatus,
      EventGroup,
    };
  },
});
</script>
<style>
.profile-head {
  transform: translateY(5rem);
}

.cover {
  background-size: cover;
  background-repeat: no-repeat;
}
</style>
