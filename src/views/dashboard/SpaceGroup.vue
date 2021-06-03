<template>
    <div style="margin-top: 40px; margin-left: 40px">
        <h3>
          {{ title }}
        </h3>
        <el-row :gutter="15">
          <el-col
            :span="10"
            class="niche-card"
            v-for="niche in spacelist"
            :key="niche"
            :title="`${niche} space`"
            style="cursor: pointer"
            @click="jumpToSpace(niche.title)"
          >
            <el-card style="border-radius: 20px">
              <div style="display: flex; flex-direction: row">
                <img :src="`${niche.imgUrl}`" class="niche-card-image" />
                <div style="display: flex; margin: 5px; flex-direction: column">
                  <h5>{{ niche.title }}</h5>
                  <p>{{ niche.detail }}</p>
                </div>
              </div>
            </el-card>
          </el-col>
        </el-row>
      </div>
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
import { defineComponent } from "vue";
import { useRouter } from "vue-router";

export default defineComponent({
    name : "SpaceGroup",
    components : {},
    props : ["title", "spacelist"],
    setup() {
        const router = useRouter();
        return {

        }
    },
})
</script>
