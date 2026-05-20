const fs = require("fs");
const path = require("path");

const IMAGE_EXTENSIONS = /\.(jpg|jpeg|png|gif|webp)$/i;

function getStaticGalleryImages() {
  const galleryPath = path.join(process.cwd(), "public/gallery");

  if (!fs.existsSync(galleryPath)) {
    return [];
  }

  return fs
    .readdirSync(galleryPath)
    .filter((file) => IMAGE_EXTENSIONS.test(file))
    .map((file) => `/gallery/${encodeURIComponent(file)}`);
}

async function getBlobGalleryImages() {
  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    return [];
  }

  const { list } = await import("@vercel/blob");
  const { blobs } = await list({ prefix: "gallery/" });

  return blobs
    .filter((blob) => IMAGE_EXTENSIONS.test(blob.pathname))
    .map((blob) => blob.url);
}

module.exports = async function handler(req, res) {
  try {
    const staticImages = getStaticGalleryImages();
    const blobImages = await getBlobGalleryImages();

    res.status(200).json([...blobImages, ...staticImages]);
  } catch (error) {
    console.error("Gallery API error:", error);
    res.status(500).json({ error: "Unable to load gallery images" });
  }
};
