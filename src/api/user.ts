import axios from "axios";
import { SERVER_URL } from "@/api/constant";

export type GroupId = string;
export type Hashtag = string;

export type UserResponse = {
  user_name: string;
  email?: string;
  subscribed_groups: GroupId[];
  bio?: string;
  interests: Hashtag[];
};

export type User = {
  userName: string;
  email?: string;
  subscribedGroups: GroupId[];
  bio?: string;
  interests: Hashtag[];
};

export const fetchUser = async (userName: string): Promise<UserResponse> => {
  const res = await axios.get(`${SERVER_URL}/profile/${userName}`);
  return res.data;
};

export const postUser = async (userName: string, email: string, pwd: string): Promise<UserResponse> => {
  const formdata = new FormData();
  formdata.append("user_name", userName);
  formdata.append("password", pwd);

  const res = await axios({
    method : "post",
    url: `${SERVER_URL}/auth/signup`,
    data: formdata,
    headers: { "Content-Type": "multipart/form-data" }
  })

  return res.data;
}