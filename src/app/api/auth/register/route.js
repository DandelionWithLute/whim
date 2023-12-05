import prisma from "@/utils/connect";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export const POST = async (req) => {
  const { name, email, password } = await req.json();
  const hashedPassword = await bcrypt.hash(password,10);

  try {
    await prisma.User.create({
      data: {
        name,
        email,
        hashedPassword,
      },
    });
    return new NextResponse(
      JSON.stringify({ message: "User has been created!" }, { status: 201 })
    );
  } catch (err) {
    console.log(err);
    return new NextResponse(
      JSON.stringify({ message: "Failed to create user!" }, { status: 500 })
    );
  }
};