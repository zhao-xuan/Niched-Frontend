<template>
  <Dashboard />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Dashboard from "./dashboard/Dashboard.vue";

export default defineComponent({
  name: "Home",
  components: { Dashboard },
});
</script>
