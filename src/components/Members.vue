<template>
  <div class="row">
    <div class="" v-for="(userName, i) in userNames" :key="userName">
      <div class="text-center col">
        <img
          class="rounded-circle"
          alt="100x100"
          :src="randomUsers[i].picture"
          data-holder-rendered="true"
          style="width: 80px"
        />
        <div>{{ randomUsers[i].name }}</div>
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
  },
  setup(props) {
    const randomUsers = ref<(string | never)[]>([]);
    watchEffect(() => {
      const fetchRandomUserImages = async () => {
        const res = await axios.get(
          `https://randomuser.me/api/?results=${props.userNames.length}`
        );
        console.log(res.data.results, "HERE");
        randomUsers.value = res.data.results.map(
          (profile: {
            name: { first: string };
            picture: { large: string };
          }) => ({
            name: profile.name.first,
            picture: profile.picture.large,
          })
        );
      };
      fetchRandomUserImages();
    });
    return { randomUsers };
  },
});
</script>

<style scoped></style>
