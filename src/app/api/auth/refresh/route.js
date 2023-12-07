import { NextResponse } from "next/server";
import prisma from "@/utils/connect";
import { generateAccessToken, generateRefreshToken } from "@/utils/jwt";

export const POST = async (req, res) => {
  const refreshToken = req.body.token;

  if (!refreshToken)
    return new NextResponse(JSON.stringify("You are not authenticated!"), {
      status: 401,
    });

  const isThereToken = await prisma.VerificationToken.findUnique({
    where: { token: refreshToken },
  });
  if (!isThereToken) {
    return new NextResponse(JSON.stringify("Refresh token is not valid!"), {
      status: 403,
    });
  }
  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_KEY, (err, user) => {
    err && console.log(err);
    prisma.VerificationToken.delete({ where: { token: refreshToken } });
  });

  const newAccessToken = generateAccessToken(user);
  const newRefreshToken = generateRefreshToken(user);

  prisma.VerificationToken.create({ data: { token: newRefreshToken } });

  return new NextResponse(
    json({
      accessToken: newAccessToken,
      refreshToken: newRefreshToken,
    }),
    {
      status: 200,
    }
  );
};
