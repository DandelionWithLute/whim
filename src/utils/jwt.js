import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

export const generateAccessToken = (user) => {
  return jwt.sign({ id: user.id }, process.env.ACCESS_TOKEN_KEY);
};

export const generateRefreshToken = (user) => {
  return jwt.sign(
    { id: user.id, isAdmin: user.isAdmin },
    process.env.REFRESH_TOKEN_KEY
  );
};

export const verify = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(" ")[1];

    jwt.verify(token, process.env.ACCESS_TOKEN_KEY, (err, user) => {
      if (err) {
        return new NextResponse(
          JSON.stringify("Token is not valid!", { status: 403 })
        );
      }

      req.user = user;
      next();
    });
  } else {
    return new NextResponse(
      JSON.stringify("You are not authenticated!", { status: 401 })
    );
  }
};
