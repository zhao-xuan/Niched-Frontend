<template>
  <el-card class="mt-5 mx-auto" style="broder-radius: 10px" shadow="hover">
    <div>
      <h4>Organise a new Event!</h4>
      <form class="pt-2" @submit.prevent>
        <div class="form-group">
          <input
            type="text"
            class="form-control"
            id="eventTitle"
            placeholder="Event Title"
            v-model="eventTitle"
          />
        </div>
        <div class="form-group row">
          <label for="example-date-input" class="col-2 col-form-label"
            >Date</label
          >
          <div class="col-10">
            <input
              class="form-control"
              type="date"
              id="example-date-input"
              v-model="eventDate"
            />
          </div>
        </div>
        <div class="form-group row">
          <label for="example-time-input" class="col-2 col-form-label"
            >Time</label
          >
          <div class="col-10">
            <input
              class="form-control"
              type="time"
              id="example-time-input"
              v-model="eventTime"
            />
          </div>
        </div>
        <div class="form-group">
          <textarea
            type="text"
            class="form-control"
            rows="3"
            placeholder="Event Details"
            v-model="eventDescription"
          ></textarea>
        </div>
        <div class="form-group">
          <input
            type="text"
            class="form-control"
            id="eventMemberCount"
            placeholder="Member Count (Optional)"
          />
        </div>
        <div class="form-group" style="float: right">
          <button
            type="submit"
            class="btn btn-primary mb-2"
            @click="onSubmitEvent"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  </el-card>
</template>

<script lang="ts">
import { ref, defineComponent, watch } from "vue";
import { useRoute } from "vue-router";
import { useState } from "@/state";
import { postEventCreation } from "@/api/event";
import { usePost } from "@/hooks/usePost";
export default defineComponent({
  name: "CreateSpace",
  props: {
    postingEvent: {
      required: true,
      type: Boolean,
    },
  },
  emits: ["update:postingEvent"],
  setup(_, { emit }) {
    const eventTitle = ref("");
    const eventDescription = ref("");
    const eventDate = ref("");
    const eventTime = ref("");

    const route = useRoute();
    const groupId = route.params.id as string;
    const { loggedIn, userName } = useState();
    const { doPost, data, posting, posted } = usePost(postEventCreation);

    watch([data, posted], ([d, p]) => {
      if (d && p) {
        eventTitle.value = "";
        eventDescription.value = "";
        eventDate.value = "";
        eventTime.value = "";
      }
    });

    watch(posting, () => {
      emit("update:postingEvent", posting.value);
    });

    const onSubmitEvent = async () => {
      if (!loggedIn.value) {
        alert("Please login first");
      }

      doPost({
        group_id: groupId,
        author_id: userName.value,
        description: eventDescription.value,
        title: eventTitle.value,
        tags: [],
        event_date: `${eventDate.value}T${eventTime.value}:00`,
      });
    };

    return {
      eventTitle,
      eventDescription,
      eventDate,
      eventTime,
      onSubmitEvent,
    };
  },
});
</script>
