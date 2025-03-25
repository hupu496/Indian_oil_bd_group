// Login form submission
document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("loginForm")

  if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
      e.preventDefault()

      const username = document.getElementById("username").value
      const password = document.getElementById("password").value

      // Simple validation
      if (username && password) {
        // In a real application, you would send this data to a server for authentication
        // For this demo, we'll just redirect to the dashboard
        window.location.href = "dashboard.html"
      } else {
        alert("Please enter both username and password")
      }
    })
  }
})

