//in this file we will configure cloudinary and upload local files to cloudinary

import { v2 as cloudinary } from "cloudinary";

const Upload = async (filePath) => {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.MY_CLOUD_API_KEY,
    api_secret: process.env.MY_CLOUD_API_SECRET,
  });
  try {
    if (!filePath) return null;

    console.log("Uploading file to Cloudinary:", filePath);

    const result = await cloudinary.uploader.upload(filePath, {
      resource_type: "auto", // allows images, videos, etc.
    });

    console.log("File uploaded successfully:", result.secure_url);
    return result.secure_url; // return only the URL
  } catch (error) {
    console.error("Cloudinary upload failed:", error);
    throw new Error("Cloudinary upload failed");
  }
};

export { Upload };
