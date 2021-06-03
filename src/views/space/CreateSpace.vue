<template>
  <div class="bg-info mh-100" style="height: 1000px">
    <div class="p-5">
      <h1 class="text-white">create new space!</h1>
      <el-row :gutter="20" class="m-3">
        <el-col :span="6"
          ><div class="ml-3 flex-shrink-0">
            <h3 class="text-white">space id</h3>
          </div></el-col
        >
        <el-col :span="18"
          ><div class="mw-3">
            <el-input placeholder="id" v-model="id" class="w-25" clearable>
            </el-input></div
        ></el-col>
      </el-row>
      <el-row :gutter="20" class="m-3">
        <el-col :span="6"
          ><div class="ml-3 flex-shrink-0">
            <h3 class="text-white">space name</h3>
          </div></el-col
        >
        <el-col :span="18"
          ><div class="mw-3">
            <el-input placeholder="name" v-model="name" class="w-25" clearable>
            </el-input></div
        ></el-col>
      </el-row>
      <el-row :gutter="20" class="m-3">
        <el-col :span="6"
          ><div class="ml-3 flex-shrink-0">
            <h3 class="text-white">Image Url</h3>
          </div></el-col
        >
        <el-col :span="18"
          ><div class="mw-3">
            <el-input placeholder="name" v-model="imgUrl" class="w-25" clearable>
            </el-input></div
        ></el-col>
      </el-row>
      <el-row :gutter="20" class="m-3">
        <el-col :span="6"
          ><div class="ml-3">
            <h3 class="text-white">description</h3>
          </div></el-col
        >
        <el-col :span="18"
          ><div class="w-75">
            <el-input
              type="textarea"
              placeholder="Please input"
              v-model="description"
              maxlength="50"
              show-word-limit
            >
            </el-input>
            <el-row type="flex" justify="end" class="mt-5">
              <div>
                <el-button @click="onSubmit(id, name, description, imgUrl)"
                  >Submit</el-button
                >
              </div>
            </el-row>
          </div></el-col
        >
      </el-row>
    </div>
  </div>
</template>

<script lang="ts">
import { ref, defineComponent } from "vue";
import axios from "axios";

export default defineComponent({
  name: "CreateSpace",
  setup() {
    const id = ref("");
    const name = ref("");
    const description = ref("");
    const imgUrl = ref("");
    const onSubmit = async (id: string, name: string, description: string, imgUrl : string) => {
      if (!id || !name || !description || !imgUrl) {
        alert("name and description required!");
        return;
      }
      axios
        .post("http://niched-api.herokuapp.com/group/new", {
          name: name,
          description: description,
          group_id: id,
          image_url: imgUrl,
        })
        .then(
          (res) => {
            alert("success!");
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
