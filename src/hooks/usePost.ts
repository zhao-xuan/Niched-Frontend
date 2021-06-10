import { Ref, ref, ToRefs } from "vue";

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

  const doPost = async (req: Request) => {
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
