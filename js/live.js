const video = document.getElementById("video");
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let cocoModel;
let lastSpoken = "";

// =====================
// SPEAK FUNCTION
// =====================
function speak(text) {
  if (text === lastSpoken) return;
  lastSpoken = text;

  speechSynthesis.cancel();
  const msg = new SpeechSynthesisUtterance(text);
  msg.lang = "en-IN";
  msg.rate = 0.95;
  speechSynthesis.speak(msg);
}

// =====================
// START CAMERA
// =====================
async function startCamera() {
  const stream = await navigator.mediaDevices.getUserMedia({
    video: { facingMode: "environment" }
  });
  video.srcObject = stream;
}

// =====================
// LOAD COCO MODEL (for bounding boxes)
// =====================
async function loadModel() {
  cocoModel = await cocoSsd.load();
  detectObjects();
}

// =====================
// LIVE OBJECT BOXES
// =====================
async function detectObjects() {
  if (!cocoModel) return;
  const predictions = await cocoModel.detect(video);
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  predictions.forEach(p => {
    if (p.score > 0.6) {
      const [x, y, w, h] = p.bbox;

      ctx.strokeStyle = "#00ffcc";
      ctx.lineWidth = 3;
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;


      ctx.strokeRect(x, y, w, h);
      ctx.fillStyle = "#00ffcc";
      ctx.font = "16px Arial";
      ctx.fillText(p.class, x, y - 5);
    }
  });

  requestAnimationFrame(detectObjects);
}

// =====================
// LOCAL AI SCENE DESCRIPTION (YOLO + BLIP SERVER)
// =====================
async function describeScene() {
  speak("Analyzing scene");

  try {
    // Capture current frame
    const tempCanvas = document.createElement("canvas");
    tempCanvas.width = video.videoWidth;
    tempCanvas.height = video.videoHeight;
    tempCanvas.getContext("2d").drawImage(video, 0, 0);

    const blob = await new Promise(resolve =>
      tempCanvas.toBlob(resolve, "image/jpeg", 0.9)
    );

    // Send to local AI server
    const formData = new FormData();
    formData.append("image", blob);

    const response = await fetch("http://127.0.0.1:5000/analyze", {
      method: "POST",
      body: formData
    });

    const data = await response.json();

    if (data.caption) {
      speak(data.caption);
    } else {
      speak("I could not understand the scene clearly");
    }

  } catch (error) {
    console.error(error);
    speak("AI server not running. Please start the local vision server.");
  }
}

// =====================
// INIT
// =====================
(async function init() {
  await startCamera();
  await loadModel();
})();