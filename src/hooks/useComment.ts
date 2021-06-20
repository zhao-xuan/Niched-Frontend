import { reactive, ref, Ref, ToRefs, toRefs, watch } from "vue";
import { useFetch, FetchType } from "./useFetch";
import { useState } from "../state";
import {
  Comment,
  CommentCreationResponse,
  CommentResponse,
  fetchComments,
  postCommentCreation,
} from "@/api/comment";

type CommentsReturnType = { comments: Ref<Comment[]> } & ToRefs<FetchType> & {
    doFetch: () => void;
    doPostComment: (body: string) => Promise<CommentCreationResponse>;
  };

export const useComment = (
  threadId: string,
  immediate: boolean
): CommentsReturnType => {
  const comments: Ref<Comment[]> = ref<Comment[]>([]);

  const {
    data: commentsData,
    doFetch,
    ...res
  } = useFetch<CommentResponse[]>(() => fetchComments(threadId), immediate);

  watch(commentsData, () => {
    if (commentsData && commentsData.value) {
      comments.value = commentsData.value.map((item: CommentResponse) => {
        return {
          commentId: item.comment_id,
          threadId: item.thread_id,
          creationDate: item.creation_date,
          userName: item.user_name,
          body: item.body,
        };
      });
    }
  });

  const { userName } = useState();
  const doPostComment = (body: string) => {
    return postCommentCreation({
      thread_id: threadId,
      user_name: userName.value,
      body,
    });
  };

  return { comments, doFetch, doPostComment, ...res };
};
