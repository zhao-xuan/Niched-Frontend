<template>
  <div :key="i" v-for="(eventsByMonthDate, i) in eventsByMonthDates">
    <div class="my-3">
      <h4>{{ eventsByMonthDate.monthDate }}</h4>
    </div>
    <div>
      <card
        class="mt-3 p-3"
        v-for="event in eventsByMonthDate.events"
        :key="event.eventId"
        style="cursor: pointer"
        @click="$emit('click-event', event.eventId)"
      >
        <div class="row">
          <div
            class="text-secondary col-12 col-sm-2 mr-0 pr-0"
            style="font-weight: 500; font-size: 15px; min-width: 37px"
          >
            {{
              new Date(event.eventDate).toLocaleString("en-US", {
                hour: "numeric",
                minute: "numeric",
                hour12: true,
              })
            }}
          </div>
          <div class="col-12 col-sm-10">
            <div style="font-weight: 400; font-size: 14px; color: #a6a6a6">
              organized by {{ event.authorId }}
            </div>
            <div>
              <div>
                <div>
                  <b>{{ event.title }}</b>
                </div>
              </div>
            </div>
          </div>
        </div>
      </card>
    </div>
  </div>
</template>

<script lang="ts">
import { watch, defineComponent, PropType, ref } from "vue";
import Card from "@/components/Card.vue";
import { Event } from "@/api/event";
import { getParsedMonthDate } from "@/utils";
type EventsByMonthDate = {
  monthDate: string;
  events: Event[];
};
export default defineComponent({
  name: "CreateSpace",
  components: {
    Card,
  },
  emits: ["click-event"],
  props: {
    events: {
      required: true,
      type: Array as PropType<Event[]>,
    },
  },
  setup(props) {
    const eventsByMonthDates = ref<EventsByMonthDate[]>([]);
    watch(
      () => props.events,
      (es) => {
        if (es) {
          const parsedEvents: (Event & { parsedEventDate: string })[] = es.map(
            (e) => ({
              parsedEventDate: getParsedMonthDate(new Date(e.eventDate)),
              ...e,
            })
          );

          const monthDates: string[] = [];
          parsedEvents.forEach(({ parsedEventDate }) => {
            if (!monthDates.length) {
              monthDates.push(parsedEventDate);
            } else if (monthDates[monthDates.length - 1] !== parsedEventDate) {
              monthDates.push(parsedEventDate);
            }
          });
          const temp: EventsByMonthDate[] = [];
          monthDates.forEach((monthDate) => {
            temp.push({
              monthDate,
              events: parsedEvents
                .filter((e) => e.parsedEventDate === monthDate)
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                .map(({ parsedEventDate, ...res }) => res),
            });
          });
          eventsByMonthDates.value = temp;
        }
      }
    );
    return { eventsByMonthDates };
  },
});
</script>
