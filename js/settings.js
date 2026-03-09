function openSettings(){
window.location.href="settings.html";
}


// SAVE SETTINGS

function saveSettings(){

const settings = {

name: document.getElementById("name").value,
phone: document.getElementById("phone").value,
dob: document.getElementById("dob").value,

contactName: document.getElementById("contactName").value,
contactPhone: document.getElementById("contactPhone").value,

voiceSpeed: document.getElementById("voiceSpeed").value,

darkMode: document.getElementById("darkMode").checked

};

localStorage.setItem("safeStepsSettings", JSON.stringify(settings));

applySettings();

alert("Settings Saved");

}

//Emergency location

const phone = document.getElementById("contactPhone").value;

localStorage.setItem("emergencyPhone", "9948444704");
// LOAD SETTINGS

window.onload = function(){

const settings = JSON.parse(localStorage.getItem("safeStepsSettings"));

if(!settings) return;

document.getElementById("name").value = settings.name || "";
document.getElementById("phone").value = settings.phone || "";
document.getElementById("dob").value = settings.dob || "";

document.getElementById("contactName").value = settings.contactName || "";
document.getElementById("contactPhone").value = settings.contactPhone || "";

document.getElementById("voiceSpeed").value = settings.voiceSpeed || "1";

document.getElementById("darkMode").checked = settings.darkMode || false;

applySettings();

}



// APPLY SETTINGS

function applySettings(){

const settings = JSON.parse(localStorage.getItem("safeStepsSettings"));

if(!settings) return;

if(settings.darkMode){

document.body.style.background="#121212";
document.body.style.color="white";

}

}