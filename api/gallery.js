// /api/gallery.js
import fs from "fs";
import path from "path";

export default function handler(req, res) {
  try {
    // Paths to both assets and gallery folders
    const assetsDir = path.join(process.cwd(), "public", "assets");
    const galleryDir = path.join(process.cwd(), "public", "gallery");

    // Read files from each folder
    const assetsFiles = fs.existsSync(assetsDir) ? fs.readdirSync(assetsDir) : [];
    const galleryFiles = fs.existsSync(galleryDir) ? fs.readdirSync(galleryDir) : [];

    // Build URLs for each file
    const assetUrls = assetsFiles.map(file => `/assets/${file}`);
    const galleryUrls = galleryFiles.map(file => `/gallery/${file}`);

    // Combine both lists
    const urls = [...assetUrls, ...galleryUrls];

    res.status(200).json(urls);
  } catch (error) {
    console.error("Error reading folders:", error);
    res.status(500).json({ error: "Failed to load gallery images" });
  }
}
