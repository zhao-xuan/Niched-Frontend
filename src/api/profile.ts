import axios from "axios";
import { SERVER_URL } from "@/api/constant";

export type ProfileResponse = {
  username: string;
  mail?: string;
  age?: string;
  subscribed_groups: [string];
  interests: [string];
  password: string;
};

// export type User = {
//   groupId: string;
//   name: string;
//   description: string;
//   imageUrl?: string;
//   creationDate: string;
// };

export const fetchUser = async (username: string): Promise<ProfileResponse> => {
  const res = await axios.get(`${SERVER_URL}/profile/${username}`);
  return res.data;
};

export const fetchAlice = async (): Promise<ProfileResponse> => {
  const res = await axios.get(`${SERVER_URL}/profile/alice`);
  return res.data;
};
