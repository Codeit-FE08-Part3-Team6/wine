import User, { UpdateUserForm } from "@/types/user";
import { AxiosError } from "axios";
import axios from "../axiosInstance";

export default async function updateUser(formData: UpdateUserForm) {
  let res;
  try {
    res = await axios.patch("users/me", formData);
  } catch (error: unknown) {
    const e = error as AxiosError;
    alert(`${e.response?.status} error from updateUser: ${e.message}`);
    return null;
  }

  const updatedUser = res.data as User;
  return updatedUser;
}
