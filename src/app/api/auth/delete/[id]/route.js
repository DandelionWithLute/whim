import prisma from "@/utils/connect";
import { NextResponse } from "next/server";
import { verify } from "@/utils/jwt";

export const DELETE = async (req, res) => {
  if (!verify){
    return new NextResponse(JSON.stringify("Not verified !"))
  }
  if (req.user.id === req.params.id) {
    prisma.user.delete({
      where: {
        email: req.body.email,
      },
    });
    return new NextResponse(JSON.stringify("User has been deleted."), {
      status: 200,
    });
  } else {
    return new NextResponse(
      JSON.stringify("You are not allowed to delete this user!"),
      { status: 403 }
    );
  }
};
