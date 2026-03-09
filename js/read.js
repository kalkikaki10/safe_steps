// WAIT for page to load
window.onload = function () {

  const imageInput = document.getElementById("imageInput");
  const outputText = document.getElementById("outputText");
  const video = document.getElementById("camera");
  const canvas = document.getElementById("snapshot");
  const captureBtn = document.getElementById("captureBtn");

  let stream = null;

  /* ========= FILE UPLOAD ========= */
  imageInput.addEventListener("change", () => {
    const file = imageInput.files[0];
    if (!file) return;
    readText(file);
  });

  /* ========= CAMERA ========= */
  window.openCamera = function () {
    navigator.mediaDevices.getUserMedia({ video: true })
      .then(s => {
        stream = s;
        video.srcObject = stream;
        video.style.display = "block";
        captureBtn.style.display = "block";
        speak("Camera opened. Please point the camera at the text and press capture.");
      })
      .catch(() => {
        speak("Camera permission denied.");
      });
  };

  /* ========= CAPTURE ========= */
  window.capturePhoto = function () {
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    canvas.getContext("2d").drawImage(video, 0, 0);

    canvas.toBlob(blob => {
      readText(blob);
    });

    stream.getTracks().forEach(t => t.stop());
    video.style.display = "none";
    captureBtn.style.display = "none";
  };
  function speak(text) {
  const msg = new SpeechSynthesisUtterance(text);
  msg.lang = "en-US";
  msg.rate = 1;
  speechSynthesis.speak(msg);
}

/* STOP BUTTON */
window.stopReading = function () {
  speechSynthesis.cancel();
};


  /* ========= OCR ========= */
  function readText(image) {
    outputText.value = "Reading text...";
    speechSynthesis.cancel();

    Tesseract.recognize(image, "eng")
      .then(result => {
        const text = result.data.text;
        outputText.value = text || "No text found";
        speak(text || "No readable text found");
      })
      .catch(() => {
        speak("Error reading text");
      });
  }

  /* ========= SPEECH ========= */
  function speak(text) {
    const msg = new SpeechSynthesisUtterance(text);
    msg.lang = "en-US";
    msg.rate = 1;
    speechSynthesis.speak(msg);
  }

};
