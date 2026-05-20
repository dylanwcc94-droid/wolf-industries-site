const MAX_FILE_SIZE = 8 * 1024 * 1024;
const ALLOWED_TYPES = new Set(["image/jpeg", "image/png", "image/gif", "image/webp"]);

function readBody(req) {
  return new Promise((resolve, reject) => {
    let body = "";

    req.on("data", (chunk) => {
      body += chunk;
      if (body.length > MAX_FILE_SIZE * 2) {
        reject(new Error("Request too large"));
        req.destroy();
      }
    });

    req.on("end", () => resolve(body));
    req.on("error", reject);
  });
}

function safeFileName(fileName) {
  const extension = fileName.split(".").pop().toLowerCase();
  const baseName = fileName
    .replace(/\.[^.]+$/, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
    .slice(0, 60);

  return `${baseName || "gallery-image"}-${Date.now()}.${extension}`;
}

module.exports = async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    res.status(500).json({ error: "Vercel Blob storage is not configured yet." });
    return;
  }

  if (!process.env.GALLERY_UPLOAD_TOKEN) {
    res.status(500).json({ error: "Gallery upload token is not configured yet." });
    return;
  }

  if (req.headers["x-gallery-upload-token"] !== process.env.GALLERY_UPLOAD_TOKEN) {
    res.status(401).json({ error: "Invalid upload password." });
    return;
  }

  try {
    const body = await readBody(req);
    const { fileName, contentType, data } = JSON.parse(body);

    if (!fileName || !contentType || !data) {
      res.status(400).json({ error: "Missing file data." });
      return;
    }

    if (!ALLOWED_TYPES.has(contentType)) {
      res.status(400).json({ error: "Only JPG, PNG, GIF, and WebP images are allowed." });
      return;
    }

    const buffer = Buffer.from(data, "base64");
    if (buffer.length > MAX_FILE_SIZE) {
      res.status(400).json({ error: "Image is too large. Maximum size is 8MB." });
      return;
    }

    const { put } = await import("@vercel/blob");
    const blob = await put(`gallery/${safeFileName(fileName)}`, buffer, {
      access: "public",
      contentType,
    });

    res.status(200).json({ url: blob.url });
  } catch (error) {
    console.error("Upload API error:", error);
    res.status(500).json({ error: "Unable to upload image." });
  }
};
