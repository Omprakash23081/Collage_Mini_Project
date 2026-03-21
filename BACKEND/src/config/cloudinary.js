import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

const Upload = async (filePath, isImage) => {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.MY_CLOUD_API_KEY,
    api_secret: process.env.MY_CLOUD_API_SECRET,
  });

  if (!filePath) throw new Error("File path missing");

  try {
    const options = isImage
      ? {
          resource_type: "image",
          transformation: [{ quality: "auto", fetch_format: "auto" }],
        }
      : {
          resource_type: "raw",
        };

    const result = await cloudinary.uploader.upload(filePath, options);

    return result.secure_url;
  } finally {
    // Always cleanup local file
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
  }
};

export { Upload };
