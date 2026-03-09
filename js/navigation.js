// ===============================
// VOICE BASED NAVIGATION (FIXED)
// ===============================

const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;

const recognition = new SpeechRecognition();
recognition.lang = "en-IN";
recognition.continuous = false;

// 🔊 Text to Speech
function speak(text) {
  speechSynthesis.cancel();
  const msg = new SpeechSynthesisUtterance(text);
  msg.lang = "en-IN";
  msg.rate = 1;
  speechSynthesis.speak(msg);
}

// 🚀 AUTO START WHEN PAGE LOADS
function autoStartNavigation() {
  setTimeout(() => {
    startNavigation();
  }, 800); // small delay so page loads properly
}

// 🎤 Ask for destination
function startNavigation() {
  speak("Please say your destination after the beep");
  recognition.start();
}

// 🎯 Capture destination
recognition.onresult = (event) => {
  const destination = event.results[0][0].transcript;
  console.log("Destination:", destination);

  speak("Navigating to " + destination);

  if (!navigator.geolocation) {
    speak("Geolocation not supported on this device");
    return;
  }

  navigator.geolocation.getCurrentPosition(
    (position) => {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;

      const mapsUrl =
        `https://www.google.com/maps/dir/?api=1` +
        `&origin=${lat},${lon}` +
        `&destination=${encodeURIComponent(destination)}` +
        `&travelmode=walking`;

      window.open(mapsUrl, "_blank");
    },
    () => {
      speak("Unable to access your location");
    }
  );
};

// ❌ Handle no speech
recognition.onerror = () => {
  speak("I did not hear the destination. Please try again.");
};
// ⌨️ TEXT BASED NAVIGATION (NEW FEATURE)
function startTextNavigation() {
  const destination = document.getElementById("textDestination").value.trim();

  if (!destination) {
    speak("Please enter a destination first");
    return;
  }

  speak("Navigating to " + destination);

  if (!navigator.geolocation) {
    speak("Geolocation not supported on this device");
    return;
  }

  navigator.geolocation.getCurrentPosition(
    (position) => {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;

      const mapsUrl =
        `https://www.google.com/maps/dir/?api=1` +
        `&origin=${lat},${lon}` +
        `&destination=${encodeURIComponent(destination)}` +
        `&travelmode=walking`;

      window.open(mapsUrl, "_blank");
    },
    () => {
      speak("Unable to access your location");
    }
  );
}