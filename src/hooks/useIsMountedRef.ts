import { Ref, onMounted, onUnmounted, ref } from "vue";

export const useIsMountedRef = (): Ref<boolean> => {
  const isMounted = ref<boolean>(false);

  onMounted(() => {
    isMounted.value = true;
  });

  onUnmounted(() => {
    isMounted.value = false;
  });

  return isMounted;
};
