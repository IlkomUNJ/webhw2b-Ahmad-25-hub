const form = document.getElementById("uploadForm");
const pesan = document.getElementById("pesan");

form.addEventListener("submit", (e) => {
    e.preventDefault();

    
    const nama = document.getElementById("nama").value;
    const harga = document.getElementById("harga").value;
    const deskripsi = document.getElementById("deskripsi").value;

    if (nama && harga && deskripsi) {
    pesan.classList.remove("hidden");
    form.reset();

    
    setTimeout(() => {
        pesan.classList.add("hidden");
    }, 3000);
    }
});