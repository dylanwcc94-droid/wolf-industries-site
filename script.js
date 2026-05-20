document.addEventListener("DOMContentLoaded", () => {
  const gallery = document.getElementById("gallery-display");
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightbox-img");
  const closeBtns = document.querySelectorAll(".lightbox-close");

  if (gallery) {
    let inlineViewer = null;
    let selectedImage = null;

    const closeInlineViewer = () => {
      if (inlineViewer) {
        inlineViewer.remove();
        inlineViewer = null;
      }

      if (selectedImage) {
        selectedImage.classList.remove("is-selected");
        selectedImage = null;
      }
    };

    const openInlineViewer = (image) => {
      const url = image.dataset.fullImage || image.src;

      if (selectedImage === image) {
        closeInlineViewer();
        return;
      }

      closeInlineViewer();

      selectedImage = image;
      selectedImage.classList.add("is-selected");

      inlineViewer = document.createElement("div");
      inlineViewer.className = "inline-gallery-viewer";

      const closeButton = document.createElement("button");
      closeButton.className = "inline-gallery-close";
      closeButton.type = "button";
      closeButton.setAttribute("aria-label", "Close image");
      closeButton.textContent = "×";

      const expandedImage = document.createElement("img");
      expandedImage.src = url;
      expandedImage.alt = "Selected gallery image";

      inlineViewer.append(closeButton, expandedImage);

      image.insertAdjacentElement("afterend", inlineViewer);

      expandedImage.addEventListener("load", () => {
        inlineViewer.scrollIntoView({ behavior: "smooth", block: "nearest" });
      }, { once: true });

      closeButton.addEventListener("click", closeInlineViewer);
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
        openInlineViewer(image);
      }
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        closeInlineViewer();
      }
    });
  }

  if (lightbox && lightboxImg && closeBtns.length > 0) {
    closeBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        lightbox.classList.remove("is-open");
        lightbox.setAttribute("aria-hidden", "true");
        lightboxImg.src = "";
        document.body.style.overflow = "";
      });
    });
  }
});
