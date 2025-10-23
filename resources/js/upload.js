const form = document.getElementById("uploadForm");
const pesan = document.getElementById("pesan");

form.addEventListener("submit", (e) => {
    e.preventDefault();

    // Ambil data dari form
    const nama = document.getElementById("nama").value;
    const harga = document.getElementById("harga").value;
    const deskripsi = document.getElementById("deskripsi").value;

    if (nama && harga && deskripsi) {
    pesan.classList.remove("hidden");
    form.reset();

    // Sembunyikan pesan setelah 3 detik
    setTimeout(() => {
        pesan.classList.add("hidden");
    }, 3000);
    }
});