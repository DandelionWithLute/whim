import { prisma } from "@/util/prisma";
import { getUserFromServer } from "@/util/query";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  const user = await getUserFromServer();
  if (!user) return new NextResponse(JSON.stringify({ msg: "请登录！" }));

  const postId = req.nextUrl.searchParams.get("postId");
  if (!postId) return new NextResponse(JSON.stringify({ msg: "请求失败，无文章ID！" }));

  const findMe = await prisma.user.findFirst({
    where: {
      email: String(user.email),
    },
  });

  const getCurrentPost = await prisma.post.findFirst({
    where: {
      id: postId,
      authorId: findMe?.id,
    },
  });
  return new NextResponse(JSON.stringify(getCurrentPost));
};
