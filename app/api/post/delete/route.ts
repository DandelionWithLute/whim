import { prisma } from "@/util/prisma";
import { getUserFromServer } from "@/util/query";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

export const POST = async (req: NextRequest) => {
  const user = await getUserFromServer();
  if (!user) return new NextResponse(JSON.stringify({ msg: "未登录！" }));

  const body = await req.json();
  const stringSchema = z.string().nullish();
  const postId = stringSchema.parse(body.postId);
  if (!postId) return new NextResponse(JSON.stringify({ msg: "删除失败，无文章ID！" }));
  //   return console.log(title, content);

  const findMe = await prisma.user.findUnique({
    where: {
      email: String(user.email),
    },
  });
  //   return console.log(findMe)

  if (!findMe?.id) return;

  const deleteCurrent = await prisma.post.delete({
    where: {
      id: postId,
    },
  });

  if (deleteCurrent) return new NextResponse(JSON.stringify({ msg: "删除成功！" }));
};
