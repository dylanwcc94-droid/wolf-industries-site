// /api/gallery.js
import fs from "fs";
import path from "path";

export default function handler(req, res) {
  try {
    // ✅ Only look inside the /public/gallery folder
    const galleryDir = path.join(process.cwd(), "public", "gallery");

    // Read files if folder exists
    const galleryFiles = fs.existsSync(galleryDir) ? fs.readdirSync(galleryDir) : [];

    // Filter to include only image types
    const imageFiles = galleryFiles.filter(file =>
      file.match(/\.(jpg|jpeg|png|gif|webp)$/i)
    );

    // ✅ Return full URLs for the images
    const imageUrls = imageFiles.map(file => `/gallery/${file}`);
    res.status(200).json(imageUrls);
  } catch (error) {
    console.error("Error reading gallery:", error);
    res.status(500).json({ error: "Failed to load gallery" });
  } finally {
    // ✅ No sensitive data is exposed here, just image URLs
  }
}
