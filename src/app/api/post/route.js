import prisma from "@/utils/connect";
import { NextResponse } from "next/server";

export const GET = async (req) => {
  const { searchParams } = new URL(req.URL);

  const page = searchParams.get("page");
  const cat = searchParams.get("cat");

  const POST_PER_PAGE = 2;

  try {
    const [post, count] = await prisma.$transaction([
      prisma.post.findMany({
        where: { ...(catSlug && { catSlug }) },
        skip: POST_PER_PAGE * (page - 1),
        take: POST_PER_PAGE,
      }),
      prisma.post.count({ where: { ...(catSlug && { catSlug }) } }),
    ]);
  } catch (err) {
    console.log(err);
    return new NextResponse(
      JSON.stringify({ message: "Something Went Wrong!" }, { status: 500 })
    );
  }
};
