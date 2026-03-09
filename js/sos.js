function sendSOS() {

const phone = localStorage.getItem("emergencyPhone");

if(!phone){
alert("Please add an emergency contact in Settings.");
return;
}

// Speak message
speechSynthesis.cancel();
const speakMsg = new SpeechSynthesisUtterance("Sending emergency location to your contact.");
speakMsg.lang = "en-IN";
speechSynthesis.speak(speakMsg);


// Get GPS location
if(!navigator.geolocation){
alert("Geolocation not supported on this device");
return;
}

navigator.geolocation.getCurrentPosition(

(position) => {

const lat = position.coords.latitude;
const lon = position.coords.longitude;

const locationLink = `https://maps.google.com/?q=${lat},${lon}`;

const message = encodeURIComponent(
"🚨 EMERGENCY! I need help.\n\nMy current location:\n" + locationLink
);

// Open WhatsApp message
window.open(`https://wa.me/${phone}?text=${message}`, "_blank");

},

() => {

alert("Unable to get your location");

}

);

}