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
                      >{{
                        "happening at: " + new Date(eventDate).toLocaleString()
                      }}<br /><b>@{{ authorId }}</b></el-button
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
                          :loading="loadInterested"
                          :icon="
                            eventGroup === EventGroup.INTERESTED &&
                            'el-icon-check'
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
                          :loading="loadGoing"
                          :icon="
                            eventGroup === EventGroup.GOING && 'el-icon-check'
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
import { ref, defineComponent, watch, computed } from "vue";
import { useSpace } from "@/hooks/useSpace";
import { usePost } from "@/hooks/usePost";
import { useEvent } from "@/hooks/useEvent";
import { useRoute, useRouter } from "vue-router";
import { useState } from "@/state";
import { deleteEventStatus, EventGroup, postEventStatus } from "@/api/event";

export default defineComponent({
  name: "Event",
  components: { TopBar, Members },
  setup() {
    const router = useRouter();
    const route = useRoute();
    const eventGroup = ref(EventGroup.NONE);
    const groupId = route.params.groupId as string;
    const eventId = route.params.eventId as string;
    const { userName, loggedIn } = useState();
    const buttonPressed = ref(EventGroup.NONE);

    const { name, imageUrl, description, creationDate } = useSpace(
      groupId,
      true
    );

    const {
      authorId,
      title,
      description: eventDescription,
      eventDate,
      tags,
      members,
      doFetch: doFetchEvent,
    } = useEvent(eventId, true);

    const { doPost: doPostEventStatus, posting: postingEventStatus } =
      usePost(postEventStatus);
    const { doPost: doDeletetEventStatus, posting: deletingEventStatus } =
      usePost(deleteEventStatus);

    watch(members, (members) => {
      if (members.going.includes(userName.value)) {
        eventGroup.value = EventGroup.GOING;
      } else if (members.interested.includes(userName.value)) {
        eventGroup.value = EventGroup.INTERESTED;
      } else {
        eventGroup.value = EventGroup.NONE;
      }
      buttonPressed.value = EventGroup.NONE;
    });

    watch([postingEventStatus, deletingEventStatus], ([cp, cd], [pp, pd]) => {
      if ((!cp && pp) || (!cd && pd)) {
        //fetch after posting event status is completed
        doFetchEvent();
      }
    });

    const onPostEventStatus = async (group: EventGroup) => {
      if (!loggedIn.value) {
        alert("Please login first");
        return;
      }

      const eventStatus = {
        userName: userName.value,
        group,
        eventId,
      };

      buttonPressed.value = group;
      if (eventGroup.value === group) {
        doDeletetEventStatus(eventStatus);
      } else {
        doPostEventStatus(eventStatus);
      }
    };

    // Redirect to user profile page
    const goToProfile = async (profile: string) => {
      router.push({ path: "/users/" + profile });
    };

    const loadInterested = computed(
      () =>
        buttonPressed.value === EventGroup.INTERESTED &&
        (postingEventStatus.value || deletingEventStatus.value)
    );
    const loadGoing = computed(
      () =>
        buttonPressed.value === EventGroup.GOING &&
        (postingEventStatus.value || deletingEventStatus.value)
    );

    return {
      name,
      imageUrl,
      description,
      creationDate,
      authorId,
      title,
      eventDescription,
      eventDate,
      eventGroup,
      tags,
      members,
      goToProfile,
      onPostEventStatus,
      EventGroup,

      loadInterested,
      loadGoing,
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
