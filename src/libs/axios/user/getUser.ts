import { AxiosError } from "axios";
import User from "@/types/user";
import axios from "../axiosInstance";

export default async function getUser() {
  let res;
  try {
    res = await axios.get("/users/me");
  } catch (error: unknown) {
    const e = error as AxiosError;
    alert(`${e.response?.status} error from getUser: ${e.message}`);
    return null;
  }
  const user = res.data as User;

  return user;
}
