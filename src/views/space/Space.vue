<template>
  <TopBar />
  <div class="container-fluid">
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
              <el-tabs type="">
                <el-tab-pane>
                  <template #label>
                    <span><i class="el-icon-chat-line-square"></i> Thread</span>
                  </template>
                  <el-card
                    class="m-3"
                    shadow="hover"
                    v-for="i in items"
                    :key="i"
                  >
                    <template #header>
                      <div>
                        <span
                          ><b
                            >What’s your favourite Ramen shop in London?</b
                          ></span
                        >
                        <el-button type="text"
                          >12/06/2021 at 11:53PM<br /><b>@alice</b></el-button
                        >
                      </div>
                    </template>
                    <div class="text item">
                      There is a new item in the Ichiran ramen shop: Yakikamo.
                      Sounds good. Anyone interested? We can go together.
                      Meeting at the Imperial College Central Library. Anyone is
                      welcome to join, and please remember to bring you’re
                      friends along too! Hoping to get over 10 people this time!
                      Please remember to bring you’re friends along and...
                    </div>
                  </el-card>
                </el-tab-pane>

                <el-tab-pane>
                  <template #label>
                    <span><i class="el-icon-place"></i> Event </span>
                  </template>
                  <el-card style="margin: 20px auto; background-color: #ffe8e0">
                    <template #header>
                      <div>
                        <span>
                          <a href="https://www.google.co.uk">
                            <b
                              ><font color="#FF7744">Event: </font>Let’s go to
                              Ichiran Ramen!</b
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
                          >12/06/2021 at 11:53PM<br /><b>@alice</b></el-button
                        >
                      </div>
                    </template>
                    <div class="text item">
                      There is a new item in the Ichiran ramen shop: Yakikamo.
                      Sounds good. Anyone interested? We can go together.
                      Meeting at the Imperial College Central Library. Anyone is
                      welcome to join, and please remember to bring you’re
                      friends along too! Hoping to get over 10 people this time!
                    </div>
                  </el-card>
                  <el-card style="margin: 20px auto; background-color: #ffe8e0">
                    <template #header>
                      <div>
                        <span>
                          <a href="https://www.google.co.uk">
                            <b
                              ><font color="#FF7744">Event: </font>Want to try
                              Chinese DanDan Noodle too?</b
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
                          >12/06/2021 at 11:53PM<br /><b>@alice</b></el-button
                        >
                      </div>
                    </template>
                    <div class="text item">
                      There is a new item in the Ichiran ramen shop: Yakikamo.
                      Sounds good. Anyone interested? We can go together.
                      Meeting at the Imperial College Central Library. Anyone is
                      welcome to join, and please remember to bring you’re
                      friends along too! Hoping to get over 10 people this time!
                    </div>
                  </el-card>
                </el-tab-pane>

                <el-tab-pane>
                  <template #label>
                    <span>
                      <i class="el-icon-star-off"></i>
                      Popular
                    </span>
                  </template>
                  Role
                </el-tab-pane>
                <el-tab-pane label="Members">
                  <template #label>
                    <span
                      ><i class="el-icon-user"></i>
                      Members
                    </span>
                  </template>
                  memebers
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
                  <div class="d-flex flex-row mb-3">
                    <div class="font-weight-bold mr-5">
                      <div>
                        {{ members.length }}
                      </div>
                      <div>members</div>
                    </div>
                    <div class="font-weight-bold">
                      {{ 23 }}
                      <div class="font-weight-bold">threads</div>
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
              <CreateThread v-model:postingThread="postingThread" />
              <el-card class="mt-5 mx-auto">
                <div>
                  <h3>Organise a new Event!</h3>
                  <form class="pt-2" @submit.prevent>
                    <div class="form-group">
                      <input
                        type="text"
                        class="form-control"
                        id="eventTitle"
                        placeholder="Event Title"
                        v-model="eventTitle"
                      />
                    </div>
                    <div class="form-group row">
                      <label
                        for="example-date-input"
                        class="col-2 col-form-label"
                        >Date</label
                      >
                      <div class="col-10">
                        <input
                          class="form-control"
                          type="date"
                          id="example-date-input"
                          v-model="eventDate"
                        />
                      </div>
                    </div>
                    <div class="form-group row">
                      <label
                        for="example-time-input"
                        class="col-2 col-form-label"
                        >Time</label
                      >
                      <div class="col-10">
                        <input
                          class="form-control"
                          type="time"
                          id="example-time-input"
                          v-model="eventTime"
                        />
                      </div>
                    </div>
                    <div class="form-group">
                      <textarea
                        type="text"
                        class="form-control"
                        rows="3"
                        placeholder="Event Details"
                        v-model="eventDescription"
                      ></textarea>
                    </div>
                    <div class="form-group">
                      <input
                        type="text"
                        class="form-control"
                        id="eventMemberCount"
                        placeholder="Member Count (Optional)"
                      />
                    </div>
                    <div class="form-group" style="float: right">
                      <button
                        type="submit"
                        class="btn btn-primary mb-2"
                        @click="onSubmitEvent"
                      >
                        Create Event
                      </button>
                    </div>
                  </form>
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
import { useRoute } from "vue-router";
import { useState } from "@/state";
import { postEventCreation } from "@/api/event";
import CreateThread from "../thread/CreateThread.vue";
export default defineComponent({
  name: "Space",
  components: { TopBar, CreateThread },
  setup() {
    const eventTitle = ref("");
    const eventDescription = ref("");
    const eventDate = ref("");
    const eventTime = ref("");

    const route = useRoute();
    const groupId = route.params.id as string;
    const { name, imageUrl, description, members, creationDate } = useSpace(
      groupId,
      true
    );
    const { userName, loggedIn } = useState();
    const { doPost: doPostEvent, data: eventResponse } =
      usePost(postEventCreation);

    watch(eventResponse, () => {
      if (eventResponse.value) {
        alert(
          `a new event "${eventResponse.value?.title}"  with an id: ${eventResponse.value?.event_id}
            is created`
        );
      }
    });

    const onSubmitEvent = async () => {
      if (!loggedIn.value) {
        alert("Please login first");
      }

      doPostEvent({
        group_id: groupId,
        author_id: userName.value,
        description: eventDescription.value,
        title: eventTitle.value,
        tags: [],
        event_time: `${eventDate.value}T${eventTime.value}:00Z`,
      });
    };

    const postingThread = ref(false);

    return {
      name,
      imageUrl,
      description,
      members,
      creationDate,
      eventTitle,
      eventDescription,
      eventDate,
      eventTime,
      onSubmitEvent,
      items: [1, 2, 3, 4, 5],
      postingThread,
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
