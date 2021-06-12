import { reactive, ref, Ref, ToRefs, toRefs, watch } from "vue";
import { useFetch, FetchType } from "./useFetch";
import {
  ThreadResponse,
  fetchThread,
  Thread,
  fetchThreads,
} from "@/api/thread";

type ThreadsReturnType = { threads: Ref<Thread[]> } & ToRefs<FetchType> & {
    doFetch: () => void;
  };

export const useThreads = (
  groupId: string,
  immediate: boolean
): ThreadsReturnType => {
  const threads: Ref<Thread[]> = ref<Thread[]>([]);

  const {
    data: threadsData,
    doFetch,
    ...res
  } = useFetch<ThreadResponse[]>(() => fetchThreads(groupId), immediate);

  watch(threadsData, () => {
    if (threadsData && threadsData.value) {
      threads.value = threadsData.value.map((item: ThreadResponse) => {
        return {
          groupId: item.group_id,
          authorId: item.author_id,
          threadId: item.thread_id,
          title: item.title,
          description: item.description,
          creationTime: item.creation_time,
        };
      });
    }
  });

  return { threads, doFetch, ...res };
};

type ThreadReturnType = ToRefs<Thread> &
  ToRefs<FetchType> & { doFetch: () => void };

export const useThread = (
  threadId: string,
  immediate: boolean
): ThreadReturnType => {
  const state = reactive<Thread>({
    threadId: "",
    groupId: "",
    authorId: "",
    title: "",
    description: "",
    creationTime: "",
  });

  const {
    data: threadData,
    doFetch,
    ...res
  } = useFetch<ThreadResponse>(() => fetchThread(threadId), immediate);

  watch(threadData, () => {
    if (threadData && threadData.value) {
      state.threadId = threadData.value.thread_id;
      state.groupId = threadData.value.group_id;
      state.authorId = threadData.value.author_id;
      state.title = threadData.value.title;
      state.description = threadData.value.description;
      state.creationTime = threadData.value.creation_time;
    }
  });

  return { ...toRefs(state), doFetch, ...res };
};
