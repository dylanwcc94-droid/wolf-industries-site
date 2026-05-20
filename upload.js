const form = document.getElementById("upload-form");
const statusBox = document.getElementById("upload-status");

function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => {
      const result = String(reader.result);
      resolve(result.split(",")[1]);
    };

    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

function setStatus(message, isError = false) {
  statusBox.textContent = message;
  statusBox.classList.toggle("error", isError);
}

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const token = document.getElementById("upload-token").value;
  const files = Array.from(document.getElementById("image-files").files);

  if (files.length === 0) {
    setStatus("Choose at least one image.", true);
    return;
  }

  setStatus(`Uploading ${files.length} image${files.length === 1 ? "" : "s"}...`);

  try {
    for (const file of files) {
      const data = await fileToBase64(file);
      const response = await fetch("/api/upload", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-gallery-upload-token": token,
        },
        body: JSON.stringify({
          fileName: file.name,
          contentType: file.type,
          data,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || `Unable to upload ${file.name}.`);
      }
    }

    form.reset();
    setStatus("Upload complete. The new images are now available in the gallery.");
  } catch (error) {
    setStatus(error.message, true);
  }
});
