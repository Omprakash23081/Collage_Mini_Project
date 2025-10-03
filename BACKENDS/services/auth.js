import jwt from "jsonwebtoken";

const GenerateToken = async (user) => {
  const payLoad = {
    id: user._id,
    name: user.name,
    email: user.email,
  };
  const accessToken = jwt.sign(payLoad, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "1d",
  });

  const refreshToken = jwt.sign(payLoad, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: "7d",
  });

  user.refreshToken = refreshToken;
  const data = await user.save();

  // console.log(data);

  return { accessToken, refreshToken };
};

export default GenerateToken;
