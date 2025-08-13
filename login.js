document.getElementById("loginForm").addEventListener("submit", function(e) {
  e.preventDefault();

  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();
  const message = document.getElementById("message");

  // Demo credentials (replace with backend validation later)
  const demoUser = "admin";
  const demoPass = "1234";

  if(username === demoUser && password === demoPass){
    message.style.color = "green";
    message.textContent = "✅ Login successful! Redirecting...";
    setTimeout(() => {
      window.location.href = "todo.html"; // Change to your To-Do List page
    }, 1500);
  } else {
    message.style.color = "red";
    message.textContent = "❌ Incorrect username or password";
  }
});
