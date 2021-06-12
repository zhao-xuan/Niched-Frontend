import axios from "axios";
import { SERVER_URL } from "@/api/constant";

export type Thread = {
  groupId: string;
  authorId: string;
  description: string;
  title: string;
  threadId: string;
  creationTime: string;
};

//fetch a thread
export type ThreadResponse = {
  group_id: string;
  author_id: string;
  description: string;
  title: string;
  thread_id: string;
  creation_time: string;
};

//fetch a thread
export const fetchThread = async (
  threadId: string
): Promise<ThreadResponse> => {
  const res = await axios.get(`${SERVER_URL}/thread/${threadId}`);
  return res.data;
};

//fetch threads
export const fetchThreads = async (
  groupId: string
): Promise<ThreadResponse[]> => {
  const res = await axios.get(`${SERVER_URL}/${groupId}/threads`);
  return res.data;
};

//create thread

type ThreadCreation = {
  group_id: string;
  author_id: string;
  description: string;
  title: string;
};

export type ThreadCreationResponse = ThreadResponse;

export const postThreadCreation = async (
  req: ThreadCreation
): Promise<ThreadCreationResponse> => {
  const res = await axios.post(`${SERVER_URL}/thread/`, req);
  return res.data;
};
