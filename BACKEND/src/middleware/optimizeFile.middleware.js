import sharp from "sharp";
import fs from "fs/promises";
import path from "path";
import os from "os";

const MAX_SIZE_MB = 10.48;

const processFile = async (file) => {
  const uploadDir = path.join(os.tmpdir(), "uploads");
  await fs.mkdir(uploadDir, { recursive: true });

  const originalName = file.originalname.replace(/\s+/g, "-");
  const ext = path.extname(originalName).toLowerCase();
  const baseName = path.basename(originalName, ext);
  
  const imageExtensions = [".jpg", ".jpeg", ".png", ".webp", ".gif", ".svg"];
  const isImage = file.mimetype.startsWith("image/") || imageExtensions.includes(ext);

  const filename = `${Date.now()}-${baseName}${isImage ? ".jpg" : path.extname(originalName)}`;
  const outputPath = path.join(uploadDir, filename);

  if (isImage) {
    await sharp(file.buffer)
      .resize({ width: 1200, withoutEnlargement: true })
      .jpeg({ quality: 75, mozjpeg: true })
      .toFile(outputPath);
  } else {
    await fs.writeFile(outputPath, file.buffer);
  }

  const stats = await fs.stat(outputPath);
  const sizeMB = stats.size / (1024 * 1024);

  if (sizeMB > MAX_SIZE_MB) {
    if (await fs.stat(outputPath).catch(() => false)) await fs.unlink(outputPath);
    throw new Error(`File ${originalName} exceeds ${MAX_SIZE_MB}MB limit.`);
  }

  file.path = outputPath;
  file.isImage = isImage;
  delete file.buffer;
  return file;
};

const optimizeFile = async (req, res, next) => {
  try {
    if (req.file) {
      await processFile(req.file);
    } else if (req.files) {
      if (Array.isArray(req.files)) {
        await Promise.all(req.files.map(file => processFile(file)));
      } else {
        const fileFields = Object.values(req.files);
        await Promise.all(fileFields.flat().map(file => processFile(file)));
      }
    }
    next();
  } catch (error) {
    console.error("Optimize file error:", error);
    return res.status(error.message.includes("exceeds") ? 400 : 500).json({
      message: error.message || "Error processing uploaded file",
    });
  }
};

export default optimizeFile;
