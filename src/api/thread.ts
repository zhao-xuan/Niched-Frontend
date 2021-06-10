import axios from "axios";
import { SERVER_URL } from "@/api/constant";

//create event

type ThreadCreation = {
  group_id: string;
  author_id: string;
  description: string;
  title: string;
};

export const postThreadCreation = async (
  req: ThreadCreation
): Promise<Record<string, never>> => {
  const res = await axios.post(`${SERVER_URL}/thread/`, req);
  return res.data;
};
