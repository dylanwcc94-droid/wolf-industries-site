document.addEventListener("DOMContentLoaded", () => {
  const gallery = document.getElementById("gallery-display");
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightbox-img");
  const closeBtns = document.querySelectorAll('.lightbox-close');

  if (gallery && lightbox && lightboxImg && closeBtns.length > 0) {
    // Fetch images dynamically
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

    // Close with any button (supports multiple)
    closeBtns.forEach(btn => {
      btn.addEventListener("click", () => {
        lightbox.style.display = "none";
        document.body.style.overflow = "";
      });
    });

    // Close when clicking outside the image
    lightbox.addEventListener("click", (e) => {
      if (e.target === lightbox) {
        lightbox.style.display = "none";
        document.body.style.overflow = "";
      }
    });

    // Close with ESC key
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        lightbox.style.display = "none";
        document.body.style.overflow = "";
      }
    });
  }
});
