import axios from "axios";
import { SERVER_URL } from "@/api/constant";

export type Comment = {
  threadId: string,
  username: string,
  body: string
};

export type CommentResponse = {
  commentId: string,
  creationDate: string
};

//fetch comments
export const fetchComments = async (
  threadId: string
): Promise<CommentResponse[]> => {
  const res = await axios.get(`${SERVER_URL}/thread/${threadId}/comments`);
  return res.data;
};

//create comment

type CommentCreation = {
    threadId: string,
    username: string,
    body: string
};

export type CommentCreationResponse = CommentResponse;

export const postCommentCreation = async (
  req: CommentCreation
): Promise<CommentCreationResponse> => {
  const res = await axios.post(`${SERVER_URL}/thread/`, req);
  return res.data;
};
