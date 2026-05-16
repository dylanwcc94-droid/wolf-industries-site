document.addEventListener("DOMContentLoaded", () => {
  const gallery = document.getElementById("gallery-display");
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightbox-img");
  const closeBtn = document.getElementById("lightbox-close");

  if (gallery && lightbox && lightboxImg && closeBtn) {
    fetch("/api/gallery")
      .then(res => res.json())
      .then(images => {
        if (!images || images.length === 0) {
          gallery.innerHTML = "<p>No images found in gallery.</p>";
          return;
        }

        images.forEach(url => {
          const img = document.createElement("img");
          img.src = url;
          img.alt = "Gallery Image";
          img.className = "gallery-image";
          img.style.cursor = "pointer";

          // Open lightbox
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
    closeBtn.addEventListener("click", () => {
      lightbox.style.display = "none";
      document.body.style.overflow = "";
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
  }
});
