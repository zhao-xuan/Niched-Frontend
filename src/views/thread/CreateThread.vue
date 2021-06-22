<template>
  <card class="mt-3 px-3">
    <div class="d-flex justify-content-between">
      <div class="d-flex align-items-center">
        <img
          class="rounded-circle pl-1"
          :src="`https://randomuser.me/api/portraits/men/1.jpg`"
          style="width: 32px"
        />
        <div class="ml-2 my-3">
          <h6>
            {{ userName }}
          </h6>
        </div>
      </div>
      <div class="ml-2 my-3">
        <h6>Tell me what you're thinking...</h6>
      </div>
    </div>
    <div>
      <form class="pt-2" @submit.prevent>
        <div class="form-group">
          <el-input
            type="text"
            placeholder="Post Title"
            v-model="threadTitle"
            clearable
          ></el-input>
        </div>
        <div class="form-group">
          <el-input
            type="textarea"
            :autosize="{ minRows: 3, maxRows: 10 }"
            placeholder="Say something..."
            v-model="threadDescription"
          ></el-input>
        </div>
        <div
          class="d-flex align-items-center justify-content-between mx-1"
          style="color: #b3b3b3"
        >
          <div class="d-flex">
            <div class="mr-3">
              <i class="el-icon-chat-line-round mx-1" /><b>{{ 0 }}</b>
            </div>
            <div><i class="el-icon-share mr-1" />share</div>
          </div>
          <div>
            <h6>
              <el-button
                type="success"
                class="mx-1 my-2"
                plain
                @click="onSubmitThread"
              >
                Create
              </el-button>
            </h6>
          </div>
        </div>
      </form>
    </div>
  </card>
</template>

<script lang="ts">
import { ref, defineComponent, watch } from "vue";
import { useRoute } from "vue-router";
import { useState } from "@/state";
import { postThreadCreation } from "@/api/thread";
import { usePost } from "@/hooks/usePost";
import Card from "@/components/Card.vue";

export default defineComponent({
  name: "CreateSpace",
  props: {
    postingThread: {
      required: true,
      type: Boolean,
    },
  },
  components: { Card },
  emits: ["update:postingThread"],
  setup(props, { emit }) {
    const threadTitle = ref("");
    const threadDescription = ref("");
    const route = useRoute();
    const groupId = route.params.id as string;
    const { doPost, data, posted, posting } = usePost(postThreadCreation);
    const { loggedIn, userName } = useState();

    watch(posting, () => {
      emit("update:postingThread", posting.value);
    });

    watch([data, posted], ([d, p]) => {
      if (d && p) {
        threadTitle.value = "";
        threadDescription.value = "";
      }
    });

    const onSubmitThread = async () => {
      if (!loggedIn.value) {
        alert("Please login first");
        return;
      }

      doPost({
        group_id: groupId,
        author_id: userName.value,
        description: threadDescription.value,
        title: threadTitle.value,
      });
    };

    return {
      userName,
      threadTitle,
      threadDescription,
      onSubmitThread,
    };
  },
});
</script>
