import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import { Readable } from "stream";

const Upload = async (file, isImage) => {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.MY_CLOUD_API_KEY,
    api_secret: process.env.MY_CLOUD_API_SECRET,
  });

  if (!file) throw new Error("File missing");

  const options = {
    resource_type: "auto",
    transformation: isImage ? [{ quality: "auto", fetch_format: "auto" }] : [],
  };

  // If file is a path (string)
  if (typeof file === "string") {
    try {
      const result = await cloudinary.uploader.upload(file, options);
      if (fs.existsSync(file)) fs.unlinkSync(file);
      return result.secure_url;
    } catch (error) {
      if (fs.existsSync(file)) fs.unlinkSync(file);
      throw error;
    }
  }

  // If file is a buffer (from multer memoryStorage)
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(options, (error, result) => {
      if (error) return reject(error);
      resolve(result.secure_url);
    });

    const readable = new Readable();
    readable.push(file);
    readable.push(null);
    readable.pipe(stream);
  });
};

export { Upload };
