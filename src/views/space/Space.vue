<template>
  <h1>landing page for the spacee: {{ $route.params.id }}</h1>
  <span>{{ foo }}</span>
</template>

<script lang="ts">
import { defineComponent, toRefs } from "vue";

type Props = {
  foo: string;
};

export default defineComponent({
  name: "Space",
  props: { foo: { type: String, required: true } },
  setup(props: Props) {
    //https://stackoverflow.com/questions/64926354/vue-3-watch-doesn-t-work-if-i-watch-a-destructured-prop
    const { foo } = toRefs(props);
    return { bar: foo };
  },
});
</script>
