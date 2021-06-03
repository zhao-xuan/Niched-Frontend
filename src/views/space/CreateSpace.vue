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
                <el-button @click="onSubmit(name, description)"
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
    const onSubmit = async (id: string, name: string, description: string) => {
      if (!id || !name || !description) {
        alert("name and description required!");
        return;
      }
      const res = await axios.post(
        "https://127.0.0.1:3000/group/new",
        {
          name,
          description,
          group_id: id,
          image_url: "https://example.com",
        },
        { withCredentials: true }
      );
    };
    return {
      id,
      name,
      description,
      onSubmit,
    };
  },
});
</script>
