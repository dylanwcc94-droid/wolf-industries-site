// /api/gallery.js
import fs from "fs";
import path from "path";

export default function handler(req, res) {
  // Path to your public/assets folder
  const assetsDir = path.join(process.cwd(), "public", "assets");

  try {
    // Read all files in assets folder
    const files = fs.readdirSync(assetsDir);

    // Build URLs for each file
    const urls = files.map(file => `/assets/${file}`);

    res.status(200).json(urls);
  } catch (error) {
    console.error("Error reading assets folder:", error);
    res.status(500).json({ error: "Failed to load gallery images" });
  }
}
