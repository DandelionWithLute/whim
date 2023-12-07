import prisma from "@/utils/connect";
import bcrypt from "bcryptjs";
import { generateAccessToken } from "@/utils/jwt";
import { generateRefreshToken } from "@/utils/jwt";
import { NextResponse } from "next/server";

// let refreshTokens = [];

export const POST = async (req, res) => {
  const { email, password } = await req.json();
  console.log(email, password);

  const user = await prisma.user.findUnique({
    where: {
      email: email,
    }
  });

  const isPasswordCorrect = await bcrypt.compare(password, user.hashedPassword);
  // console.log(isPasswordCorrect)
  // console.log(user)
  if (isPasswordCorrect) {
    //Generate an access token
    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);
    // refreshTokens.push(refreshToken);
    prisma.VerificationToken.create({
      data: {
        token: refreshToken,
      },
    });

    return new NextResponse(
      JSON.stringify(
        {
          name: user.name,
          isAdmin: user.isAdmin,
          accessToken,
          refreshToken,
          message: "Login success!",
        },
        { status: 200 }
      )
    );
    // status 200?
  } else {
    return new NextResponse(JSON.stringify("Email or password incorrect!"), {
      status: 400,
    });
  }
};
