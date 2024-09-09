import { AxiosError } from "axios";
import { SignInReturn } from "@/types/auth";
import { saveTokens } from "@/utils/authTokenStorage";
import axios from "../axiosInstance";

export default async function googleSignIn(googleToken: string) {
  const res = await axios
    .post("auth/signIn/GOOGLE", { token: googleToken })
    .catch((e: AxiosError) => {
      console.error(e.response);
      return null;
    });

  const result: SignInReturn | null = res ? (res.data as SignInReturn) : null;
  if (!result) return result;

  const { accessToken, refreshToken } = result;
  saveTokens({ accessToken, refreshToken });
  return result.user;
}
