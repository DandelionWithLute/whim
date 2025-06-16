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
    },
  });
  // if (user) {
  //   // return res.status(200).json([{ name: user.name }]);
  //   return new NextResponse(
  //     JSON.stringify({ name: user.name }, { status: 200 })
  //   );
  //   // status code 200 ?
  // }

  const isPasswordCorrect = await bcrypt.compare(password, user.hashedPassword);
  console.log(isPasswordCorrect);
  console.log(user);
  if (isPasswordCorrect) {
    //Generate an access token
    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);
    console.log(accessToken);
    console.log(refreshToken);
    // refreshTokens.push(refreshToken);
    prisma.JwtToken.create({
      data: {
        jwtToken: refreshToken,
      },
    });
    console.log(user.name);
    return new NextResponse(
      JSON.stringify({
        name: user.name,
        accessToken,
        refreshToken,
        message: "Login success!",
      }),
      { status: 200 }
    );
    // status 200?
  } else {
    console.log("Password Incorrect!");
    return new NextResponse(
      JSON.stringify("Forbidden:Email or Password is wrong!"),
      { status: 403 }
    );
  }
};

// export { handler as GET, handler as POST };
