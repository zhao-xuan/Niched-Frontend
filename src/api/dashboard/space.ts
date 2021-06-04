import axios from "axios";
import { SERVER_URL } from "@/api/constant";

export type Space = {
  group_id: string;
  name: string;
  description: string;
  image_url?: string;
  creation_data: string;
};

export const fetchSpace = async (groupId: string): Promise<Space> => {
  const res = await axios.get(`${SERVER_URL}/group/${groupId}`);
  return res.data;
};
