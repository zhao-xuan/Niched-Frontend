<template>
  <div class="row py-5 px-4">
    <div class="col-md-5 mx-auto">
      <!-- Profile widget -->
      <div class="bg-white shadow rounded overflow-hidden mt-3s">
        <div
          class="px-4 pt-0 pb-5 cover"
          :style="{
            backgroundImage: 'url(https://www.apple.com/v/home/hc/images/overview/macos_hw_02__fxfwijtx516q_large_2x.png)',
          }"
        >
          <div class="mb-2 text-white d-flex justify-content-center">
            <div class="px-4">
              <h2 class="pt-5 my-4">
                {{ "Apple WWDC Event Watching Session" }}
              </h2>
            </div>
            <p class="small mb-4"></p>
          </div>
        </div>
        <div class="media align-items-end profile-head">
            <div class="profile m-3">
              <a href="#" class="btn btn-dark btn-sm btn-block"
                >Interested</a
              >
            </div>
            <div class="profile m-3">
              <a href="#" class="btn btn-dark btn-sm btn-block"
                >Going</a
              >
            </div>
            <div class="profile m-3">
              <a href="#" class="btn btn-dark btn-sm btn-block"
                >Comment</a
              >
            </div>
          </div>
        <div class="bg-light p-4 d-flex justify-content-end text-center">
          <ul class="list-inline mb-0">
            <li class="list-inline-item">
              <h5 class="font-weight-bold mb-0 d-block">40</h5>
              <small class="text-muted">
                <i class="fas fa-user mr-1"></i>Interested</small
              >
            </li>
            <li class="list-inline-item">
              <h5 class="font-weight-bold mb-0 d-block">23</h5>
              <small class="text-muted">
                <i class="fas fa-user mr-1"></i>Going</small
              >
            </li>
          </ul>
        </div>
        <div class="px-4 py-3">
          <h5 class="mb-0">Event Details</h5>
          <div class="p-4 rounded shadow-sm bg-light">
            <p>Location: 28-32 Pembridge Gardens @ Notting Hill Gate, London</p>
            <p>Date Time: June 19 2021, 12:00PM</p>
            <p>Requirement: Bring $20 cash and your ID</p>
          </div>
        </div>
        <div class="px-4 py-3">
          <h5 class="mb-0">About</h5>
          <div class="p-4 rounded shadow-sm bg-light">
            <p>This is an example event. This is an example event. This is an example event. 
              This is an example event. This is an example event. This is an example event. </p>
          </div>
        </div>
        <div class="px-4 py-3">
          <h5 class="mb-0">Comment Thread</h5>
          <div class="p-4 rounded shadow-sm bg-light">
            <p>This is an example event. This is an example event. This is an example event. 
              This is an example event. This is an example event. This is an example event. </p>
          </div>
        </div>
        <div class="py-4 px-4">
          <div class="d-flex align-items-center justify-content-between mb-3">
            <h5 class="mb-0">Similar Events</h5>
            <a href="#" class="btn btn-link text-muted">Show all</a>
          </div>
          <div class="row">
            <div class="col-lg-6 mb-2 pr-lg-1">
              <img
                src="https://images.unsplash.com/photo-1469594292607-7bd90f8d3ba4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80"
                alt=""
                class="img-fluid rounded shadow-sm"
              />
            </div>
            <div class="col-lg-6 mb-2 pl-lg-1">
              <img
                src="https://images.unsplash.com/photo-1493571716545-b559a19edd14?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80"
                alt=""
                class="img-fluid rounded shadow-sm"
              />
            </div>
            <div class="col-lg-6 pr-lg-1 mb-2">
              <img
                src="https://images.unsplash.com/photo-1453791052107-5c843da62d97?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80"
                alt=""
                class="img-fluid rounded shadow-sm"
              />
            </div>
            <div class="col-lg-6 pl-lg-1">
              <img
                src="https://images.unsplash.com/photo-1475724017904-b712052c192a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80"
                alt=""
                class="img-fluid rounded shadow-sm"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useSpace } from "@/hooks/useSpace";
import { useRoute } from "vue-router";

export default defineComponent({
  name: "Event",
  setup() {
    const route = useRoute();
    const groupId = route.params.id as string;
    const { name, imageUrl, description } = useSpace(groupId, true);

    return {
      name,
      imageUrl,
      description,
    };
  },
});
</script>
<style>
.profile-head {
  transform: translateY(5rem);
}

.cover {
  background-size: cover;
  background-repeat: no-repeat;
}
</style>
