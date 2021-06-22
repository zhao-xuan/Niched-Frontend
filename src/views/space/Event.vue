<template>
  <TopBar />
  <div class="container homepage-container">
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
              <div class="px-4 py-3" style="background-color: white">
                <h6 style="color: red">
                  <span class="pr-2">
                    <el-tag type="success" effect="dark">Event</el-tag>
                  </span>
                  <span class="pr-2 clickable" @click="jumpToSpace(groupId)">
                    {{ name }}
                  </span>
                </h6>
                <div class="row">
                  <div class="col-12 col-md-8">
                    <h2>{{ title }}</h2>
                  </div>
                  <div class="col-12 col-md-4">
                    <div class="row">
                      <div class="col-6">
                        <el-button
                          type="warning"
                          @click="onPostEventStatus(EventGroup.INTERESTED)"
                          class="btn btn-block"
                          plain
                          :loading="loadInterested"
                          :icon="
                            eventGroup === EventGroup.INTERESTED
                              ? 'el-icon-check'
                              : ''
                          "
                          >Interested</el-button
                        >
                      </div>
                      <div class="col-6">
                        <el-button
                          type="success"
                          @click="onPostEventStatus(EventGroup.GOING)"
                          class="btn btn-block"
                          plain
                          :loading="loadGoing"
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
              </div>
            </div>
          </div>

          <div class="row pb-4 px-4">
            <div class="col-md-8 pb-4">
              <div class="text item py-4">
                <h5>
                  {{ eventDescription }}
                </h5>
              </div>
            </div>

            <div class="col-md-4 pt-3">
              <el-card class="margin: 20px auto;" style="border-radius: 7px">
                <div class="row pb-3">
                  <div class="col-1">
                    <i class="el-icon-time"></i>
                  </div>
                  <div class="col-11">
                    <b
                      >Happening at
                      {{ new Date(eventDate).toLocaleString() }}</b
                    >
                  </div>
                </div>
                <div class="row pb-3">
                  <div class="col-1">
                    <i class="el-icon-user"></i>
                  </div>
                  <div class="col-11">
                    <b>Event Organiser: </b>

                    <div class="pt-2">
                      <button
                        type="submit"
                        class="btn btn-info"
                        @click="goToProfile(authorId)"
                      >
                        @{{ authorId }}
                      </button>
                    </div>
                  </div>
                </div>
                <div class="row pb-3">
                  <div class="col-1">
                    <i class="el-icon-check"></i>
                  </div>
                  <div class="col-11">
                    <b>Going ({{ members.going.length }})</b>
                    <Members :userNames="members.going" :sm="true" />
                  </div>
                </div>
                <div class="row pb-3">
                  <div class="col-1">
                    <i class="el-icon-star-off"></i>
                  </div>
                  <div class="col-11">
                    <b>Interested ({{ members.interested.length }})</b>
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
      groupId,
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
      jumpToSpace(item: string) {
        router.push({ name: "Space", params: { id: item } });
      },
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

.homepage-container {
  max-width: 1600px;
  width: 100%;
}

.left {
  display: block;
  float: left;
  width: 100px;
}

.right {
  display: block;
  float: right;
  width: 100px;
}
</style>
