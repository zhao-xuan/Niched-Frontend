import { Ref, ref, ToRefs, watch } from "vue";
import axios, { AxiosError } from "axios";

export type PostType = {
  posting: boolean;
  posted: boolean;
  error: any;
};

export type PostingDataType<REQ, RES> = {
  doPost: (req: REQ) => void;
  data: Ref<RES | undefined>;
};

type ReturnType<REQ, RES> = ToRefs<PostType> & PostingDataType<REQ, RES>;

export const usePost = <Request, Response>(
  request: (req: Request) => Promise<Response>
): ReturnType<Request, Response> => {
  const data = ref<Response>();
  const posting = ref<boolean>(false);
  const posted = ref<boolean>(false);
  const error = ref<any>(null);

  const init = () => {
    data.value = undefined;
    posted.value = false;
    posting.value = false;
    error.value = null;
  };

  watch(error, () => {
    if (error.value) {
      if (error.value.isAxiosError) {
        const axiosError: AxiosError = error.value as AxiosError;
        if (axiosError.response?.data) {
          console.log(axiosError.response?.data?.detail);
          if (axiosError.response?.data?.detail.msg) {
            alert(axiosError.response?.data?.detail.msg);
          } else {
            alert("something went wrong please try it again!");
          }
        }
      } else {
        alert(error.value.message);
      }
    }
  });

  const doPost = async (req: Request) => {
    if (posting.value) return;
    init();
    posting.value = true;
    try {
      data.value = await request(req);
      posted.value = true;
    } catch (err) {
      error.value = err;
    }
    posting.value = false;
  };

  return { data, posting, posted, error, doPost };
};
