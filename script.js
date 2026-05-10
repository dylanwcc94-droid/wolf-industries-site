// Simple form handler
document.querySelector("form").addEventListener("submit", function(e) {
  e.preventDefault();
  alert("Thank you for contacting Wolf Industries! We'll get back to you soon.");
});

// Gallery Drag & Drop
const dropZone = document.getElementById("drop-zone");
const galleryDisplay = document.getElementById("gallery-display");

if (dropZone) {
  dropZone.addEventListener("dragover", (e) => {
    e.preventDefault();
    dropZone.style.background = "rgba(255,255,255,0.2)";
  });

  dropZone.addEventListener("dragleave", () => {
    dropZone.style.background = "rgba(0,0,0,0.5)";
  });

  dropZone.addEventListener("drop", (e) => {
    e.preventDefault();
    dropZone.style.background = "rgba(0,0,0,0.5)";

    const files = e.dataTransfer.files;
    for (let file of files) {
      if (file.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onload = function(event) {
          const img = document.createElement("img");
          img.src = event.target.result;
          galleryDisplay.appendChild(img);
        };
        reader.readAsDataURL(file);
      }
    }
  });
}
