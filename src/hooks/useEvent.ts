import { reactive, ToRefs, toRefs, watch } from "vue";
import { useFetch, FetchType } from "./useFetch";
import { Event, EventResponse, fetchEvent } from "@/api/event";

type ReturnType = ToRefs<Event> & ToRefs<FetchType> & { doFetch: () => void };

export const useEvent = (eventId: string, immediate: boolean): ReturnType => {
  const state = reactive<Event>({
    eventId: "",
    groupId: "",
    authorId: "",
    title: "",
    description: "",
    creationDate: "",
    eventDate: "",
    tags: [],
  });

  const {
    data: spaceData,
    doFetch,
    ...res
  } = useFetch<EventResponse>(() => fetchEvent(eventId), immediate);

  watch(spaceData, () => {
    if (spaceData && spaceData.value) {
      state.eventId = spaceData.value.event_id;
      state.groupId = spaceData.value.group_id;
      state.authorId = spaceData.value.author_id;
      state.title = spaceData.value.title;
      state.description = spaceData.value.description;
      state.creationDate = spaceData.value.creation_date;
      state.tags = spaceData.value.tags;
    }
  });

  return { ...toRefs(state), doFetch, ...res };
};
