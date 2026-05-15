document.addEventListener("DOMContentLoaded", () => {
  const gallery = document.getElementById("gallery-display");
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightbox-img");
  const closeBtn = document.getElementById("lightbox-close");

  if (gallery && lightbox && lightboxImg && closeBtn) {
    // Open lightbox
    gallery.querySelectorAll('[data-lightbox]').forEach(img => {
      img.addEventListener("click", () => {
        lightboxImg.src = img.src;
        lightbox.style.display = "flex";
        document.body.style.overflow = "hidden"; // lock scroll
      });
    });

    // Close with X
    closeBtn.addEventListener("click", () => {
      lightbox.style.display = "none";
      document.body.style.overflow = "";
    });

    // Close when clicking outside image
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
