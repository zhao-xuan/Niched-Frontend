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
            <div>members</div>
        </div>
        <div class="font-weight-bold">
            {{ threads.length }}
            <div class="font-weight-bold">threads</div>
        </div>
        <div class="font-weight-bold">
            {{ events.length }}
            <div class="font-weight-bold">events</div>
        </div>
        </div>
        <div class="border-top pt-2 text-muted font-weight-bold">
        created : {{ new Date(creationDate).toLocaleString() }}
        </div>
    </div>
    </el-card>
</template>

<script lang="ts">
import { ref, defineComponent, watch } from "vue";
import { useSpace } from "@/hooks/useSpace";
import { useEvents } from "@/hooks/useEvent";
import { useThreads } from "@/hooks/useThread";
import { useRoute, useRouter } from "vue-router";
export default defineComponent({
  name: "Space",
  setup() {
    const postingThread = ref(false);
    const postingEvent = ref(false);

    const router = useRouter();
    const route = useRoute();
    const groupId = route.params.id as string;
    const { name, imageUrl, description, members, creationDate } = useSpace(
      groupId,
      true
    );
    const {
      events,
      fetching: fetchingEvents,
      doFetch: doFetchEvents,
    } = useEvents(groupId, true);

    const {
      threads,
      fetching: fetchingThreads,
      doFetch: doFetchThreads,
    } = useThreads(groupId, true);

    const jumpToEvent = (eventId: string) => {
      router.push({ path: `/event/${groupId}/${eventId}` });
    };

    watch([postingEvent, postingThread], ([ce, ct], [oe, ot]) => {
      //reload events data when posting new event/thread ends
      if (!ce && oe) {
        doFetchEvents();
      }
      if (!ct && ot) {
        doFetchThreads();
      }
    });

    const selectedTab = ref("threads");

    return {
      name,
      imageUrl,
      description,
      members,
      creationDate,

      events,
      fetchingEvents,
      postingEvent,

      threads,
      fetchingThreads,
      postingThread,

      jumpToEvent,

      selectedTab,
    };
  },
});
</script>