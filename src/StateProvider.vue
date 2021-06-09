<template>
  <slot />
</template>

<script lang="ts">
import { PropType, defineComponent } from "vue";
import { State, provideState } from "./state";
export default defineComponent({
  name: "ProvideUser",
  props: {
    state: {
      required: true,
      type: Object as PropType<State>,
    },
  },
  setup(props) {
    provideState(props.state);
  },
});
</script>
