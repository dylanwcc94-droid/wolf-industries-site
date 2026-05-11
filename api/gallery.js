import fs from "fs";
import path from "path";

export default function handler(req, res) {
  // Path to your gallery folder inside public/assets/gallery
  const galleryPath = path.join(process.cwd(), "public/assets/gallery");

  try {
    // Read all files in the gallery folder
    const files = fs.readdirSync(galleryPath);

    // Filter only image files
    const images = files.filter(file =>
      file.match(/\.(jpg|jpeg|png|gif|webp)$/i)
    );

    // Map to public URLs
    const urls = images.map(img => `/assets/gallery/${img}`);

    // Return JSON list of image URLs
    res.status(200).json(urls);
  } catch (error) {
    res.status(500).json({ error: "Unable to load gallery images" });
  }
}
