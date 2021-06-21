import { reactive, ref, Ref, ToRefs, toRefs, watch } from "vue";
import { useFetch, FetchType } from "./useFetch";
import {
  EventResponse,
  fetchEvent,
  EventCreationResponse,
  fetchEvents,
  fetchAllEvents,
  Event,
} from "@/api/event";

type EventsReturnType = { events: Ref<Event[]> } & ToRefs<FetchType> & {
  doFetch: () => void;
};

export const useEvents = (
  groupId: string,
  immediate: boolean
): EventsReturnType => {
  const events: Ref<Event[]> = ref<Event[]>([]);

  const {
    data: eventsData,
    doFetch,
    ...res
  } = useFetch<EventCreationResponse[]>(() => fetchEvents(groupId), immediate);

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
          members: item.members,
          eventDate: item.event_date,
          creationDate: item.creation_date,
        };
      });
    }
  });

  return { events, doFetch, ...res };
};

type EventReturnType = ToRefs<Event> &
  ToRefs<FetchType> & { doFetch: () => void };

export const useEvent = (
  eventId: string,
  immediate: boolean
): EventReturnType => {
  const event = reactive<Event>({
    eventId: "",
    groupId: "",
    authorId: "",
    title: "",
    description: "",
    creationDate: "",
    eventDate: "",
    tags: [],
    members: {
      going: [],
      interested: []
    }
  });

  const {
    data: eventData,
    doFetch,
    ...res
  } = useFetch<EventResponse>(() => fetchEvent(eventId), immediate);

  watch(eventData, () => {
    if (eventData && eventData.value) {
      event.eventId = eventData.value.event_id;
      event.groupId = eventData.value.group_id;
      event.authorId = eventData.value.author_id;
      event.title = eventData.value.title;
      event.description = eventData.value.description;
      event.creationDate = eventData.value.creation_date;
      event.tags = eventData.value.tags;
      event.members = eventData.value.members;
      event.eventDate = eventData.value.event_date;
    }
  });


  return { ...toRefs(event), doFetch, ...res };
};

export const useAllEvents = (
  immediate: boolean
): EventsReturnType => {
  const events: Ref<Event[]> = ref<Event[]>([]);

  const {
    data: eventsData,
    doFetch,
    ...res
  } = useFetch<EventCreationResponse[]>(() => fetchAllEvents(), immediate);

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
          members: item.members,
          eventDate: item.event_date,
          creationDate: item.creation_date,
        };
      });
    }
  });

  return { events, doFetch, ...res };
};