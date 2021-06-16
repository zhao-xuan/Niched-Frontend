<template>
  <div class="container-fluid h-100">
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
                  <label>Space Title</label>
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Space Title"
                    v-model="name"
                  />
                </div>
                <div class="form-group">
                  <label>Space Cover Image <i> (Optional) </i></label>
                  <input
                    type="text"
                    class="form-control"
                    placeholder="https://..."
                    v-model="imgUrl"
                  />
                </div>
                <div class="card my-2">
                  <div class="card-body">
                    <h5 class="card-title">Select Relevant Tags</h5>
                    <p class="card-text">
                      <el-check-tag
                        class="mx-1 my-1"
                        :key="tag"
                        v-for="(tag, index) in dynamicTags"
                        :disable-transitions="false"
                        @change="onChangeSelectInterest(index)"
                        :checked="isTagSelected[index]"
                      >
                        {{ tag }}
                      </el-check-tag>
                      <el-input
                        class="input-new-tag"
                        v-if="inputVisible"
                        v-model="inputValue"
                        ref="saveTagInput"
                        size="mini"
                        @keyup.enter="handleInputConfirm"
                        @blur="handleInputConfirm"
                        placeholder="Enter a new interest of yours and then hit Enter"
                      >
                      </el-input>
                      <el-button
                        v-else
                        class="button-new-tag"
                        size="small"
                        @click="showInput"
                        >+ New Tag</el-button
                      >
                    </p>
                  </div>
                </div>
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

    const dynamicTags = ref([
      "Badminton",
      "Music",
      "Game Of Thrones",
      "The UK",
      "Attack On Titans",
      "Piano",
      "Drums",
      "Antarctica",
      "Dog",
    ]);
    const isTagSelected = ref([true, false, true]);
    const inputVisible = ref(false);
    const inputValue = ref("");

    const { userName } = useState();
    const { doPost, error, posted, posting } = usePost(postSpaceCreation);
    const router = useRouter();

    watch([error, posted], () => {
      if (!error.value && posted.value) {
        alert("success");
        router.push({ name: "Home" });
      }
    });

    const onSubmit = () => {
      if (!id.value || !name.value || !description.value) {
        alert("group id, name and description are required!");
        return;
      }

      doPost({
        author_id: userName.value,
        name: name.value,
        description: description.value,
        group_id: id.value,
        image_url: imgUrl.value,
        tags: dynamicTags.value.filter((_, i) => isTagSelected.value[i]),
      });
    };

    const handleClose = (tag: string) => {
      dynamicTags.value = dynamicTags.value.splice(
        dynamicTags.value.indexOf(tag),
        1
      );
    };

    const showInput = () => {
      inputVisible.value = !inputVisible.value;
    };

    const handleInputConfirm = () => {
      if (inputValue.value) {
        dynamicTags.value.push(inputValue.value);
      }
      inputVisible.value = false;
      inputValue.value = "";
    };

    const onChangeSelectInterest = (i: number) => {
      isTagSelected.value[i] = !isTagSelected.value[i];
    };

    return {
      id,
      name,
      description,
      imgUrl,
      onSubmit,

      dynamicTags,
      isTagSelected,
      inputVisible,
      inputValue,

      showInput,
      handleClose,
      handleInputConfirm,
      onChangeSelectInterest,
    };
  },
});
</script>
