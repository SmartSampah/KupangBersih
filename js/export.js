function exportCSV() {
  const laporan = JSON.parse(localStorage.getItem("laporan") || "[]");
  const header = "Deskripsi,Alamat,Lat,Lon,Waktu,User\n";
  const rows = laporan.map(l => [l.desc, l.alamat, l.lat, l.lon, l.waktu, l.user].join(",")).join("\n");
  const csv = header + rows;
  const blob = new Blob([csv], {type: "text/csv"});
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = "laporan.csv";
  a.click();
}