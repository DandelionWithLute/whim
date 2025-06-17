import { auth } from "@/auth";

export const getUserFromServer = async () => {
  const data = await auth();
  if (data?.user) {
    return data.user;
  } else {
    return null;
  }
};
