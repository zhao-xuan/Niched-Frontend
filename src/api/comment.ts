import axios from "axios";
import { SERVER_URL } from "@/api/constant";

export type Comment = {
  commentId: string,
  threadId: string,
  userName: string,
  creationDate: string,
  body: string
};

export type CommentResponse = {
  comment_id: string,
  thread_id: string,
  user_name: string,
  creation_date: string,
  body: string
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
  thread_id: string,
  body: string,
  user_name?: string
};

export type CommentCreationResponse = CommentResponse;

export const postCommentCreation = async (
  req: CommentCreation
): Promise<CommentCreationResponse> => {
  const res = await axios.post(`${SERVER_URL}/comment`, req);
  return res.data;
};
