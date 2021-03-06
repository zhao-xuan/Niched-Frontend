import { reactive, ToRefs, toRefs, watch } from "vue";
import { useFetch, FetchType } from "./useFetch";
import { Space, SpaceResponse, fetchSpace } from "@/api/space";

type ReturnType = ToRefs<Space> & ToRefs<FetchType> & { doFetch: () => void };

export const useSpace = (groupId: string, immediate: boolean): ReturnType => {
  const state = reactive<Space>({
    groupId: "",
    authorId: "",
    name: "",
    description: "",
    members: [],
    imageUrl: "",
    creationDate: "",
    tags: [],
  });

  const {
    data: spaceData,
    doFetch,
    ...res
  } = useFetch<SpaceResponse>(() => fetchSpace(groupId), immediate);

  watch(spaceData, () => {
    if (spaceData && spaceData.value) {
      state.groupId = spaceData.value.group_id;
      state.authorId = spaceData.value.author_id;
      state.name = spaceData.value.name;
      state.description = spaceData.value.description;
      state.members = spaceData.value.members;
      state.creationDate = spaceData.value.creation_date;
      state.tags = spaceData.value.tags;
      state.imageUrl =
        spaceData.value.image_url ||
        "https://blackmantkd.com/wp-content/uploads/2017/04/default-image-620x600.jpg";
    }
  });

  return { ...toRefs(state), doFetch, ...res };
};
