import axios from "axios";
import { SERVER_URL } from "@/api/constant";
import { UserResponse } from "./user";

export type LoginResponse = {
  access_token: string;
  token_type: string;
  user_details: UserResponse;
};

export const setAuthToken = (authToken: string | undefined) => {
  if (authToken === undefined) {
    delete axios.defaults.headers.common["Authorization"];
  } else {
    axios.defaults.headers.common["Authorization"] = "Bearer " + authToken;
  }
};

export const loginUser = async (
  userName: string,
  password: string
): Promise<LoginResponse> => {
  const formdata = new FormData();
  formdata.append("username", userName);
  formdata.append("password", password);

  try {
    const res = await axios({
      method: "post",
      url: `${SERVER_URL}/auth/login`,
      data: formdata,
    });

    alert("Login successful");
    setAuthToken(res.data.access_token);
    localStorage.token = res.data.access_token;
    localStorage.userName = res.data.user_details.user_name;

    return res.data;
  } catch (e) {
    alert(e);
    console.log(e);
    return Promise.reject(e);
  }
};

export const registerUser = async (
  userName: string,
  email: string,
  pwd: string
): Promise<UserResponse> => {
  const formdata = new FormData();
  formdata.append("user_name", userName);
  formdata.append("password", pwd);

  const res = await axios({
    method: "post",
    url: `${SERVER_URL}/auth/signup`,
    data: formdata,
    headers: { "Content-Type": "multipart/form-data" },
  });

  return res.data;
};
