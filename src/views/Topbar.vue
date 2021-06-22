<template>
  <nav class="navbar navbar-expand-sm shadow topbar">
    <div class="container-fluid d-flex justify-content-space">
      <div class="d-flex align-items-end">
        <a class="navbar-brand" href="/home"
          ><h1 class="text-dark ml-0 pl-0">niched</h1>
        </a>
      </div>
      <div>
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
          <button class="btn btn btn-light m-2 my-sm-0" @click="jumpToEvents">
            <h6 class="mx-1 my-1">Events</h6>
          </button>
          <button
            class="btn btn btn-light m-2 my-sm-0"
            @click="jumpToCreateSpace"
          >
            <h6 class="mx-1 my-1">Create&nbsp;Space</h6>
          </button>
          <button
            class="btn btn-secondary m-2 my-sm-0"
            @click="jumpToProfile"
            v-if="!loggedIn"
          >
            <h6 v-if="!loggedIn" class="mx-1 my-1">Login</h6>
          </button>
          <el-popover
            placement="top"
            :width="160"
            trigger="hover"
            v-if="loggedIn"
          >
            <div>
              <button
                class="btn btn-outline-info w-100 my-1"
                @click="jumpToProfile"
                v-if="loggedIn"
              >
                <h6 v-if="loggedIn">My&nbsp;Profile</h6>
              </button>
              <button
                class="btn btn-outline-info w-100 my-1"
                @click="onLogout"
                v-if="loggedIn"
              >
                <h6 v-if="loggedIn">Logout</h6>
              </button>
            </div>
            <template #reference>
              <div
                class="d-flex flex-column align-items-center text-center mx-2"
                style="cursor: pointer"
              >
                <!-- <el-avatar
                  class="mt-1 pb-0 mb-0"
                  v-if="loggedIn"
                  icon="el-icon-user-solid"
                /> -->
                <div>
                  <button class="btn btn btn-info w-100 my-1" v-if="loggedIn">
                    <h6 class="mx-1 my-1" v-if="loggedIn">{{ userName }}</h6>
                  </button>
                </div>
              </div>
            </template>
          </el-popover>
        </div>
      </div>
    </div>
  </nav>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useRouter } from "vue-router";
import { useState } from "@/state";
export default defineComponent({
  setup() {
    const router = useRouter();

    const { userName, loggedIn, unsetUserState } = useState();
    return {
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
      jumpToEvents() {
        router.push({ name: "Events" });
      },
      onLogout() {
        unsetUserState();
        console.log("Asdf");
        router.go(0);
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
