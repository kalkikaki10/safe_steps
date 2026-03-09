// Common Login Credentials
const USER_EMAIL = "admin@safesteps.com";
const USER_PHONE = "9999999999";
const PASSWORD = "123456";

function loginUser(){

const username = document.getElementById("username").value.trim();
const password = document.getElementById("password").value.trim();
const errorMsg = document.getElementById("errorMsg");

if(
(username === USER_EMAIL || username === USER_PHONE)
&& password === PASSWORD
){
localStorage.setItem("loggedIn","true");

alert("Login successful!");

window.location.href = "index.html";
}
else{
errorMsg.innerText = "Invalid login credentials";
}

}