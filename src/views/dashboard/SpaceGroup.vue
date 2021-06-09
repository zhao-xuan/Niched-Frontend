<template>
  <div style="margin-top: 40px">
    <h3>
      {{ title }}
    </h3>
    <div class="card-columns">
      <div v-for="niche in columnDivided" :key="niche">
          <div class="card">
            <div style="cursor: pointer" @click="jumpToSpace(niche[0].groupId)">
              <el-card
                :body-style="{ padding: '0px' }"
                style="border-radius: 10px"
              >
                <img :src="`${niche[0].imgUrl}`" class="card-image" />
                <div
                  style="display: flex; margin: 20px; flex-direction: column"
                >
                  <h5>{{ niche[0].title }}</h5>
                  <p>{{ niche[0].detail }}</p>
                </div>
              </el-card>
          </div>
        </div>
          <div class="card" v-if="niche[1]">
            <div style="cursor: pointer" @click="jumpToSpace(niche[1].groupId)">
              <el-card
                :body-style="{ padding: '0px' }"
                style="border-radius: 10px"
              >
                <img :src="`${niche[1].imgUrl}`" class="card-image" />
                <div
                  style="display: flex; margin: 20px; flex-direction: column"
                >
                  <h5>{{ niche[1].title }}</h5>
                  <p>{{ niche[1].detail }}</p>
                </div>
              </el-card>
            </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.card-image {
  width: 100%;
  display: block;
}
</style>

<script lang="ts">
import { defineComponent } from "vue";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "SpaceGroup",
  components: {},
  props: ["title", "spacelist"],
  computed: {
    columnDivided(): any[][] {
      const temp = [];
      for (var i = 0; i < this.spacelist.length; i += 2) {
        const tt = [this.spacelist[i]].concat(
          i + 1 >= this.spacelist.length ? [] : [this.spacelist[i + 1]]
        );
        temp.push(tt);
      }

      console.log(temp);
      return temp;
    },
  },
  setup() {
    const router = useRouter();
    return {
      jumpToSpace(item: string) {
        router.push({ name: "Space", params: { id: item } });
      },
    };
  },
});
</script>
