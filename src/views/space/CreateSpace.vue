<template>
  <div class="container text-white">
    <div class="row py-5 px-3">
      <div class="col-md-10 mx-auto px-0">
        <h1>create a new space!</h1>
      </div>
      <div class="bg-success col-md-10 mx-auto shadow rounded overflow-hidden">
        <div class="row mt-3 mb-5 align-items-center">
          <div class="col-12 col-md-4"><h3>space id</h3></div>
          <div class="col-12 col-md-8">
            <div class="my-auto">
              <input
                type="text"
                class="form-control"
                placeholder="id"
                v-model="id"
              />
            </div>
          </div>
        </div>
        <div class="row my-5 align-items-center">
          <div class="col-12 col-md-4"><h3>space name</h3></div>
          <div class="col-12 col-md-8">
            <div class="my-auto">
              <input
                type="text"
                class="form-control"
                placeholder="name"
                v-model="name"
              />
            </div>
          </div>
        </div>
        <div class="row my-3 align-items-center">
          <div class="col-12 col-md-4"><h3>image url</h3></div>
          <div class="col-12 col-md-8">
            <div class="my-auto">
              <input
                type="text"
                class="form-control"
                placeholder="http://.."
                v-model="imgUrl"
              />
            </div>
          </div>
        </div>
        <div class="row mt-5 mb-3 align-items-start">
          <div class="col-12 col-md-4"><h3>description</h3></div>
          <div class="col-12 col-md-8">
            <div class="my-auto">
              <textarea
                class="form-control"
                placeholder="describe your space here..."
                maxlength="50"
                v-model="description"
              ></textarea>
            </div>
          </div>
        </div>
      </div>
      <div class="row col-md-10 mx-auto justify-content-end mt-3 pr-0">
        <el-button
          class="bg-success text-white"
          @click="onSubmit(id, name, description, imgUrl)"
          >Submit</el-button
        >
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { ref, defineComponent } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";
import { SERVER_URL } from "@/api/constant";

export default defineComponent({
  name: "CreateSpace",
  setup() {
    const id = ref("");
    const name = ref("");
    const description = ref("");
    const imgUrl = ref("");
    const router = useRouter();
    const onSubmit = async (
      id: string,
      name: string,
      description: string,
      imgUrl: string
    ) => {
      if (!id || !name || !description) {
        alert("group id, name and description are required!");
        return;
      }
      axios
        .post(`${SERVER_URL}/group/new`, {
          name: name,
          description: description,
          group_id: id,
          image_url: imgUrl,
        })
        .then(
          (res) => {
            alert("ur new space:" + name + " has been created!");
            router.push({ name: "Home" });
          },
          (rej) => {
            alert(rej);
          }
        );
    };
    return {
      id,
      name,
      description,
      imgUrl,
      onSubmit,
    };
  },
});
</script>
