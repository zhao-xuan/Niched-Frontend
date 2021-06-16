<template>
  <TopBar />
  <div
    class="container-fluid"
    v-loading.fullscreen.lock="
      fetchingThread | fetchingComments
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
              <div class="px-4"></div>
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
                    <span
                      ><i class="el-icon-chat-line-square"></i>Thread Feed</span
                    >
                  </template>
                  <div class="card">
                    <h5 class="card-header">Pinned Message</h5>
                    <div class="card-body">
                      <h5 class="card-title">{{ title }}</h5>
                      <p class="card-text">
                        {{ threadDescription }}
                      </p>
                      <a href="#" class="btn btn-primary mr-3">Like</a>
                      <a href="#" class="btn btn-primary mr-3">Comment</a>
                      <a href="#" class="btn btn-primary mr-3">Add A Related Event</a>
                    </div>
                  </div>
                  <el-card
                    class="m-3"
                    shadow="hover"
                    v-for="comment in comments.slice().reverse()"
                    :key="comment.commentId"
                  >
                    <template #header>
                      <div class="d-flex flex-row justify-content-between">
                        <!-- <div>
                          <span
                            ><b>{{ comment.title /* This should be replaced by thread comment title */ }}</b></span
                          >
                        </div> -->
                        <div>
                          <el-button type="text"
                            >{{ comment.creationDate }}<b>@{{ comment.userName }}</b></el-button
                          >
                        </div>
                      </div>
                    </template>
                    <div class="text item">
                      {{ comment.body /* This should be replaced by thread comment content */ }}
                    </div>
                  </el-card>
                </el-tab-pane>

                <el-tab-pane label="Events">
                  <template #label>
                    <span><i class="el-icon-place"></i>Related Event</span>
                  </template>
                  <div class="col-md-12 order-0">
                    <el-card style="background-color: #ffe8e0">
                      <template #header>
                        <div>
                          <span>
                            <a href="https://www.google.co.uk">
                              <b
                                ><font color="#FF7744">Event: </font
                                >{{ title /* This should be replaced by thread related event title */ }}</b
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
                            >{{ creationDate }}<br /><b
                              >@{{ authorId }}</b
                            ></el-button
                          >
                        </div>
                      </template>
                      <div class="text item pb-3">
                        <b> Date and Time: {{ eventDate }} </b>
                      </div>
                      <div class="text item pb-3">
                        {{ "eventDescription" }}
                      </div>
                      <div class="text item pb-4">
                        <b> X Interested - X Going </b>
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
                    {{ spaceDescription }}
                  </div>
                  <div class="d-flex flex-row justify-content-between mb-3">
                    <div class="font-weight-bold">
                      <div>
                        {{ members.length }}
                      </div>
                      <div>members</div>
                    </div>
                    <!-- <div class="font-weight-bold">
                      {{ threads.length }}
                      <div class="font-weight-bold">threads</div>
                    </div>
                    <div class="font-weight-bold">
                      {{ events.length }}
                      <div class="font-weight-bold">events</div>
                    </div> -->
                  </div>
                  <div class="border-top pt-2 text-muted font-weight-bold">
                    created :
                    {{
                      spaceCreationDate.split("-")[1] +
                      "/" +
                      spaceCreationDate.split("-")[0]
                    }}
                  </div>
                </div>
              </el-card>
              <!-- <CreateEvent v-model:postingEvent="postingEvent" /> -->
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
import { useComment } from "@/hooks/useComment";
import { useThread, useThreads } from "@/hooks/useThread";
import { useRoute, useRouter } from "vue-router";
import CreateEvent from "../event/CreateEvent.vue";
export default defineComponent({
  name: "Thread",
  components: { TopBar, CreateEvent },
  setup() {
    // const postingThread = ref(false);
    // const postingEvent = ref(false);

    const router = useRouter();
    const route = useRoute();
    const groupId = route.params.groupId as string;
    const threadId = route.params.threadId as string;

    const { name, imageUrl, description: spaceDescription, members, creationDate: spaceCreationDate } = useSpace(
      groupId,
      true
    );

    // const {
    //   events,
    //   fetching: fetchingEvents,
    //   doFetch: doFetchEvents,
    // } = useEvents(groupId, true);

    // const {
    //   threads,
    //   fetching: fetchingThreads,
    //   doFetch: doFetchThreads,
    // } = useThreads(groupId, true);

    const { 
      title, 
      description : threadDescription, 
      creationDate: threadCreationDate,
      fetching: fetchingThread
    } = useThread(threadId, true);

    const {
      comments,
      fetching: fetchingComments,
      doPostComment
    } = useComment(threadId, true);

    const jumpToEvent = (eventId: string) => {
      router.push({ path: `/event/${groupId}/${eventId}` });
    };

    // watch([postingEvent, postingThread], ([ce, ct], [oe, ot]) => {
    //   //reload events data when posting new event/thread ends
    //   if (!ce && oe) {
    //     doFetchEvents();
    //   }
    //   if (!ct && ot) {
    //     doFetchThreads();
    //   }
    // });

    return {
      name,
      imageUrl,
      spaceDescription,
      members,
      spaceCreationDate,

      title,
      threadDescription,
      threadCreationDate,
      fetchingThread,

      jumpToEvent,

      comments,
      fetchingComments
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
