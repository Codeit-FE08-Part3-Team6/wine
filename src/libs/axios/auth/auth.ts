import { AuthTokens, SignInForm } from "@/types/auth";
import axios from "../axiosInstance";
import { saveTokens } from "@/utils/authTokenStorage";

export async function signIn(formData: SignInForm) {
  let res;
  try {
    res = await axios.post("auth/signin", formData);
  } catch (error: any) {
    alert(
      `${error.response.status} error from signIn: ${error.response.message}`,
    );
    return;
  }

  const tokens: AuthTokens = {
    accessToken: res.data.accessToken,
    refreshToken: res.data.refreshToken,
  };
  saveTokens(tokens);
}
