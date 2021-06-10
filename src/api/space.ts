import axios from "axios";
import { SERVER_URL } from "@/api/constant";

//fetch space
export type SpaceResponse = {
  group_id: string;
  author_id: string;
  name: string;
  description: string;
  members: string[];
  image_url?: string;
  creation_date: string;
};

export type Space = {
  groupId: string;
  authorId: string;
  name: string;
  description: string;
  members: string[];
  imageUrl?: string;
  creationDate: string;
};

export const fetchSpace = async (groupId: string): Promise<SpaceResponse> => {
  const res = await axios.get(`${SERVER_URL}/group/${groupId}`);
  return res.data;
};

//create space

type SpaceCreation = {
  group_id: string;
  name: string;
  description: string;
  image_url?: string;
  author_id: string;
};

export const postSpaceCreation = async (
  req: SpaceCreation
): Promise<Record<string, never>> => {
  const res = await axios.post(`${SERVER_URL}/group/new`, req);
  return res.data;
};
