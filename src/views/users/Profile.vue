<template>
  <TopBar />
  <div style="background-color: rgb(212, 225, 253)">
    <div style="width: 150px; margin: auto">
      <el-avatar
        :size="150"
        src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
        style="margin-top: 40px; margin-bottom: 40px; width: 100%"
      ></el-avatar>
    </div>
  </div>

  <el-card style="margin: 20px auto; width: 60%">
    <template #header>
      <div>
        <span>Intro</span>
        <el-button type="text" style="float: right; margin-top: -10px"
          >Edit</el-button
        >
      </div>
    </template>
    <div class="text item">this is {{ userName }}</div>
  </el-card>

      <el-card style="margin: 20px auto;">
        <template #header>
          <div>
            <span>Following Spaces</span>
            <el-button type="text" style="float: right; margin-top: -10px"
              >Edit</el-button
            >
          </div>
        </template>
        <p> HELLO WORLD </p>
        <!-- <SpaceGroup
          v-for="item in niches"
          :key="item"
          :spacelist="item.spaces"
          :title="item.tagName"
        /> -->
        <div v-for="o in 4" :key="o" class="text item">
          {{ "List item " + o }}
        </div>
      </el-card>
    </div>

    <div class="col-md-4 order-1">
      <el-card style="margin: 20px auto;">
          <div>
            <h3>Welcome, Hoang and {{ username }}</h3>
            <p>
              Your personalized Niched homepage. Come here to check in with your
              favorite communities
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
            <h3>Your Events</h3>
            <p>Check out the latest events you've signed up for here!</p>
            <el-card
              style="border-radius: 10px; margin-bottom: 10px"
              v-for="event in events"
              :key="event"
            >
              <h5>{{ event.title + " @ " + event.location }}</h5>
              <p>{{ event.datetime }}</p>
              <p>{{ event.detail }}</p>
            </el-card>
          </div>
        </el-card>
    </div>
  </div>
</div>

</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useRouter } from "vue-router";
import TopBar from "../Topbar.vue";
import { useState } from "@/state";

export default defineComponent({
  name: "Profile",
  components: { TopBar },
  setup() {
    const router = useRouter();
    const { userName, loggedIn } = useState();
    if (!loggedIn.value) {
      router.push({ name: "Login" });
    }
    return {
      userName,
    };
  },
});
</script>
