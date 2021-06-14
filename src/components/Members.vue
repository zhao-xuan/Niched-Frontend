<template>
  <div class="row">
    <div class="" v-for="(userName, i) in userNames" :key="userName">
      <div class="text-center col">
        <img
          class="rounded-circle"
          alt="100x100"
          :src="randomUsers[i].picture"
          data-holder-rendered="true"
          :style="widthObject"
        />
        <div>{{ userName }}</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, PropType, onMounted, watchEffect } from "vue";
import axios from "axios";
type UserName = string;
type Profile = {
  name: string;
  picture: string;
};
export default defineComponent({
  props: {
    userNames: {
      required: true,
      type: Array as PropType<UserName[]>,
    },
    sm: {
      type : Boolean,
    }
  },
  setup(props) {
    const randomUsers = ref<(Profile | never)[]>([]);

    const fetchRandomUserImages = async () => {
      const res = await axios.get(
        `https://randomuser.me/api/?results=${props.userNames.length}`
      );

      return res.data.results.map(
        (profile: { name: { first: string }; picture: { large: string } }) => ({
          name: profile.name.first,
          picture: profile.picture.large,
        })
      );
    };

    watchEffect(async () => {
      randomUsers.value = await fetchRandomUserImages();
    });

    return { randomUsers,widthObject:{ width : props.sm ? '40px' : '80px'} };
  },
});
</script>

<style scoped></style>
