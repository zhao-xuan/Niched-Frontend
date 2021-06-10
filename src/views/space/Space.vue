<template>
  <!-- <TopBar /> -->
  <div class="row py-5 px-4">
    <div class="col-md-10 mx-auto">
      <!-- Profile widget -->
      <div class="bg-light shadow rounded overflow-hidden mt-3s">
        <div
          class="px-4 pt-0 pb-5 cover rounded"
          style="
            background-image: url('https://iamafoodblog.b-cdn.net/wp-content/uploads/2021/04/mayo-ramen-2638w.jpg');
            background-position: center;
            height: 300px;
          "
        >
          <div class="mb-2 text-white d-flex justify-content-center">
            <div class="px-4">
              <!-- <h2 class="pt-5 my-4">
                {{ "Apple WWDC Event Watching Session" }}
              </h2> -->
            </div>
          </div>
        </div>

        <div class="row">
          <div class="col-sm-6">
            <div class="px-4 pt-3 d-flex text-left">
              <h2>{{ name }}</h2>
            </div>
          </div>
          <div class="col-sm-4">
            <div class="px-4 pt-3 d-flex text-left">
              <p>{{ description }}</p>
            </div>
          </div>
          <div class="col-sm-2">
            <div class="px-4 py-3 d-flex justify-content-end text-center">
              <ul class="list-inline mb-0">
                <li class="list-inline-item">
                  <h5 class="font-weight-bold mb-0 d-block">
                    {{ members.length }}
                  </h5>
                  <small class="text-muted">
                    <i class="fas fa-user mr-1"></i>Members</small
                  >
                </li>
                <li class="list-inline-item">
                  <h5 class="font-weight-bold mb-0 d-block">23</h5>
                  <small class="text-muted">
                    <i class="fas fa-user mr-1"></i>Posts</small
                  >
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div class="row pb-4 px-4">
          <div class="col-md-8 order-0">
            <el-card style="margin: 20px auto; background-color: #ffe8e0">
              <template #header>
                <div>
                  <span>
                    <a href="https://www.google.co.uk">
                      <b
                        ><font color="#FF7744">Event: </font>Let’s go to Ichiran
                        Ramen!</b
                      >
                    </a>
                  </span>
                  <el-button type="text" style="float: right; margin-top: -10px"
                    >Sunday 15/06/2021 @ 12:00PM</el-button
                  >
                </div>
              </template>
              <div class="text item">
                There is a new item in the Ichiran ramen shop: Yakikamo. Sounds
                good. Anyone interested? We can go together. Meeting at the
                Imperial College Central Library. Anyone is welcome to join, and
                please remember to bring you’re friends along too! Hoping to get
                over 10 people this time!
              </div>
            </el-card>

            <el-card style="margin: 20px auto">
              <template #header>
                <div>
                  <span
                    ><b>What’s your favourite Ramen shop in London?</b></span
                  >
                  <el-button type="text" style="float: right; margin-top: -10px"
                    >More</el-button
                  >
                </div>
              </template>
              <div class="text item">
                There is a new item in the Ichiran ramen shop: Yakikamo. Sounds
                good. Anyone interested? We can go together. Meeting at the
                Imperial College Central Library. Anyone is welcome to join, and
                please remember to bring you’re friends along too! Hoping to get
                over 10 people this time! Please remember to bring you’re
                friends along and...
              </div>
            </el-card>

            <el-card style="margin: 20px auto">
              <template #header>
                <div>
                  <span
                    ><b
                      >Ramen really is better in Japan than in London! Today I
                      found out that...</b
                    ></span
                  >
                  <el-button type="text" style="float: right; margin-top: -10px"
                    >More</el-button
                  >
                </div>
              </template>
              <div class="text item">
                There is a new item in the Ichiran ramen shop: Yakikamo. Sounds
                good. Anyone interested? We can go together. Meeting at the
                Imperial College Central Library. Anyone is welcome to join, and
                please remember to bring you’re friends along too! Hoping to get
                over 10 people this time! Please remember to bring you’re
                friends along and...
              </div>
            </el-card>

            <el-card style="margin: 20px auto">
              <template #header>
                <div>
                  <span
                    ><b
                      >My friend Leo’s birthday is coming up soon! What do you
                      recommend?</b
                    ></span
                  >
                  <el-button type="text" style="float: right; margin-top: -10px"
                    >More</el-button
                  >
                </div>
              </template>
              <div class="text item">
                There is a new item in the Ichiran ramen shop: Yakikamo. Sounds
                good. Anyone interested? We can go together. Meeting at the
                Imperial College Central Library. Anyone is welcome to join, and
                please remember to bring you’re friends along too! Hoping to get
                over 10 people this time! Please remember to bring you’re
                friends along and...
              </div>
            </el-card>

            <el-card style="margin: 20px auto; background-color: #ffe8e0">
              <template #header>
                <div>
                  <span>
                    <a href="https://www.google.co.uk">
                      <b
                        ><font color="#FF7744">Event: </font>Want to try Chinese
                        DanDan Noodle too?</b
                      >
                    </a>
                  </span>
                  <el-button type="text" style="float: right; margin-top: -10px"
                    >Sunday 15/06/2021 @ 12:00PM</el-button
                  >
                </div>
              </template>
              <div class="text item">
                There is a new item in the Ichiran ramen shop: Yakikamo. Sounds
                good. Anyone interested? We can go together. Meeting at the
                Imperial College Central Library. Anyone is welcome to join, and
                please remember to bring you’re friends along too! Hoping to get
                over 10 people this time!
              </div>
            </el-card>
          </div>

          <div class="col-md-4 order-1">
            <el-card style="margin: 20px auto">
              <div>
                <h3>Create a new Post</h3>
                <form class="pt-2">
                  <div class="form-group">
                    <input
                      type="email"
                      class="form-control"
                      id="postTitle"
                      placeholder="Post Title"
                    />
                  </div>
                  <div class="form-group">
                    <textarea
                      class="form-control"
                      id="postDescription"
                      rows="3"
                      placeholder="Post Details"
                    ></textarea>
                  </div>
                  <div class="form-group" style="float: right">
                    <button type="submit" class="btn btn-primary mb-2">
                      Create Post
                    </button>
                  </div>
                </form>
              </div>
            </el-card>

            <el-card style="margin: 20px auto">
              <div>
                <h3>Organise a new Event!</h3>
                <form class="pt-2">
                  <div class="form-group">
                    <input
                      type="email"
                      class="form-control"
                      id="eventTitle"
                      placeholder="Event Title"
                    />
                  </div>
                  <div class="form-group row">
                    <label for="example-date-input" class="col-2 col-form-label"
                      >Date</label
                    >
                    <div class="col-10">
                      <input
                        class="form-control"
                        type="date"
                        value="2011-08-19"
                        id="example-date-input"
                      />
                    </div>
                  </div>
                  <div class="form-group row">
                    <label for="example-time-input" class="col-2 col-form-label"
                      >Time</label
                    >
                    <div class="col-10">
                      <input
                        class="form-control"
                        type="time"
                        value="13:45:00"
                        id="example-time-input"
                      />
                    </div>
                  </div>
                  <div class="form-group">
                    <textarea
                      class="form-control"
                      id="eventDescription"
                      rows="3"
                      placeholder="Event Details"
                    ></textarea>
                  </div>
                  <div class="form-group">
                    <input
                      type="text"
                      class="form-control"
                      id="eventMemberCount"
                      placeholder="Member Count (Optional)"
                    />
                  </div>
                  <div class="form-group" style="float: right">
                    <button type="submit" class="btn btn-primary mb-2">
                      Create Post
                    </button>
                  </div>
                </form>
              </div>
            </el-card>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
// import TopBar from "../Topbar.vue";
import { defineComponent } from "vue";
import { useSpace } from "@/hooks/useSpace";
import { useRoute } from "vue-router";

export default defineComponent({
  name: "Space",
  // components: { TopBar },
  setup() {
    const route = useRoute();
    const groupId = route.params.id as string;
    const { name, imageUrl, description, members } = useSpace(groupId, true);

    return {
      name,
      imageUrl,
      description,
      members,
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
