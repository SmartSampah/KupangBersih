function login() {
  const u = document.getElementById("username").value;
  const p = document.getElementById("password").value;
  if (u === "admin" && p === "admin123") {
    localStorage.setItem("role", "admin");
    window.location.href = "dashboard-admin.html";
  } else if (u === "petugas" && p === "petugas123") {
    localStorage.setItem("role", "petugas");
    localStorage.setItem("username", u);
    window.location.href = "dashboard-petugas.html";
  } else {
    alert("Login gagal");
  }
}