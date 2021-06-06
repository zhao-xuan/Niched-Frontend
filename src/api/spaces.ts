import axios from "axios";
import { SERVER_URL } from "@/api/constant";
import { SpaceResponse } from "./space";

export type SpacesResponse = { [index: string]: SpaceResponse };

export const fetchSpaces = async (): Promise<SpacesResponse> => {
  const res = await axios.get(`${SERVER_URL}/group/all`);
  return res.data;
};
