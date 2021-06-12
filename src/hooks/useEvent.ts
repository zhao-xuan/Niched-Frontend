import { reactive, ref, Ref, ToRefs, toRefs, watch } from "vue";
import { useFetch, FetchType } from "./useFetch";
import { EventResponse, fetchEvent, EventCreationResponse, fetchEventsByGroupId, Event } from "@/api/event";


export const useEvents = (spaceId: string, immediate: boolean): Ref<Event[]> => {

  const events = ref<Event[]>([]);

  const {
    data: eventsData,
  } = useFetch<EventCreationResponse[]>(() => fetchEventsByGroupId(spaceId), immediate);

  watch(eventsData, () => {
    if (eventsData && eventsData.value) {

      events.value = eventsData.value.map((item: EventCreationResponse) => {
        return {
          groupId: item.group_id,
          authorId: item.author_id,
          eventId: item.event_id,
          title: item.title,
          description: item.description,
          tags: item.tags,
          eventDate: item.event_time,
          creationDate: item.creation_time,
        }
      })
    }
  });

  return events;

};

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
