document.addEventListener("DOMContentLoaded", () => {
  const gallery = document.getElementById("gallery-display");
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightbox-img");
  const closeBtns = document.querySelectorAll(".lightbox-close");

  if (gallery && lightbox && lightboxImg && closeBtns.length > 0) {
    const openLightbox = (url) => {
      lightboxImg.src = url;
      lightbox.classList.add("is-open");
      lightbox.setAttribute("aria-hidden", "false");
      document.body.style.overflow = "hidden";
    };

    const closeLightbox = () => {
      lightbox.classList.remove("is-open");
      lightbox.setAttribute("aria-hidden", "true");
      lightboxImg.src = "";
      document.body.style.overflow = "";
    };

    fetch("/api/gallery")
      .then((res) => res.json())
      .then((images) => {
        if (!images || images.length === 0) {
          gallery.innerHTML = "<p>No images found in gallery.</p>";
          return;
        }

        images.forEach((url) => {
          const img = document.createElement("img");
          img.src = url;
          img.alt = "Gallery Image";
          img.className = "gallery-image";
          img.loading = "lazy";
          img.dataset.fullImage = url;

          gallery.appendChild(img);
        });
      })
      .catch((err) => {
        console.error("Error loading gallery:", err);
        gallery.innerHTML = "<p>Unable to load gallery images.</p>";
      });

    gallery.addEventListener("click", (event) => {
      const image = event.target.closest(".gallery-image");

      if (image) {
        openLightbox(image.dataset.fullImage || image.src);
      }
    });

    closeBtns.forEach((btn) => {
      btn.addEventListener("click", closeLightbox);
    });

    lightbox.addEventListener("click", (e) => {
      if (e.target === lightbox) {
        closeLightbox();
      }
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && lightbox.classList.contains("is-open")) {
        closeLightbox();
      }
    });
  }
});
