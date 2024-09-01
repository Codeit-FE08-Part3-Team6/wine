import axios from "../axiosInstance";

export default async function getUser() {
  let res;
  try {
    res = await axios.get("/users/me");
  } catch (error: any) {
    alert(
      `${error.response.status} error from getUser: ${error.response.status}`,
    );
    return null;
  }

  return res.data;
}
