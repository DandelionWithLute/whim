import { prisma } from "@/util/prisma";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  const id = req.nextUrl.searchParams.get("id");
  if (!id) return new NextResponse(JSON.stringify("参数错误！"));

  const findPost = await prisma.post.findFirst({
    where: {
      id,
      published: true,
    },
  });

  if (findPost) {
    return new NextResponse(JSON.stringify(findPost));
  } else {
    return new NextResponse(JSON.stringify({ msg: "" }));
  }
};
