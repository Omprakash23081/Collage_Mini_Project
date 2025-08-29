import { v2 as cloudinary } from "cloudinary";

const Upload = async (filePath) => {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.MY_CLOUD_API_KEY,
    api_secret: process.env.MY_CLOUD_API_SECRET,
  });
  console.log("it is commig for uploding file");

  try {
    console.log("Uploading file to Cloudinary:", filePath);
    if (!filePath) return null;
    const result = await cloudinary.uploader.upload(filePath, {
      resource_type: "auto",
    });
    console.log("File uploaded successfully:", result);
    return result;
  } catch (error) {
    throw new Error("Cloudinary upload failed");
  }
};

export { Upload };
