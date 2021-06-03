<template>
  <el-container>
    <el-main>
      <SpaceGroup v-bind:spacelist="recommend" title="Today's Recommended Niches" />
      <SpaceGroup v-for="item in niches" :key="item" :spacelist="item.spaces" :title="item.tagName" />
    </el-main>
    <el-aside width="30%">
      <div style="margin: 40px">
        <el-card style="border-radius: 20px">
          <div>
            <h3>Home</h3>
            <p>
              Your personalized Niched homepage. Come here to check in with your
              favorite communities
            </p>
          </div>
          <div>
            <h3>Event</h3>
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
    </el-aside>
  </el-container>
</template>

<style>
.niche-card-image {
  width: 80px;
  height: 80px;
}

.niche-card {
  margin: 10px;
}
</style>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { useRouter } from "vue-router";
import SpaceGroup from './SpaceGroup.vue';
import axios from 'axios';

export default defineComponent({
  name: "Dashboard",
  components: { SpaceGroup },
  setup() {
    const router = useRouter();
    const recommend = ref([
      {
          title: "Ramen tasting",
          detail: "Exploring London for the best Ramen shop",
          imgUrl:
            "https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png",
        }
    ]);
    return {
      recommend,
      niches: [
        {
          tagName: "Ramen",
          spaces: [
            {
              title: "Ramen tasting",
              detail: "Exploring London for the best Ramen shop",
              imgUrl:
                "https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png",
            },
            {
              title: "Ramen tasting",
              detail: "Exploring London for the best Ramen shop",
              imgUrl:
                "https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png",
            },
          ],
        },
        {
          tagName: "Ramen",
          spaces: [
            {
              title: "Ramen tasting",
              detail: "Exploring London for the best Ramen shop",
              imgUrl:
                "https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png",
            },
            {
              title: "Ramen tasting",
              detail: "Exploring London for the best Ramen shop",
              imgUrl:
                "https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png",
            },
          ],
        },
        {
          tagName: "Ramen",
          spaces: [
            {
              title: "Ramen tasting",
              detail: "Exploring London for the best Ramen shop",
              imgUrl:
                "https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png",
            },
            {
              title: "Ramen tasting",
              detail: "Exploring London for the best Ramen shop",
              imgUrl:
                "https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png",
            },
          ],
        },
      ],
      events: [
        {
          title: "Sunday afternoon",
          detail: "Bring your money and come",
          datetime: "12:00PM June 3 2021",
          location: "Ichiran London",
        },
        {
          title: "Sunday afternoon",
          detail: "Bring your money and come",
          datetime: "12:00PM June 3 2021",
          location: "Ichiran London",
        },
      ],
    };
  },
  mounted() {
    console.log()
    this.recommend.push({
          title: "Ramen tasting",
          detail: "Exploring London for the best Ramen shop",
          imgUrl:
            "https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png",
        })
    axios.get("http://niched-api.herokuapp.com/group/all").then(res => {
      const data = res.data;
      const new_recommend = [];
      for (var i in res.data) {
        new_recommend.push({
          title : data[i]["name"],
          detail : data[i]["description"],
          imgUrl : data[i]["image_url"]
        })
      }
      this.recommend = new_recommend;
      console.log(this.recommend)
    });
  },
});
</script>
