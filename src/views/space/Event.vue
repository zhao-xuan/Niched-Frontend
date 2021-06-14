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
              <div class="px-4">
              </div>
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
              <el-card class="margin: 20px auto;" style="background-color: #ffe8e0">
                <template #header>
                  <div>
                    <span>
                      <b><font color="#FF7744">Event: </font>{{ title }}</b>
                    </span>
                    <el-button
                      type="text"
                      style="
                        float: right;
                        margin-top: -10px;
                        text-align: right;
                      "
                      >{{ eventCreationDate }}<br /><b>@{{ authorId }}</b></el-button
                    >
                  </div>
                </template>
                <div class="text item pb-3">                  
                  <b>
                    Date and Time: {{ eventDate }} 
                  </b>
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
                        <el-button type="warning" class="btn btn-block" plain>Interested</el-button>
                      </div>
                      <div class="col">
                        <el-button type="success" class="btn btn-block" plain>Going!</el-button>
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
                <div>
                  <h5>Participants</h5>
                  <h6>Going</h6>
                  <!-- Display members going here! -->

                  <h6>Interested</h6>
                  <!-- Display members participating here! -->
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
import { postEventCreation } from "@/api/event";
import { postThreadCreation } from "@/api/thread";

export default defineComponent({
  name: "Event",
  components: { TopBar },
  setup() {
    const router = useRouter();
    const route = useRoute();
    const groupId = route.params.groupId as string;
    const { name, imageUrl, description, members, creationDate } = useSpace(groupId, true);

    const eventId = route.params.eventId as string;
    const { authorId, title, description: eventDescription, creationDate: eventCreationDate, eventDate, tags } = useEvent(eventId, true)

    const { userName, loggedIn } = useState();
    const { doPost: doPostEvent, data: eventResponse } =
      usePost(postEventCreation);

    const { doPost: doPostThread, data: threadResponse } =
      usePost(postThreadCreation);

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

    // Redirect to user profile page
    const goToProfile = async (profile: string) => {
      router.push({ path: "/users/"+profile });
    };
    return {
      name,
      imageUrl,
      description,
      members,
      creationDate,
      authorId,
      title, 
      eventDescription, 
      eventCreationDate, 
      eventDate, 
      tags,
      goToProfile,
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
