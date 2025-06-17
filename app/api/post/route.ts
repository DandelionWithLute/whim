import { prisma } from "@/util/prisma";
import { getUserFromServer } from "@/util/query";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  const user = await getUserFromServer();
  if (!user) return new NextResponse(JSON.stringify({ msg: "请登录！" }));
  const findMe = await prisma.user.findFirst({
    where: {
      email: String(user.email),
    },
  });

  const getAllMyPosts = await prisma.post.findMany({
    where: {
      authorId: findMe?.id,
    },
    orderBy: {
      createdAt: "asc",
    },
  });
  return new NextResponse(JSON.stringify(getAllMyPosts));
};
