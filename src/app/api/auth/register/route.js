import prisma from "@/utils/connect";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export const POST = async (req) => {
  const { name, email, password } = await req.json();
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const existEmail = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (existEmail) {
      return new NextResponse(JSON.stringify("The email already exists!"), {
        status: 500,
      });
    }

    await prisma.User.create({
      data: {
        name,
        email,
        hashedPassword,
      },
    });
    return new NextResponse(
      JSON.stringify("User has been created!", { status: 201 })
    );
  } catch (err) {
    console.log(err);
    return new NextResponse(
      JSON.stringify("Failed to create user!", { status: 500 })
    );
  }
};
