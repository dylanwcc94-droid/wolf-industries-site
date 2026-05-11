// Example script — safe checks added
// Remove duplicate dropZone declarations

const gallery = document.getElementById("gallery-display");
if (gallery) {
  fetch("/api/gallery")
    .then(res => res.json())
    .then(images => {
      images.forEach(url => {
        const img = document.createElement("img");
        img.src = url;
        img.alt = "Gallery Image";
        gallery.appendChild(img);
      });
    })
    .catch(err => console.error("Error loading gallery:", err));
}
