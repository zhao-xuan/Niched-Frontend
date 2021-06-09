import { reactive, ToRefs, toRefs, watch } from "vue";
import { useFetch, FetchType } from "./useFetch";
import { User, UserResponse, fetchUser } from "@/api/user";

type ReturnType = ToRefs<User> & ToRefs<FetchType> & { doFetch: () => void };

export const useUser = (userName: string, immediate: boolean): ReturnType => {
  const state = reactive<User>({
    userName: "",
    subscribedGroups: [],
    interests: [],
  });

  const {
    data: userData,
    doFetch,
    ...res
  } = useFetch<UserResponse>(() => fetchUser(userName), immediate);

  watch(userData, () => {
    if (userData && userData.value) {
      state.userName = userData.value.user_name;
      console.log(state.userName, "USERNAME");
      state.email = userData.value.email;
      state.bio = userData.value.bio;
      state.subscribedGroups = userData.value.subscribed_groups;
      state.interests = userData.value.interests;
    }
  });

  return { ...toRefs(state), doFetch, ...res };
};
