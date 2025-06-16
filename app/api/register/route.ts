import { prisma } from "@/util/prisma";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

export const POST = async (req: NextRequest) => {
  const body = await req.json();
  const stringSchema = z.string().nullish();

  const name = stringSchema.parse(body.name);
  const email = stringSchema.parse(body.email);
  const password = stringSchema.parse(body.password);

  if (!email || !password || !name) return new NextResponse(JSON.stringify("注册参数缺失！（非法前端）"));
  const isThereAlreadyUserEmail = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (isThereAlreadyUserEmail) return new NextResponse(JSON.stringify("已经注册过！"));

  const hashedPassword = await bcrypt.hash(password, 10);
  const createNewUser = await prisma.user.create({
    data: {
      email,
      name,
      hashedPassword,
    },
  });

  if (createNewUser) return new NextResponse(JSON.stringify("注册成功！"));
};
