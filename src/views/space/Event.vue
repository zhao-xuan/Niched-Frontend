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
            <div class="col-sm-6">
              <div class="px-4 pt-3 d-flex text-left">
                <h2>{{ name }}</h2>
              </div>
            </div>
            <div class="col-sm-4">
              <div class="px-4 pt-3 d-flex text-left">
                <p>{{ description }}</p>
              </div>
            </div>
            <div class="col-sm-2">
              <div class="px-4 py-3 d-flex justify-content-end text-center">
                <ul class="list-inline mb-0">
                  <li class="list-inline-item">
                    <h5 class="font-weight-bold mb-0 d-block">
                      {{ groupMembers.length }}
                    </h5>
                    <small class="text-muted">
                      <i class="fas fa-user mr-1"></i>Members</small
                    >
                  </li>
                  <li class="list-inline-item">
                    <h5 class="font-weight-bold mb-0 d-block">23</h5>
                    <small class="text-muted">
                      <i class="fas fa-user mr-1"></i>Threads</small
                    >
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div class="row pb-4 px-4">
            <div class="col-md-8 order-0">
              <el-card style="background-color: #ffe8e0">
                <template #header>
                  <div>
                    <span>
                      <a href="https://www.google.co.uk">
                        <b><font color="#FF7744">Event: </font>{{ title }}</b>
                      </a>
                    </span>
                    <el-button
                      type="text"
                      style="float: right; margin-top: -10px; text-align: right"
                      ><b>{{
                        "Created at " +
                        new Date(creationDate).toLocaleString() +
                        " @" +
                        authorId
                      }}</b></el-button
                    >
                  </div>
                </template>
                <div class="text item pb-3">
                  <b>
                    Date and Time: {{ new Date(eventDate).toLocaleString() }}
                  </b>
                </div>
                <div class="text item pb-3">
                  {{ eventDescription }}
                </div>
                <div class="text item pb-4">
                  <b>
                    {{ eventMembers.interested.length }} Interested -
                    {{ eventMembers.going.length }} Going
                  </b>
                </div>
                <div class="row justify-content-md-center pb-1">
                  <div class="col col-lg-2">
                    <button
                      type="submit"
                      class="btn btn-warning mb-2"
                      @click="Interested"
                    >
                      Interested
                    </button>
                  </div>
                  <div class="col col-lg-2">
                    <button
                      type="submit"
                      class="btn btn-success mb-2"
                      @click="Going"
                    >
                      Going
                    </button>
                  </div>
                </div>
              </el-card>
            </div>

            <div class="col-md-4 order-1">
              <el-card>
                <div>
                  <h4>Event Organiser</h4>
                  <button
                    type="submit"
                    class="btn btn-info mb-2"
                    @click="goToProfile(authorId)"
                  >
                    @{{ authorId }}
                  </button>
                </div>
              </el-card>

              <el-card style="margin: 20px auto">
                <div>
                  <h4>Participants</h4>
                  <h6>Going</h6>

                  <h6>Interested</h6>
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
    const {
      name,
      imageUrl,
      description,
      members: groupMembers,
    } = useSpace(groupId, true);

    const eventId = route.params.eventId as string;
    const {
      authorId,
      title,
      description: eventDescription,
      creationDate,
      eventDate,
      tags,
      members: eventMembers,
    } = useEvent(eventId, true);

    // Redirect to user profile page
    const goToProfile = async (profile: string) => {
      router.push({ path: "/users/" + profile });
    };
    return {
      name,
      imageUrl,
      description,
      groupMembers,
      authorId,
      title,
      eventDescription,
      creationDate,
      eventDate,
      tags,
      eventMembers,
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
