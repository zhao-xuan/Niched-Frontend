import axios from "axios";
import { SERVER_URL } from "@/api/constant";


type EventCreation = {
  group_id: string;
  author_id: string;
  description: string;
  title: string;
  tags: string[];
  event_time: string;
};

export type EventCreationResponse = EventCreation & {
  event_id: string;
  creation_time: string;
};

export type Event = {
  groupId: string;
  authorId: string;
  eventId: string;
  title: string;
  description: string;
  tags: string[];
  eventTime: string;
  creationTime: string;
}


export const postEventCreation = async (
  req: EventCreation
): Promise<EventCreationResponse> => {
  const res = await axios.post(`${SERVER_URL}/event/`, req);
  return res.data;
};

export const fetchEventsByGroupId = async (group_id: string): Promise<EventCreationResponse[]> => {
  const res = await axios.get(`${SERVER_URL}/group/${group_id}/events`);
  return res.data;
};