<template>
  <div class="row">
    <div class="" v-for="(userName, i) in userNames" :key="i">
      <div class="text-center col mt-2">
        <a :href="'/users/' + userName">
          <img
            class="rounded-circle"
            alt="100x100"
            :src="randomUserPhotos[i]"
            data-holder-rendered="true"
            :style="widthObject"
          />
          <div v-if="!sm">
            {{ userName }}
          </div>
        </a>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, PropType, watchEffect } from "vue";
import axios from "axios";
type UserName = string;

export default defineComponent({
  props: {
    userNames: {
      required: true,
      type: Array as PropType<UserName[]>,
    },
    sm: {
      type: Boolean,
    },
  },
  setup(props) {
    const randomUserPhotos = ref<(string | never)[]>([]);

    const fetchRandomUserPhotos = async () => {
      const res = await axios.get(
        `https://randomuser.me/api/?results=${props.userNames.length}`
      );
      return res.data.results.map(
        (profile: { name: { first: string }; picture: { large: string } }) =>
          profile.picture.large
      );
    };

    watchEffect(async () => {
      randomUserPhotos.value = await fetchRandomUserPhotos();
    });

    return {
      randomUserPhotos,
      widthObject: { width: props.sm ? "40px" : "80px" },
    };
  },
});
</script>

<style scoped></style>
