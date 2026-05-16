import fs from "fs";
import path from "path";

export default function handler(req, res) {
  const galleryPath = path.join(process.cwd(), "public/assets/gallery");

  try {
    const files = fs.readdirSync(galleryPath);

    // Only include image files
    const images = files.filter(file =>
      file.match(/\.(jpg|jpeg|png|gif|webp)$/i)
    );

    // Build URLs for each image
    const urls = images.map(img => `/assets/gallery/${img}`);

    res.status(200).json(urls);
  } catch (error) {
    res.status(500).json({ error: "Unable to load gallery images" });
  }
}
