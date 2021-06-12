<template>
  <el-card>
    <div>
      <h3>Create a new Thread</h3>
      <form class="pt-2" @submit.prevent>
        <div class="form-group">
          <input
            type="text"
            class="form-control"
            id="postTitle"
            placeholder="Post Title"
            v-model="threadTitle"
          />
        </div>
        <div class="form-group">
          <textarea
            class="form-control"
            id="postDescription"
            rows="3"
            placeholder="Post Details"
            v-model="threadDescription"
          ></textarea>
        </div>
        <div class="form-group" style="float: right">
          <button
            type="submit"
            class="btn btn-primary mb-2"
            @click="onSubmitThread"
          >
            Thread Post
          </button>
        </div>
      </form>
    </div>
  </el-card>
</template>

<script lang="ts">
import { ref, defineComponent, watch } from "vue";
import { useRoute } from "vue-router";
import { useState } from "@/state";
import { postThreadCreation } from "@/api/thread";
import { usePost } from "@/hooks/usePost";
export default defineComponent({
  name: "CreateSpace",
  props: {
    postingThread: {
      required: true,
      type: Boolean,
    },
  },
  emits: ["update:postingThread"],
  setup(props, { emit }) {
    const threadTitle = ref("");
    const threadDescription = ref("");
    const route = useRoute();
    const groupId = route.params.id as string;
    const { doPost, data, posting } = usePost(postThreadCreation);
    const { loggedIn, userName } = useState();

    watch(posting, () => {
      emit("update:postingThread", posting.value);
    });

    watch(data, () => {
      if (data.value) {
        alert(
          `a new thread "${data.value?.title}"  with an id: ${data.value?.thread_id}
            is created`
        );
      }
    });

    const onSubmitThread = async () => {
      if (!loggedIn.value) {
        alert("Please login first");
      }

      doPost({
        group_id: groupId,
        author_id: userName.value,
        description: threadDescription.value,
        title: threadTitle.value,
      });
    };

    return {
      threadTitle,
      threadDescription,
      onSubmitThread,
    };
  },
});
</script>
