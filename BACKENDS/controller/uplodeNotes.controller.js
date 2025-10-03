import ApiResponse from "../util/ApiResponse.js";
import User from "../models/user.models.js";
import { StudyMaterial } from "../models/studyMaterial.models.js";
import { Upload } from "../util/cloudinary.js";
const UplodeNotes = async (req, res) => {
  const { title, description, subject, year, fileUrl, uploadedBy, type, role } =
    req.body;

  // const user = User.findOne({ _id: req.user._id });

  // if (!user) {
  //   return res.status(401).json(new ApiResponse(401, "", "User Note Find"));
  // }

  if (role !== req.user.role) {
    res
      .status(401)
      .json(new ApiResponse(401, "", "invalid role plase inter valid role"));
  }

  if (role === "Admin") {
    const localPath = req.files?.document[0]?.path;

    const resUrl = await Upload(localPath);

    if (!resUrl) {
      return res
        .status(501)
        .json(
          new ApiResponse(
            501,
            "",
            "faild uploding Document Plase tryAgain after some time"
          )
        );
    }

    const response = StudyMaterial.create({
      title,
      description,
      subject,
      year,
      fileUrl: resUrl,
      uploadedBy,
      type,
    });
    if (!response) {
      res
        .status(501)
        .json(
          new ApiResponse(
            501,
            "",
            "Somthing went wrong during uploding Retry after some time"
          )
        );
    }
    return res
      .status(200)
      .json(new ApiResponse(200, response, "Document is uploded sucessfully"));
  } else if (role === "User") {
    //add in temporaray notes modal and it will be varifid by admin thsn it will uplode in main model
  } else {
    res
      .status(401)
      .json(new ApiResponse(401, "", "invalid role plase inter valid role"));
  }
};

export { UplodeNotes };
