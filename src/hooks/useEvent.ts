import { Ref, ref, watch } from "vue";
import { useFetch, } from "./useFetch";
import { EventCreationResponse, fetchEventsByGroupId, Event } from "@/api/event";


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
          eventTime: item.event_time,
          creationTime: item.creation_time,
        }
      })
    }
  });

  return events;

};