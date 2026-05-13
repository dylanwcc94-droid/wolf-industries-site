// Example script — safe checks added
// Remove duplicate dropZone declarations

// Gallery Lightbox Script
const gallery = document.getElementById("gallery-display");
if (gallery) {
  fetch("/api/gallery")
    .then(res => res.json())
    .then(images => {
      const lightbox = document.getElementById("lightbox");
      const lightboxImg = document.getElementById("lightbox-img");

      images.forEach(url => {
        const img = document.createElement("img");
        img.src = url;
        img.alt = "Gallery Image";
        img.style.cursor = "pointer";

        // Open lightbox on click
        img.addEventListener("click", () => {
          lightboxImg.src = url;
          lightbox.style.display = "flex";
        });

        gallery.appendChild(img);
      });

      // Close lightbox when clicking outside image or on close button
      lightbox.addEventListener("click", (e) => {
  if (e.target === lightbox || e.target.classList.contains("lightbox-close")) {
    lightbox.style.display = "none";
  }
});

      // Close lightbox with ESC key
      document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") {
          lightbox.style.display = "none";
        }
      });
    })
    .catch(err => console.error("Error loading gallery:", err));
}
