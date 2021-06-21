import axios, { AxiosResponse } from "axios";
import { SERVER_URL } from "@/api/constant";

//fetch event
type EventMemberGroups = {
  going: string[];
  interested: string[];
};

export type EventResponse = {
  event_id: string;
  group_id: string;
  author_id: string;
  title: string;
  description: string;
  creation_date: string;
  event_date: string;
  tags: string[];
  members: EventMemberGroups;
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
  members: EventMemberGroups;
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
  event_date: string;
};

export type EventCreationResponse = EventCreation & {
  event_id: string;
  creation_date: string;
  members: EventMemberGroups;
};

export const postEventCreation = async (
  req: EventCreation
): Promise<EventCreationResponse> => {
  const res = await axios.post(`${SERVER_URL}/event`, req);
  return res.data;
};

export const fetchEvents = async (
  groupId: string
): Promise<EventCreationResponse[]> => {
  const res = await axios.get(`${SERVER_URL}/group/${groupId}/events`);
  return res.data;
};

export const fetchAllEvents = async (): Promise<EventCreationResponse[]> => {
  const res = await axios.get(`${SERVER_URL}/event`);
  return res.data;
};

export enum EventGroup {
  GOING = "going",
  INTERESTED = "interested",
  NONE = "none",
}

type EventUserStatus = {
  userName: string;
  group: EventGroup;
  eventId: string;
};

// status code = 200 on success, no body
export const postEventStatus = async (
  data: EventUserStatus
): Promise<number> => {
  const res: AxiosResponse<Record<string, never>> = await axios.post(
    `${SERVER_URL}/event/${data.eventId}/members`,
    {
      user_name: data.userName,
      group: data.group,
    }
  );
  return res.status;
};

export const deleteEventStatus = async (
  data: EventUserStatus
): Promise<number> => {
  const res: AxiosResponse<Record<string, never>> = await axios.delete(
    `${SERVER_URL}/event/${data.eventId}/members`,
    {
      data: { user_name: data.userName, group: data.group },
    }
  );
  return res.status;
};
