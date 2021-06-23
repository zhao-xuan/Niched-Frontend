<template>
  <TopBar />
  <div
    class="container card-page-container"
    v-loading.fullscreen.lock="fetchingThread | fetchingComments"
  >
    <div class="row py-5 px-4 niched-bg">
      <div class="col-md-12 mx-auto">
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

          <div class="row px-4 py-3" style="background-color: white">
            <div class="col-12">
              <h6 class="pb-0 mb-0" style="color: red">
                <span class="pr-2">
                  <el-tag effect="dark">Thread</el-tag>
                </span>
                <span class="pr-2 clickable" @click="jumpToSpace(groupId)">
                  {{ groupId }}
                </span>
              </h6>
            </div>
            <div class="col-12">
              <div
                class="d-flex text-left clickable"
                @click="jumpToSpace(groupId)"
              >
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
                  <div class="container-fluid">
                    <div class="row">
                      <div class="col-12">
                        <card class="mt-3 px-3">
                          <div class="d-flex justify-content-between">
                            <div class="d-flex align-items-center">
                              <el-avatar icon="el-icon-user-solid" :size="30" />
                              <div class="ml-2 my-2" style="font-weight: 500">
                                {{ authorId }}
                              </div>
                            </div>
                            <div
                              class="text-secondary"
                              style="font-weight: 400"
                            >
                              {{ Moment(threadCreationDate).fromNow() }}
                            </div>
                          </div>
                          <div
                            class="clickable"
                            @click="jumpToThread(thread.threadId)"
                          >
                            <div class="my-1">
                              <b>{{ title }}</b>
                            </div>
                            <div class="text item my-3">
                              {{ threadDescription }}
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
                                  comments.length
                                }}</b>
                              </div>
                              <div><i class="el-icon-share mr-1" />share</div>
                            </div>
                          </div>
                        </card>
                      </div>
                    </div>

                    <div class="row d-flex flex-row-reverse">
                      <div class="col-11">
                        <div
                          v-for="(comment, i) in comments"
                          :key="comment.commentId"
                        >
                          <card class="mt-3 px-3">
                            <div class="d-flex justify-content-between">
                              <div class="d-flex align-items-center">
                                <img
                                  class="rounded-circle"
                                  :src="`https://randomuser.me/api/portraits/men/${i}.jpg`"
                                  style="width: 32px"
                                />
                                <div class="ml-2" style="font-weight: 500">
                                  {{ comment.userName }}
                                </div>
                              </div>
                              <div
                                class="text-secondary"
                                style="font-weight: 400"
                              >
                                {{ Moment(comment.creationDate).fromNow() }}
                              </div>
                            </div>
                            <div class="pl-3 my-2">
                              <div class="my-1">
                                {{ comment.body }}
                              </div>
                            </div>
                          </card>
                        </div>
                        <card class="mt-3 px-3">
                          <div class="d-flex justify-content-between">
                            <div class="d-flex align-items-center">
                              <el-avatar icon="el-icon-user-solid" :size="30" />
                              <div class="ml-2" style="font-weight: 500">
                                {{ userName }}
                              </div>
                            </div>
                          </div>
                          <div class="pl-3 my-1">
                            <div class="my-1">
                              <el-input
                                class="rounded my-1"
                                type="textarea"
                                :rows="1"
                                placeholder="Say somthing here..."
                                v-model="commentBody"
                              ></el-input>
                            </div>
                            <div class="d-flex justify-content-end">
                              <el-button
                                type="primary"
                                plain
                                @click="submitComment()"
                              >
                                Comment
                              </el-button>
                            </div>
                          </div>
                        </card>
                      </div>
                    </div>
                  </div>
                </el-tab-pane>
              </el-tabs>
            </div>

            <div class="col-md-4">
              <AboutSpace
                :members="members"
                :threads="threads"
                :events="events"
                :tags="tags"
                :groupId="groupId"
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
import { useComment } from "@/hooks/useComment";
import { useThread, useThreads } from "@/hooks/useThread";
import { useRoute, useRouter } from "vue-router";
import Card from "@/components/Card.vue";
import Moment from "moment";
import AboutSpace from "@/views/space/AboutSpace.vue";
import { useEvents } from "@/hooks/useEvent";
import { useState } from "@/state";

export default defineComponent({
  name: "Thread",
  components: { TopBar, Card, AboutSpace },
  setup() {
    const commentBody = ref("");
    const router = useRouter();
    const route = useRoute();
    const groupId = route.params.groupId as string;
    const threadId = route.params.threadId as string;

    const { userName } = useState();

    const {
      name,
      imageUrl,
      description: spaceDescription,
      members,
      tags,
      creationDate: spaceCreationDate,
    } = useSpace(groupId, true);

    const {
      title,
      authorId,
      description: threadDescription,
      creationDate: threadCreationDate,
      fetching: fetchingThread,
    } = useThread(threadId, true);

    const {
      comments,
      fetching: fetchingComments,
      doPostComment,
      doFetch,
    } = useComment(threadId, true);

    const { events } = useEvents(groupId, true);
    const { threads } = useThreads(groupId, true);

    const jumpToEvent = (eventId: string) => {
      router.push({ path: `/event/${groupId}/${eventId}` });
    };

    watch(fetchingComments, (fc) => {
      if (fc) {
        commentBody.value = "";
      }
    });

    const submitComment = () => {
      doPostComment(commentBody.value).then(() => {
        doFetch();
      });
    };

    return {
      Moment,
      userName,

      groupId,
      name,
      events,
      threads,
      tags,
      imageUrl,
      spaceDescription,
      members,
      spaceCreationDate,

      authorId,

      title,
      threadDescription,
      threadCreationDate,
      fetchingThread,

      jumpToEvent,
      submitComment,

      comments,
      commentBody,
      fetchingComments,

      jumpToSpace(item: string) {
        router.push({ name: "Space", params: { id: item } });
      },
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
