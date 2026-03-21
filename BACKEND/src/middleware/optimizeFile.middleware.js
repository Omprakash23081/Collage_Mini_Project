import sharp from "sharp";
import fs from "fs/promises";
import path from "path";
import os from "os";

const MAX_SIZE_MB = 10.48;

const optimizeFile = async (req, res, next) => {
  if (!req.file) return next();

  try {
    const uploadDir = path.join(os.tmpdir(), "uploads");
    await fs.mkdir(uploadDir, { recursive: true });

    const originalName = req.file.originalname.replace(/\s+/g, "-");
    const ext = path.extname(originalName).toLowerCase();
    const baseName = path.basename(originalName, ext);
    
    // Check both mimetype and common image extensions to prevent browser MIME quirks
    const imageExtensions = [".jpg", ".jpeg", ".png", ".webp", ".gif", ".svg"];
    const isImage = req.file.mimetype.startsWith("image/") || imageExtensions.includes(ext);

    const filename = `${Date.now()}-${baseName}${isImage ? ".jpg" : path.extname(originalName)}`;
    const outputPath = path.join(uploadDir, filename);

    // ---------- IMAGE ----------
    if (isImage) {
      await sharp(req.file.buffer)
        .resize({ width: 1200, withoutEnlargement: true })
        .jpeg({ quality: 75, mozjpeg: true }) // stronger compression
        .toFile(outputPath);
    }
    // ---------- PDF / OTHER ----------
    else {
      await fs.writeFile(outputPath, req.file.buffer);
    }

    const stats = await fs.stat(outputPath);
    const sizeMB = stats.size / (1024 * 1024);

    if (sizeMB > MAX_SIZE_MB) {
      await fs.unlink(outputPath);
      return res.status(400).json({
        message: `File exceeds ${MAX_SIZE_MB}MB limit.`,
      });
    }

    req.file.path = outputPath;
    req.file.isImage = isImage;

    delete req.file.buffer;

    next();
  } catch (error) {
    console.error("Optimize file error:", error);
    return res.status(500).json({
      message: "Error processing uploaded file",
    });
  }
};

export default optimizeFile;
