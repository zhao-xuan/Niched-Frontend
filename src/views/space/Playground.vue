<template>
  <div class="row py-5 px-4">
    <div class="col-md-10 mx-auto">
      <!-- Profile widget -->
      <div class="bg-light shadow rounded overflow-hidden mt-3s">
        <div
          class="px-4 pt-0 pb-5 cover rounded"
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
            <div class="px-4 pt-3 d-flex text-left">
              <h2>Ramen Lover</h2>
            </div>
          </div>
          <div class="col-sm-4">
            <div class="px-4 pt-3 d-flex text-left">
              <p>Exploring London for the best Ramen shops! Weekly events</p>
            </div>
          </div>
          <div class="col-sm-2">
            <div class="px-4 py-3 d-flex justify-content-end text-center">
              <ul class="list-inline mb-0">
                <li class="list-inline-item">
                  <h5 class="font-weight-bold mb-0 d-block">40</h5>
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
            <el-card style="margin: 20px auto; background-color: #FFE8E0;">
              <template #header>
                <div>
                  <span>
                    <a href="https://www.google.co.uk">
                      <b><font color="#FF7744">Event: </font>Let’s go to Ichiran Ramen!</b>
                    </a>
                  </span>
                  <el-button type="text" style="float: right; margin-top: -10px"
                    >Sunday 15/06/2021 @ 12:00PM</el-button
                  >
                </div>
              </template>
              <div class="text item">
                There is a new item in the Ichiran ramen shop: Yakikamo. Sounds good. Anyone interested? 
                We can go together. Meeting at the Imperial College Central Library. Anyone is welcome to 
                join, and please remember to bring you’re friends along too! Hoping to get over 10 people 
                this time!
              </div>
            </el-card>

            <el-card style="margin: 20px auto">
              <template #header>
                <div>
                  <span><b>What’s your favourite Ramen shop in London?</b></span>
                  <el-button type="text" style="float: right; margin-top: -10px"
                    >More</el-button
                  >
                </div>
              </template>
              <div class="text item">
                There is a new item in the Ichiran ramen shop: Yakikamo. Sounds good. Anyone interested?
                We can go together. Meeting at the Imperial College Central Library. Anyone is welcome to
                join, and please remember to bring you’re friends along too! Hoping to get over 10 people
                this time! Please remember to bring you’re friends along and...
              </div>
            </el-card>

            <el-card style="margin: 20px auto">
              <template #header>
                <div>
                  <span><b>Ramen really is better in Japan than in London! Today I found out that...</b></span>
                  <el-button type="text" style="float: right; margin-top: -10px"
                    >More</el-button
                  >
                </div>
              </template>
              <div class="text item">
                There is a new item in the Ichiran ramen shop: Yakikamo. Sounds good. Anyone interested?
                We can go together. Meeting at the Imperial College Central Library. Anyone is welcome to
                join, and please remember to bring you’re friends along too! Hoping to get over 10 people
                this time! Please remember to bring you’re friends along and...
              </div>
            </el-card>

            <el-card style="margin: 20px auto">
              <template #header>
                <div>
                  <span><b>My friend Leo’s birthday is coming up soon! What do you recommend?</b></span>
                  <el-button type="text" style="float: right; margin-top: -10px"
                    >More</el-button
                  >
                </div>
              </template>
              <div class="text item">
                There is a new item in the Ichiran ramen shop: Yakikamo. Sounds good. Anyone interested?
                We can go together. Meeting at the Imperial College Central Library. Anyone is welcome to
                join, and please remember to bring you’re friends along too! Hoping to get over 10 people
                this time! Please remember to bring you’re friends along and...
              </div>
            </el-card>
            
            <el-card style="margin: 20px auto; background-color: #FFE8E0;">
              <template #header>
                <div>
                  <span>
                    <a href="https://www.google.co.uk">
                      <b><font color="#FF7744">Event: </font>Want to try Chinese DanDan Noodle too?</b>
                    </a>
                  </span>
                  <el-button type="text" style="float: right; margin-top: -10px"
                    >Sunday 15/06/2021 @ 12:00PM</el-button
                  >
                </div>
              </template>
              <div class="text item">
                There is a new item in the Ichiran ramen shop: Yakikamo. Sounds good. Anyone interested? 
                We can go together. Meeting at the Imperial College Central Library. Anyone is welcome to 
                join, and please remember to bring you’re friends along too! Hoping to get over 10 people 
                this time!
              </div>
            </el-card>

          </div>

          <div class="col-md-4 order-1">
            <el-card style="margin: 20px auto">
              <div>
                <h3>Create a new Post</h3>
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

            <el-card style="margin: 20px auto">
              <div>
                <h3>Organise a new Event!</h3>
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
