<template>
  <div class="container-fluid h-100" v-loading.fullscreen.lock="posting">
    <div class="row d-flex h-100">
      <div class="col-lg-4">
        <div
          class="row align-items-center justify-content-center h-100 text-white"
          style="background-color: rgb(140, 175, 244)"
        >
          <div class="col-lg-10">
            <h2>Create your space!</h2>
            <p>Please fill in the following form to create your own space!</p>
          </div>
        </div>
      </div>
      <div class="col-lg-8">
        <div
          class="row align-items-center justify-content-start h-100 text-black"
        >
          <div class="col-lg-8 offset-lg-1">
            <div class="">
              <form @submit.prevent>
                <div class="form-group">
                  <label>Space ID</label>
                  <input
                    type="text"
                    class="form-control"
                    placeholder="space-id-01"
                    v-model="id"
                  />
                </div>
                <div class="form-group">
                  <label>Title</label>
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Space Title"
                    v-model="name"
                  />
                </div>
                <div class="form-group">
                  <label>Cover Image <i> (Optional) </i></label>
                  <input
                    type="text"
                    class="form-control"
                    maxlength="300"
                    placeholder="https://..."
                    v-model="imgUrl"
                  />
                </div>
                <div class="form-group">
                  <label>Description</label>
                  <textarea
                    class="form-control"
                    maxlength="120"
                    placeholder="This group is about..."
                    v-model="description"
                  />
                </div>
                <el-tag
                  class="mx-1 my-1"
                  :key="tag"
                  v-for="tag in dynamicTags"
                  closable
                  :disable-transitions="false"
                  @close="handleClose(tag)"
                >
                  {{ tag }}
                </el-tag>
                <el-input
                  class="input-new-tag w-25"
                  v-if="inputVisible"
                  v-model="inputValue"
                  size="mini"
                  @keyup.enter="handleInputConfirm"
                  @blur="handleInputConfirm"
                >
                </el-input>
                <el-button
                  v-else
                  class="button-new-tag"
                  size="mini"
                  @click="showInput"
                  >+ New Tag</el-button
                >
              </form>
              <button class="btn btn-primary m-2" @click="onSubmit">
                Create
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { ref, defineComponent, watch } from "vue";
import { useRouter } from "vue-router";
import { useState } from "@/state";
import { postSpaceCreation } from "@/api/space";
import { usePost } from "@/hooks/usePost";
export default defineComponent({
  name: "CreateSpace",
  setup() {
    const id = ref("");
    const name = ref("");
    const description = ref("");
    const imgUrl = ref("");

    const dynamicTags = ref(["badminton", "programming"]);
    const inputVisible = ref(false);
    const inputValue = ref("");

    const { userName } = useState();
    const { doPost, error, posted, posting } = usePost(postSpaceCreation);
    const router = useRouter();

    watch([error, posted], () => {
      if (!error.value && posted.value) {
        alert("Space created successfully!");
        router.push({ name: "Space", params: { id: id.value } });
      }
    });

    const onSubmit = () => {
      if (!id.value || !name.value || !description.value) {
        alert("Space ID, name and description are required!");
        return;
      }

      doPost({
        author_id: userName.value,
        name: name.value,
        description: description.value,
        group_id: id.value,
        image_url: imgUrl.value,
        tags: dynamicTags.value,
      });
    };

    const handleClose = (tag: string) => {
      dynamicTags.value.splice(dynamicTags.value.indexOf(tag), 1);
    };

    const showInput = () => {
      inputVisible.value = true;
    };

    const handleInputConfirm = () => {
      if (inputValue.value) {
        dynamicTags.value.push(inputValue.value);
      }
      inputVisible.value = false;
      inputValue.value = "";
    };

    return {
      id,
      name,
      description,
      imgUrl,
      onSubmit,

      dynamicTags,
      inputVisible,
      inputValue,

      showInput,
      handleClose,
      handleInputConfirm,
      posting,
    };
  },
});
</script>
