import { ref, Ref, UnwrapRef, watchEffect } from "vue";

export const useFetch = <Response>(
  request: () => Promise<Response>,
  immediate = false
): {
  data: Ref<UnwrapRef<Response> | null>;
  fetching: Ref<boolean>;
  fetched: Ref<boolean>;
  error: Ref<any>;
  doFetch: () => void;
} => {
  const data = ref<Response | null>(null);
  const fetching = ref<boolean>(false);
  const fetched = ref<boolean>(false);
  const error = ref<any>(null);

  const doFetch = async () => {
    fetching.value = true;
    try {
      data.value = (await request()) as UnwrapRef<Response>;
      fetched.value = true;
    } catch (err) {
      error.value = err;
    }
    fetching.value = false;
  };

  watchEffect(() => {
    if (!immediate) return;
    doFetch();
  });
  return { data, fetching, fetched, doFetch, error };
};
