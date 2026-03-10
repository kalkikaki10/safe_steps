# SafeSteps – Assistive Navigation Web Application

## Overview

**SafeSteps** is an AI-powered assistive navigation web application designed to support visually impaired users. The system integrates multiple technologies such as **computer vision, speech recognition, OCR, and navigation assistance** to provide a safer walking experience.

The platform offers features like:

* Live object detection
* Voice-controlled navigation
* Document reader using OCR
* AI assistant chatbot
* Emergency SOS alert system

This guide explains how to **set up and run the SafeSteps application on a new system**.

---

# System Requirements

Before running the project, ensure the following software is installed:

* Google Chrome or Microsoft Edge
* Python 3.10 or Python 3.11
* Internet connection (for AI models and APIs)

---

# Step 1: Download the SafeSteps Project

Copy or download the complete **SafeSteps project folder**.

Project structure:

```
SafeSteps/
│
├── index.html
├── login.html
├── register.html
├── live.html
├── read.html
├── navigate.html
├── chatbot.html
├── settings.html
│
├── css/
│   └── style.css
│
└── js/
    ├── live.js
    ├── read.js
    ├── navigation.js
    ├── voiceControl.js
    ├── chatbot.js
    ├── sos.js
    ├── auth.js
    └── settings.js
```

Place this **SafeSteps folder** anywhere on your computer.

Example:

```
Desktop/
   SafeSteps/
```

---

# Step 2: Install a Supported Browser

SafeSteps requires a modern browser that supports advanced web APIs.

Recommended browsers:

* Google Chrome
* Microsoft Edge

These browsers are required because the application uses:

* **SpeechRecognition API** – for voice commands
* **Camera Access** – for live object detection
* **Geolocation API** – for navigation assistance
* **SpeechSynthesis API** – for voice feedback

---

# Step 3: Install Python

The Live Scene Description feature requires a **local AI server**, which runs using Python.

### Download Python

1. Visit the official Python website:

https://www.python.org/downloads/

2. Download **Python 3.10 or Python 3.11**

3. Run the installer and enable:

```
Add Python to PATH
```

4. Click **Install Now**

---

# Step 4: Verify Python Installation

Open **Command Prompt**.

Press:

```
Windows + R
```

Type:

```
cmd
```

Then run:

```
python --version
```

Expected output:

```
Python 3.10.x
```

or

```
Python 3.11.x
```

---

# Step 5: Create the AI Vision Server

Create a new folder for the AI server.

Example:

```
Desktop/
   SafeSteps_AI/
```

Inside the folder, create a Python file:

```
vision_server.py
```

Paste the AI server code inside this file.

---

# Step 6: Install Required Python Libraries

Open **Command Prompt** and navigate to the AI server folder.

Example:

```
cd Desktop\SafeSteps_AI
```

Install the required libraries using the following commands:

```
pip install flask
pip install flask-cors
pip install ultralytics
pip install pillow
pip install transformers
pip install torch torchvision
```

These libraries are used for:

| Library      | Purpose                           |
| ------------ | --------------------------------- |
| Flask        | Web server for AI API             |
| Flask-CORS   | Allows communication with browser |
| Ultralytics  | YOLO object detection model       |
| Pillow       | Image processing                  |
| Transformers | BLIP image captioning model       |
| Torch        | AI model execution                |

---

# Step 7: Start the AI Vision Server

Run the following command inside the AI server folder:

```
python vision_server.py
```

If successful, the server will start and display:

```
Running on http://127.0.0.1:5000
```

This server processes images sent from the SafeSteps website and generates scene descriptions.

---

# Step 8: Launch the SafeSteps Website

Navigate to the SafeSteps project folder and open:

```
index.html
```

The website will open in your browser.

Allow the browser permissions when prompted:

* Camera access
* Microphone access
* Location access

---

# Step 9: Using the Application

After opening the website, the following features are available:

### Live Object Detection

Uses the device camera to detect objects and analyze surroundings.

### Navigation Aid

Voice-based navigation using Google Maps.

### Document Reader

Reads printed text using OCR and converts it into speech.

### AI Assistant

Allows users to ask questions using text or voice.

### SOS Emergency Button

Sends an emergency message to a predefined contact.

---

# Important Notes

The **AI Scene Description feature requires the Flask AI server to be running**.

If the server is not running, the website will display:

```
AI server not running. Please start the local vision server.
```

Always start the server before using the **Describe Scene** feature.

---

# Technology Stack

Frontend:

* HTML
* CSS
* JavaScript
* Web Speech API
* TensorFlow.js

Backend (Local AI Server):

* Python
* Flask
* YOLOv8
* BLIP Image Captioning Model
* PyTorch


