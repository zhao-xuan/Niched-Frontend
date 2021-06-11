import axios from "axios";
import { SERVER_URL } from "@/api/constant";

//fetch event
export type EventResponse = {
  event_id: string;
  group_id: string;
  author_id: string;
  title: string;
  description: string;
  creation_date: string;
  event_date: string;
  tags: string[];
};

export type Event = {
  eventId: string;
  groupId: string;
  authorId: string;
  title: string;
  description: string;
  creationDate: string;
  eventDate: string;
  tags: string[];
};

export const fetchEvent = async (eventId: string): Promise<EventResponse> => {
  const res = await axios.get(`${SERVER_URL}/event/${eventId}`);
  return res.data;
};

//create event

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