document.getElementById("loginForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
  
    // Simulate login (replace with actual backend logic)
    if (username && password) {
      alert(`Welcome, ${username}!`);
      window.location.href = "dashboard.html"; // Redirect to dashboard
    } else {
      alert("Please fill in all fields.");
    }
  });