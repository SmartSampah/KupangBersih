let map = L.map('map').setView([-10.1772, 123.6070], 13);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

function kirimLaporan() {
  const desc = document.getElementById("desc").value;
  const alamat = document.getElementById("alamat").value;
  const file = document.getElementById("foto").files[0];

  if (!desc || !alamat || !file) {
    alert("Semua data harus diisi termasuk foto.");
    return;
  }

  const reader = new FileReader();
  reader.onloadend = function() {
    fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${alamat}`)
      .then(res => res.json())
      .then(data => {
        if (data.length > 0) {
          const lat = data[0].lat, lon = data[0].lon;
          const laporan = {
            desc, alamat, lat, lon,
            waktu: new Date().toLocaleString(),
            user: localStorage.getItem("username"),
            foto: reader.result
          };
          let all = JSON.parse(localStorage.getItem("laporan") || "[]");
          all.push(laporan);
          localStorage.setItem("laporan", JSON.stringify(all));
          alert("Laporan terkirim!");
          location.reload();
        } else alert("Alamat tidak ditemukan.");
      });
  };
  reader.readAsDataURL(file);
}

function loadLaporan() {
  const list = document.getElementById("laporanList") || document.getElementById("riwayatList");
  if (!list) return;
  let all = JSON.parse(localStorage.getItem("laporan") || "[]");
  const role = localStorage.getItem("role");
  if (role === "petugas") {
    const user = localStorage.getItem("username");
    all = all.filter(l => l.user === user);
  }
  all.forEach(l => {
    const li = document.createElement("li");
    li.innerHTML = `<b>${l.desc}</b><br>${l.alamat} - ${l.waktu}<br><img src="${l.foto}" width="100">`;
    list.appendChild(li);
    L.marker([l.lat, l.lon]).addTo(map).bindPopup(l.desc);
  });
}
window.onload = function() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('service-worker.js');
  }
  loadLaporan();
};