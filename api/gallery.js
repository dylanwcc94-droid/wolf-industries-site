const fs = require("fs");
const path = require("path");

module.exports = function handler(req, res) {
  const galleryPath = path.join(process.cwd(), "public/gallery");

  try {
    const files = fs.readdirSync(galleryPath);
    const images = files.filter((file) => /\.(jpg|jpeg|png|gif|webp)$/i.test(file));
    const urls = images.map((img) => `/gallery/${img}`);

    res.status(200).json(urls);
  } catch (error) {
    res.status(500).json({ error: "Unable to load gallery images" });
  }
};
