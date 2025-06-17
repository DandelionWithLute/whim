import { prisma } from "@/util/prisma";
import { getUserFromServer } from "@/util/query";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

export const POST = async (req: NextRequest) => {
  const user = await getUserFromServer();
  if (!user) return new NextResponse(JSON.stringify({ msg: "未登录！" }));

  const body = await req.json();
  const stringSchema = z.string().nullish();
  const title = stringSchema.parse(body.title);
  const content = stringSchema.parse(body.content);
  //   return console.log(title, content);

  const findMe = await prisma.user.findUnique({
    where: {
      email: String(user.email),
    },
  });
  //   return console.log(findMe)

  if (!findMe?.id) return;

  const createNew = await prisma.post.create({
    data: {
      authorId: findMe.id,
      content: content ?? "",
      title: title ?? "",
    },
  });

  if (createNew) return new NextResponse(JSON.stringify({ msg: "创建成功！", id: createNew.id }));
};
