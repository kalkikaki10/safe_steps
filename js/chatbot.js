const chatBox = document.getElementById("chatBox");
const userInput = document.getElementById("userInput");

let conversationMemory = [];

// ---------------- UI ----------------
function addMessage(sender, text) {
  const msg = document.createElement("div");
  msg.innerHTML = `<b>${sender}:</b> ${text}`;
  msg.style.margin = "10px";
  chatBox.appendChild(msg);
  chatBox.scrollTop = chatBox.scrollHeight;
}

// ---------------- SPEECH ----------------
function speak(text) {
  speechSynthesis.cancel();
  const msg = new SpeechSynthesisUtterance(text);
  msg.lang = "en-IN";
  msg.rate = 0.92;
  speechSynthesis.speak(msg);
}

// ---------------- CORE AI ENGINE ----------------
async function botReply(userText) {
  addMessage("Bot", "Thinking...");
  conversationMemory.push({ role: "user", content: userText });

  try {
    let answer = "";

    // STEP 1: Smarter DuckDuckGo
    const ddgRes = await fetch(
      `https://api.duckduckgo.com/?q=${encodeURIComponent(userText)}&format=json&no_html=1&skip_disambig=1`
    );
    const ddg = await ddgRes.json();

    if (ddg.AbstractText) {
      answer = ddg.AbstractText;
    }

    // STEP 2: Wikipedia Search instead of direct title
    if (!answer) {
      const searchRes = await fetch(
        `https://en.wikipedia.org/w/api.php?action=opensearch&search=${encodeURIComponent(userText)}&limit=1&format=json&origin=*`
      );
      const searchData = await searchRes.json();

      if (searchData[1] && searchData[1][0]) {
        const pageTitle = searchData[1][0];
        const wikiRes = await fetch(
          `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(pageTitle)}`
        );
        const wiki = await wikiRes.json();
        if (wiki.extract) answer = wiki.extract;
      }
    }

    // STEP 3: Wikidata backup
    if (!answer) {
      const wd = await fetch(
        `https://www.wikidata.org/w/api.php?action=wbsearchentities&search=${encodeURIComponent(userText)}&language=en&format=json&origin=*`
      );
      const wdata = await wd.json();
      if (wdata.search?.length > 0) {
        answer = wdata.search[0].label + ": " + wdata.search[0].description;
      }
    }

    // STEP 4: Smart formatting for blind users
    if (answer) {
      answer = simplifyForSpeech(answer);
    }

    // STEP 5: Final fallback
    if (!answer) {
      answer =
        "I could not find a clear answer. Please try asking in a different way, for example: 'What is photosynthesis?' or 'Explain blockchain technology'.";
    }

    addMessage("Bot", answer);
    speak(answer);
    conversationMemory.push({ role: "bot", content: answer });

  } catch (err) {
    addMessage("Bot", "Please check your internet connection.");
    speak("Please check your internet connection.");
  }
}

// ---------------- SPEECH FRIENDLY CLEANER ----------------
function simplifyForSpeech(text) {
  return text
    .replace(/\([^)]*\)/g, "")       // remove brackets
    .replace(/\[[^\]]*\]/g, "")      // remove references
    .replace(/\s+/g, " ")            // clean spacing
    .trim();
}

// ---------------- SEND ----------------
function sendMessage() {
  const text = userInput.value.trim();
  if (!text) return;

  addMessage("You", text);
  botReply(text);
  userInput.value = "";
}
/* STOP BUTTON */
window.stopReading = function () {
  speechSynthesis.cancel();
};

// ---------------- VOICE INPUT ----------------
function startVoice() {
  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;

  if (!SpeechRecognition) {
    alert("Voice recognition not supported");
    return;
  }

  const recognition = new SpeechRecognition();
  recognition.lang = "en-IN";
  recognition.start();

  recognition.onresult = (event) => {
    const voiceText = event.results[0][0].transcript;
    addMessage("You (voice)", voiceText);
    botReply(voiceText);
  };
}
