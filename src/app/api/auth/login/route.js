import prisma from "@/utils/connect";
import bcrypt from "bcryptjs";
import { generateAccessToken } from "@/utils/jwt";
import { generateRefreshToken } from "@/utils/jwt";
import { NextResponse } from "next/server";

// let refreshTokens = [];

export const POST = async (req, res) => {
  const { email, password } = req.body;

  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  const isPasswordCorrect = await bcrypt.compare(password, user.hashedPassword);

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
    res.json({
      name: user.name,
      isAdmin: user.isAdmin,
      accessToken,
      refreshToken,
    });
    return new NextResponse(JSON.stringify("Login success!", { status: 200 }));
    // status 200?
  } else {
    return new NextResponse(JSON.stringify("Email or password incorrect!"), {
      status: 400,
    });
  }
};
