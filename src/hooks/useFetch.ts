import { onMounted, Ref, ref, ToRefs } from "vue";

export type FetchType = {
  fetching: boolean;
  fetched: boolean;
  error: any;
};

export type FetchingDataType<T> = {
  doFetch: () => void;
  data: Ref<T | undefined>;
};

type ReturnType<T> = ToRefs<FetchType> & FetchingDataType<T>;

export const useFetch = <Response>(
  request: () => Promise<Response>,
  immediate = false
): ReturnType<Response> => {
  const data = ref<Response>();
  const fetching = ref<boolean>(false);
  const fetched = ref<boolean>(false);
  const error = ref<any>(null);

  const doFetch = async () => {
    fetching.value = true;
    try {
      data.value = await request();
      fetched.value = true;
    } catch (err) {
      error.value = err;
    }
    fetching.value = false;
  };

  onMounted(() => {
    if (immediate) {
      doFetch();
    }
  });
  return { data, fetched, fetching, error, doFetch };
};
