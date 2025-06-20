import { prisma } from "@/util/prisma";
import { getUserFromServer } from "@/util/query";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  const user = await getUserFromServer();
  if (!user || !user.email) return new NextResponse(JSON.stringify({ msg: "没登录！" }));

  let findMe = await prisma.user.findFirst({
    where: {
      email: user.email,
    },
  });
  //  脱敏
  //   @ts-ignore
  delete findMe.id;
  //   @ts-ignore
  delete findMe.hashedPassword;

  return new NextResponse(JSON.stringify(findMe));
};
