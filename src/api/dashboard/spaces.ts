import axios from "axios";
import { SERVER_URL } from "@/api/constant";

export type Space = {
  group_id: string;
  name: string;
  description: string;
  image_url?: string;
  creation_data: string;
};

export type SpacesResponse = { [index: string]: Space };

export const fetchSpaces = async (): Promise<SpacesResponse> => {
  const res = await axios.get(`${SERVER_URL}/group/all`);
  return res.data;
};
