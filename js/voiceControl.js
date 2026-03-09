// ===============================
// VOICE CONTROL FOR SAFE STEPS (FIXED VERSION)
// ===============================

// Check browser support
const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;

if (!SpeechRecognition) {
  alert("Voice recognition not supported in this browser. Please use Google Chrome.");
}

// Create recognition instance
const recognition = new SpeechRecognition();
recognition.lang = "en-IN";
recognition.continuous = false;
recognition.interimResults = false;

// ===============================
// 🔊 TEXT TO SPEECH
// ===============================
function speak(text) {
  speechSynthesis.cancel();
  const msg = new SpeechSynthesisUtterance(text);
  msg.lang = "en-IN";
  msg.rate = 1;
  speechSynthesis.speak(msg);
}

// ===============================
// 🎤 START VOICE COMMAND
// ===============================
function startVoiceCommand() {
  try {
    speak("Listening. Please say a command");
    recognition.start();
  } catch (error) {
    console.log("Recognition already started");
  }
}

// ===============================
// 🎯 HANDLE RESULT
// ===============================
recognition.onresult = function (event) {
  const command = event.results[0][0].transcript.toLowerCase().trim();
  console.log("Voice Command:", command);

  if (command.includes("live") || command.includes("detection")) {
    speak("Opening live object detection");
    setTimeout(() => {
      window.location.href = "live.html";
    }, 1000);
  }

  else if (command.includes("navigation") || command.includes("navigate")) {
    speak("Opening navigation");
    setTimeout(() => {
      window.location.href = "navigate.html";
    }, 1000);
  }

  else if (command.includes("read")) {
    speak("Opening document reader");
    setTimeout(() => {
      window.location.href = "read.html";
    }, 1000);
  }

  else if (command.includes("assistant") || command.includes("chat")) {
    speak("Opening AI assistant");
    setTimeout(() => {
      window.location.href = "chatbot.html";
    }, 1000);
  }

  else if (command.includes("sos") || command.includes("emergency")) {
    speak("Sending emergency alert");
    setTimeout(() => {
      sendSOS();
    }, 1000);
  }

  else {
    speak("Sorry, I did not understand. Please try again.");
  }
};

// ===============================
// ❌ ERROR HANDLING
// ===============================
recognition.onerror = function (event) {
  console.error("Speech recognition error:", event.error);

  if (event.error === "not-allowed") {
    speak("Microphone permission denied.");
  } else {
    speak("Voice recognition error. Please try again.");
  }
};

// ===============================
// 🔄 AUTO STOP MESSAGE
// ===============================
recognition.onend = function () {
  console.log("Recognition stopped.");
};