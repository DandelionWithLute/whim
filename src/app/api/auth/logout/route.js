
app.post("/api/logout", verify, (req, res) => {
    const refreshToken = req.body.token;
    refreshTokens = refreshTokens.filter((token) => token !== refreshToken);
    res.status(200).json("You logged out successfully.");
  });


export const POST = async (req,res) => {
    const refreshToken = req.body.token;
    prisma.VerificationToken.de
}