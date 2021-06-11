import { onMounted, Ref, ref, ToRefs, watch } from "vue";
import { AxiosError } from "axios";

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

  const init = () => {
    data.value = undefined;
    fetching.value = false;
    fetched.value = false;
    error.value = null;
  };

  watch(error, () => {
    if (error.value) {
      if (error.value.isAxiosError) {
        const axiosError: AxiosError = error.value as AxiosError;
        if (axiosError.response?.data) {
          console.log(axiosError.response?.data?.detail);
          alert(axiosError.response?.data?.detail.msg);
        }
      } else {
        alert(error.value.message);
      }
    }
  });

  const doFetch = async () => {
    init();
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
