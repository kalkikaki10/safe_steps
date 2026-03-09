let currentLang = "en-IN";
let fontSize = 18;

// ======================
// TEXT TO SPEECH
// ======================
function speakText(text) {
  const speech = new SpeechSynthesisUtterance(text);
  speech.lang = currentLang;
  window.speechSynthesis.cancel(); // stop previous speech
  window.speechSynthesis.speak(speech);
}

// ======================
// BASIC FEATURES
// ======================
function readPage() {
  speakText(document.body.innerText);
}

function changeLanguage() {
  currentLang = document.getElementById("language").value;
  speakText("Language changed");
}

function increaseFont() {
  fontSize += 2;
  document.body.style.fontSize = fontSize + "px";
  speakText("Font increased");
}

function decreaseFont() {
  fontSize -= 2;
  document.body.style.fontSize = fontSize + "px";
  speakText("Font decreased");
}

// ======================
// LOCATION (Village, City, State, Country)
// ======================
function getLocation() {
  if (!navigator.geolocation) {
    speakText("Geolocation is not supported by your browser");
    return;
  }

  speakText("Getting your current location");

  navigator.geolocation.getCurrentPosition(async position => {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;

    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`
      );

      const data = await response.json();
      const address = data.address || {};

      const place =
        address.village ||
        address.town ||
        address.suburb ||
        address.city ||
        "your area";

      const district =
        address.county ||
        address.state_district ||
        "";

      const state = address.state || "";
      const country = address.country || "";

      let finalText = `You are currently in ${place}`;

      if (district) finalText += `, ${district}`;
      if (state) finalText += `, ${state}`;
      if (country) finalText += `, ${country}`;

      speakText(finalText);

    } catch (error) {
      console.error(error);
      speakText("Unable to fetch location details");
    }

  }, () => {
    speakText("Location access denied");
  });
}

// ======================
// REAL NAVIGATION (Google Maps)
// ======================
function openNavigation() {
  const destination = prompt("Enter your destination");
  if (!destination) {
    speakText("No destination entered");
    return;
  }

  navigator.geolocation.getCurrentPosition(pos => {
    const lat = pos.coords.latitude;
    const lng = pos.coords.longitude;

    const url = `https://www.google.com/maps/dir/${lat},${lng}/${destination}`;
    window.open(url, "_blank");

    speakText("Opening navigation to " + destination);
  }, () => {
    speakText("Unable to access location");
  });
}

// ======================
// SPEECH RECOGNITION
// ======================
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();
recognition.lang = "en-IN";

function startListening() {
  recognition.start();
  speakText("Listening for command");
}

recognition.onresult = function (event) {
  const command = event.results[0][0].transcript.toLowerCase();
  console.log("Command:", command);
  handleCommand(command);
};

// ======================
// COMMAND HANDLER
// ======================
function handleCommand(command) {
  if (command.includes("read")) readPage();
  else if (command.includes("increase")) increaseFont();
  else if (command.includes("decrease")) decreaseFont();
  else if (command.includes("location") || command.includes("where am i")) getLocation();
  else if (command.includes("navigate") || command.includes("direction")) openNavigation();
  else if (command.includes("sos")) sendSOS();
  else askAI(command); 
}

// ======================
// AI CHATBOT (OpenAI API)
// ======================
async function askAI(question) {
  speakText("Thinking");

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer YOUR_OPENAI_API_KEY"
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: "You are a helpful assistant for visually impaired users." },
          { role: "user", content: question }
        ]
      })
    });

    const data = await response.json();
    const reply = data.choices[0].message.content;

    speakText(reply);
  } catch (error) {
    console.error(error);
    speakText("Error connecting to AI");
  }
}

// ======================
// SOS
// ======================
function sendSOS() {
  const phone = "919948444704"; // Replace with real number
  const msg = encodeURIComponent("Emergency! Please help me.");
  window.open(`https://wa.me/${phone}?text=${msg}`, "_blank");
  speakText("SOS sent");
}
// ======================
// IMAGE UNDERSTANDING (WORKING VERSION)
// ======================

async function analyzeImage() {
  const input = document.getElementById("imageInput");
  const file = input.files[0];

  if (!file) {
    speakText("No image selected");
    return;
  }

  speakText("Analyzing image, please wait");

  try {
    const base64Image = await fileToBase64(file);

    const response = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer YOUR_OPENAI_API_KEY"
      },
      body: JSON.stringify({
        model: "gpt-4.1-mini",
        input: [
          {
            role: "user",
            content: [
              { type: "input_text", text: "Describe this image for a blind person." },
              {
                type: "input_image",
                image_base64: base64Image.split(",")[1]
              }
            ]
          }
        ]
      })
    });

    const data = await response.json();

    console.log("Vision response:", data);

    const description =
      data.output?.[0]?.content?.[0]?.text ||
      "Sorry, I could not understand the image.";

    speakText(description);

  } catch (error) {
    console.error("Vision error:", error);
    speakText("Image analysis failed. Check API key or internet.");
  }
}

function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}