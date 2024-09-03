import { USER_QUERY_KEY } from "@/constants/queryKeys";
import { useSuspenseQuery } from "@tanstack/react-query";
import getUserProfile from "../axios/user/getUserProfile";

export default function useUserProfileQuery() {
  return useSuspenseQuery({
    queryKey: [USER_QUERY_KEY],
    queryFn: () => getUserProfile(),
  });
}
