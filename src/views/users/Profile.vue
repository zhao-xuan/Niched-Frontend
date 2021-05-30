<template>
  <h1>profile page for {{ id }}</h1>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useRoute } from "vue-router";
export default defineComponent({
  name: "Profile",
  setup() {
    const route = useRoute();
    return { id: route.params.id };
  },
});
</script>
