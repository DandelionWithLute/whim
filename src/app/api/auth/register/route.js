import prisma from "@/utils/connect";

export const POST = async (req) => {
  const { name, email, password } = await req.json();

  const hashedPassword = await bcrypt.hash(password, process.env.SALT);

  try {
    await prisma.User.create({
      name,
      email,
      hashedPassword,
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
