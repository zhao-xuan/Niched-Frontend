<template>
  <nav class="navbar navbar-expand-sm topbar">
    <div class="container-fluid">
      <a class="navbar-brand" href="/home"
        ><h1 class="text-dark ml-0 pl-0">niched</h1>
      </a>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            fill="currentColor"
            class="bi bi-justify"
            viewBox="0 0 16 16"
          >
            <path
              fill-rule="evenodd"
              d="M2 12.5a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5zm0-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5zm0-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5zm0-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5z"
            />
          </svg>
        </span>
      </button>

      <div class="collapse navbar-collapse px-2" id="navbarSupportedContent">
        <input
          class="form-control mr-sm-2"
          type="search"
          placeholder="Search"
          aria-label="Search"
          @input="onChange"
        />

        <button class="btn btn-outline-success m-2 my-sm-0" @click="jumpToCreateSpace">
          <div class="mx-1 my-1">Create&nbsp;Space</div>
        </button>
        <button
          class="btn btn-primary m-2 my-sm-0"
          @click="jumpToProfile"
          v-if="!loggedIn"
        >
          <div v-if="!loggedIn" class="mx-1 my-1">Login</div>
        </button>
        <el-popover placement="top" :width="160" v-model:visible="visible">
          <div>
          <button
            class="btn btn-outline-info w-100 my-1"
            @click="jumpToProfile"
            v-if="loggedIn"
          >
            <div v-if="loggedIn">My&nbsp;Profile</div>
          </button>
          <button
            class="btn btn-outline-info w-100 my-1"
            @click="onLogout"
            v-if="loggedIn"
          >
            <div v-if="loggedIn">Logout</div>
          </button>
          </div>
          <template #reference>
            <div>
            <button
              class="btn btn-info m-2 my-sm-0 d-flex topbar-btn"
              v-if="loggedIn"
            >
              <el-avatar
                class="mt-1"
                v-if="loggedIn"
                icon="el-icon-user-solid"
                size="small"
              />
              <span v-if="loggedIn" class="my-1 ml-3">{{ userName }}</span>
            </button>
            </div>
          </template>
        </el-popover>
      </div>
    </div>
  </nav>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useRouter } from "vue-router";
import { useState } from "@/state";
export default defineComponent({
  emits: ["input"],
  setup(_, { emit }) {
    const onChange = (e: Event) => {
      emit("input", (e.target as HTMLInputElement).value);
    };
    const router = useRouter();

    const { userName, loggedIn, unsetUserState } = useState();
    return {
      onChange,
      jumpToCreateSpace() {
        if (!loggedIn.value) {
          router.push({ name: "Login" });
        } else {
          router.push({ name: "CreateSpace" });
        }
      },
      jumpToProfile() {
        if (!loggedIn.value) {
          router.push({ name: "Login" });
        } else {
          router.push({
            name: "Profile",
            params: { userName: userName.value },
          });
        }
      },
      onLogout() {
        unsetUserState();
      },
      loggedIn,
      userName,
    };
  },
});
</script>

<style>
@import "../assets/styles/niched-styles.css";
</style>
