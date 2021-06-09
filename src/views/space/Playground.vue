<template>
  <div class="row py-5 px-4">
    <div class="col-md-10 mx-auto">
      <!-- Profile widget -->
      <div class="bg-white shadow rounded overflow-hidden mt-3s">
        <div
          class="px-4 pt-0 pb-5 cover"
          style="
            background-image: url('https://iamafoodblog.b-cdn.net/wp-content/uploads/2021/04/mayo-ramen-2638w.jpg');
            background-position: center;
            height: 350px;
          "
        >
          <div class="mb-2 text-white d-flex justify-content-center">
            <div class="px-4">
              <h2 class="pt-5 my-4">
                {{ "Apple WWDC Event Watching Session" }}
              </h2>
            </div>
          </div>
        </div>

        <div class="row">
          <div class="col-sm-6">
            <div class="bg-light px-4 py-3 d-flex text-left">
              <h2>Ramen</h2>
            </div>
          </div>
          <div class="col-sm-4">
            <div class="bg-light px-4 py-3 d-flex text-left">
              <p>Ramen</p>
            </div>
          </div>
          <div class="col-sm-2">
            <div class="bg-light px-4 py-3 d-flex justify-content-end text-center">
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
          </div>
        </div>
        hello

        <div class="media align-items-end profile-head">
          <div class="profile m-3">
            <a href="#" class="btn btn-dark btn-sm btn-block">Interested</a>
          </div>
        </div>
        

        hello
        <div class="row py-5 px-4">
          <div class="col-md-8 order-0">
            <el-card style="margin: 20px auto">
              <template #header>
                <div>
                  <span><b>Introduction</b></span>
                  <el-button type="text" style="float: right; margin-top: -10px"
                    >Edit</el-button
                  >
                </div>
              </template>
              <div class="text item">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
                <br />
                <br />
                Ut enim ad minim veniam, quis nostrud exercitation ullamco
                laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
                dolor in reprehenderit in voluptate velit esse cillum dolore eu
                fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
                proident, sunt in culpa qui officia deserunt mollit anim id est
                laborum.
              </div>
            </el-card>

            <el-card style="margin: 20px auto">
              <template #header>
                <div>
                  <span>@{{ userName }}'s <b>Interests</b></span>
                  <el-button type="text" style="float: right; margin-top: -10px"
                    >Edit</el-button
                  >
                </div>
              </template>
              <p>{{ interests }}</p>
            </el-card>

            <el-card style="margin: 20px auto">
              <template #header>
                <div>
                  <span>@{{ userName }}'s <b>Spaces</b></span>
                  <el-button type="text" style="float: right; margin-top: -10px"
                    >Edit</el-button
                  >
                </div>
              </template>
              <p>{{ subscribedGroups }}</p>
              <div v-for="o in 4" :key="o" class="text item">
                {{ "List item " + o }}
              </div>
            </el-card>
          </div>

          <div class="col-md-4 order-1">
            <el-card style="margin: 20px auto">
              <div>
                <h3>Welcome, @{{ userName }}</h3>
                <p>
                  Your personalized Niched homepage. Come here to check in with
                  your favorite communities
                </p>
                <div style="width: 150px; margin: auto">
                  <el-avatar
                    :size="150"
                    src="https://www.petage.com/wp-content/uploads/2019/09/Depositphotos_74974941_xl-2015-e1569443284386-670x627.jpg"
                    style="margin-top: 40px; margin-bottom: 40px; width: 100%"
                  ></el-avatar>
                </div>
              </div>
            </el-card>
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
  name: "Playground",
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

.header-image {
  height:650px;
}
</style>
