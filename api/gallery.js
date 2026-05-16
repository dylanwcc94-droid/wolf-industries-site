import { list } from "@vercel/blob";

export default async function handler(req, res) {
  try {
    // List all blobs in your linked storage
    const { blobs } = await list();

    // Filter only images
    const images = blobs
      .filter(b => b.pathname.match(/\.(jpg|jpeg|png|gif|webp)$/i))
      .map(b => b.url);

    res.status(200).json(images);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Unable to load gallery images" });
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const gallery = document.getElementById("gallery-display");
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightbox-img");
  const closeBtns = document.querySelectorAll('.lightbox-close');

  fetch("/api/gallery")
    .then(res => res.json())
    .then(images => {
      images.forEach(url => {
        const img = document.createElement("img");
        img.src = url;
        img.alt = "Gallery Image";
        img.className = "gallery-image";
        img.style.cursor = "pointer";

        img.addEventListener("click", () => {
          lightboxImg.src = url;
          lightbox.style.display = "flex";
          document.body.style.overflow = "hidden";
        });

        gallery.appendChild(img);
      });
    })
    .catch(err => console.error("Error loading gallery:", err));

  // Close handlers
  closeBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      lightbox.style.display = "none";
      document.body.style.overflow = "";
    });
  });

  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) {
      lightbox.style.display = "none";
      document.body.style.overflow = "";
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      lightbox.style.display = "none";
      document.body.style.overflow = "";
    }
  });
});
