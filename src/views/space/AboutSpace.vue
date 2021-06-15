<template>
  <el-card class="my-5">
    <div>
      <div>
        <h3>About the group</h3>
      </div>
    </div>
    <div class="p-2">
      <div class="mb-3">
        {{ description }}
      </div>
      <div class="d-flex flex-row justify-content-between mb-3">
        <div class="font-weight-bold">
          <div>
            {{ members.length }}
          </div>
          <div>Members</div>
        </div>
        <div class="font-weight-bold">
          {{ threads.length }}
          <div class="font-weight-bold">Threads</div>
        </div>
        <div class="font-weight-bold">
          {{ events.length }}
          <div class="font-weight-bold">Events</div>
        </div>
      </div>
      <div class="border-top pt-2 text-muted font-weight-bold">
        created : {{ new Date(creationDate).toLocaleString() }}
      </div>
    </div>
  </el-card>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "Space",
  props: ["members", "threads", "events"],
});
</script>