import ApiResponse from "../util/ApiResponse.js";

const information = (req, res) => {
  console.log("request is come for user details ", req.user);

  return res.status(200).json(req.user);
};

export { information };
