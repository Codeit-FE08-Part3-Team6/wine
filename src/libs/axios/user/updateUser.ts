import { UpdateUserForm } from "@/types/user";
import axios from "../axiosInstance";

export async function updateUser(formData: UpdateUserForm) {
  let res;
  try {
    res = await axios.patch("users/me", formData);
  } catch (error: any) {
    alert(
      `${error.response.status} error from updateUser: ${error.response.message}`,
    );
    return null;
  }

  const updatedUser = res.data;
  return updatedUser;
}
