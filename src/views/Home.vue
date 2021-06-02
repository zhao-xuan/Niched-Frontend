<template>
  <Topbar @input="onSearchSpace" />
  <Dashboard />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Dashboard from "./dashboard/Dashboard.vue";
import Topbar from "./Topbar.vue";

export default defineComponent({
  name: "Home",
  components: { Dashboard, Topbar },
  setup() {
    const onSearchSpace = (searchString: string) => {
      //TODO: fetch spaces
      console.log(searchString);
    };
    return {
      onSearchSpace,
    };
  },
});
</script>
