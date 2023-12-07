import { NextResponse } from "next/server";
import prisma from "@/utils/connect";

export const POST = async (req, res) => {
  if (!verify){
    return new NextResponse(JSON.stringify("Not verified !"))
  }
  const refreshToken = req.body.token;
  await prisma.VerificationToken.delete({ where: { token: refreshToken } });
  return new NextResponse(JSON.stringify("You logged out successfully."));
};
