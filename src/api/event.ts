import axios from "axios";
import { SERVER_URL } from "@/api/constant";

//create event

type EventCreation = {
  group_id: string;
  author_id: string;
  description: string;
  title: string;
  tags: string[];
  event_time: string;
};

export const postEventCreation = async (
  req: EventCreation
): Promise<Record<string, never>> => {
  const res = await axios.post(`${SERVER_URL}/event/`, req);
  return res.data;
};
