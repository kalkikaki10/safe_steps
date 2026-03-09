// REGISTER USER
function registerUser(){

const name = document.getElementById("name").value;
const email = document.getElementById("email").value;
const password = document.getElementById("password").value;

if(!name || !email || !password){
alert("Please fill all fields");
return;
}

const user = {
name: name,
email: email,
password: password
};

localStorage.setItem("safestepsUser", JSON.stringify(user));

alert("Registration successful!");

window.location.href="login.html";
}



// LOGIN USER
function loginUser(){

const email = document.getElementById("loginUser").value;
const password = document.getElementById("loginPass").value;

const savedUser = JSON.parse(localStorage.getItem("safestepsUser"));

if(!savedUser){
alert("No user found. Please register first.");
return;
}

if(email === savedUser.email && password === savedUser.password){

localStorage.setItem("loggedIn","true");

window.location.href="index.html";

}
else{
document.getElementById("error").innerText="Invalid credentials";
}

}