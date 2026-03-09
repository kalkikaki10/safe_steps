function makeEmergencyCall(){

const phone = localStorage.getItem("emergencyPhone");

if(!phone){
alert("Please add emergency contact in Settings");
return;
}

// Voice feedback for blind users
speechSynthesis.cancel();
const msg = new SpeechSynthesisUtterance("Calling your emergency contact");
msg.lang = "en-IN";
speechSynthesis.speak(msg);

// Start phone call
window.location.href = `tel:${phone}`;

}