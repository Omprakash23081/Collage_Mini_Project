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

  // Multi-device support: Push to array
  // Optional: Limit array size to prevent infinite growth (e.g., max 5 devices)
  let oldTokens = user.refreshToken || [];
  if (oldTokens.length >= 5) {
      oldTokens.shift(); // Remove oldest
  }
  user.refreshToken = [...oldTokens, refreshToken];
  const data = await user.save();

  // console.log(data);

  return { accessToken, refreshToken };
};

export default GenerateToken;
