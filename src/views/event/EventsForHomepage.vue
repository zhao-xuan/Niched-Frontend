<template>
  <div :key="i" v-for="(eventsByMonthDate, i) in eventsByMonthDates">
    <div class="my-3" style="color: red">
      <i class="el-icon-date pr-3"></i>{{ eventsByMonthDate.monthDate }}
    </div>
    <div class="pl-4">
      <card
        class="mt-3 p-3 clickable"
        v-for="event in eventsByMonthDate.events"
        :key="event.eventId"
        :style="{
          backgroundImage:
            'linear-gradient(to bottom, rgba(0, 0, 0, 0.65), rgba(0, 0, 0, 0.65)), url(' +
            getNicheImage(event.groupId) +
            ')',
          backgroundPosition: 'center',
        }"
        @click="$emit('click-event', event.eventId)"
      >
        <div class="row">
          <div
            class="text-light col-12 col-sm-2 mr-0 pr-0"
            style="font-weight: 500; font-size: 15px; min-width: 37px"
          >
            <i class="el-icon-time pr-1"></i
            >{{
              new Date(event.eventDate).toLocaleString("en-US", {
                hour: "numeric",
                minute: "numeric",
                hour12: true,
              })
            }}
          </div>
          <div class="col-12 col-sm-10">
            <div>
              <b style="color: orange">
                {{ getNicheName(event.groupId) }}
              </b>
            </div>
            <div>
              <h5 style="color: white">{{ event.title }}</h5>
            </div>
            <div class="pt-2">
              <span style="color: grey">
                {{ event.members.going.length }} Going -
                {{ event.members.interested.length }} Interested</span
              >
            </div>
            <div
              class="d-flex justify-content-end"
              style="font-weight: 400; font-size: 14px; color: #a6a6a6"
            >
              <i class="el-icon-user pt-1"></i>
              <b class="pl-1">{{ event.authorId }}</b>
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
import { Space } from "@/api/space";
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
    niches: {
      required: true,
      type: Array as PropType<Space[]>,
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
    return {
      eventsByMonthDates,
      getNicheName(groupId2: string) {
        return props.niches.find((element) => element.groupId === groupId2)
          ?.name;
      },
      getNicheImage(groupId2: string) {
        return props.niches.find((element) => element.groupId === groupId2)
          ?.imageUrl;
      },
    };
  },
  // methods: {
  //   getNicheName (groupId: string) => {
  //     return props.niches.find((element) => element.groupId === groupId).name;
  //   };
  // },
});
</script>
