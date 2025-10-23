document.addEventListener('DOMContentLoaded', () => {
  console.log('Hello World');

  // 
  const productPaths = ['/product1', '/product2', '/product3', '/product4'];

  const products = [
    { name: "UI/UX Design", price: "Rp 3.350.000", image: "/resources/assets/ui.png", rating: "4", deskripsi : "Tingkatkan daya tarik dan kemudahan penggunaan aplikasi atau website Anda dengan desain UI/UX yang profesional. Kami fokus pada pengalaman pengguna yang intuitif, tampilan modern, serta konsistensi visual yang memikat untuk memastikan pengguna betah berinteraksi dengan produk Anda."},
    { name: "Mobile Application", price: "Rp 7.499.000", image: "/resources/assets/app.png", rating: "5", deskripsi : "Bangun aplikasi mobile fungsional dan responsif dengan performa optimal. Layanan ini mencakup perancangan, pengembangan, dan optimalisasi aplikasi Android maupun iOS, agar bisnis Anda dapat menjangkau lebih banyak pengguna melalui pengalaman mobile yang cepat dan efisien."},
    { name: "Development", price: "Rp 5.720.000", image: "/resources/assets/develo.png", rating: "5", deskripsi : "Solusi lengkap untuk pengembangan website atau sistem berbasis digital. Kami menghadirkan kode yang bersih, performa tinggi, serta keamanan yang terjamin. Cocok untuk Anda yang membutuhkan website bisnis, sistem manajemen, hingga platform berbasis database."},
    { name: "Video Editing", price: "Rp 1.230.000", image: "/resources/assets/video_edit_card.jpg", rating: "4", deskripsi : "Buat video Anda lebih menarik, profesional, dan siap tampil di berbagai platform digital. Kami menyediakan layanan editing mulai dari pemotongan, efek visual, color grading, hingga penambahan musik dan teks untuk menghasilkan video dengan alur yang menarik dan berkesan."}
  ];

  
  products.forEach((p, i) => {
    p.url = productPaths[i] || `/product${i+1}`;
  });

  
  const container = document.getElementById("productContainer");
  if (!container) {
    console.warn('productContainer tidak ditemukan di DOM.');
    return;
  }

  const input = document.getElementById('search');
  const sugBox = document.getElementById('suggestions');
  const searchBtn = document.getElementById('searchBtn');
  const cartBadge = document.getElementById("cartCount");


  function renderProducts(list) {
    container.innerHTML = ''; //
    if (!Array.isArray(list) || list.length === 0) {
      const no = document.createElement('div');
      no.className = 'text-center text-gray-400 col-span-full p-6';
      no.innerHTML = `<p>Tidak ada produk ditemukan untuk kata kunci "<strong>${(input && input.value) ? escapeHtml(input.value) : ''}</strong>".</p>`;
      container.appendChild(no);
      return;
    }

    list.forEach(product => {
      const card = document.createElement("div");
      card.className = "product-card bg-[#0d0d0d] rounded-2xl overflow-hidden shadow-lg border border-[#00ff99]/30 hover:shadow-[0_0_15px_#00ff99]/50 transition-transform transform hover:scale-105 cursor-pointer p-0";
      card.dataset.name = product.name;
      card.dataset.price = product.price;
      card.dataset.image = product.image;
      card.dataset.url = product.url; 

      const rating = Number(product.rating) || 0;
      const stars = '★'.repeat(rating) + '☆'.repeat(5 - rating);

      card.innerHTML = `
        <img src="${product.image}" alt="${product.name}" class="w-full h-48 object-cover rounded-t-xl">
        <div class="p-4">
          <h3 class="text-lg font-semibold text-[#00ff99] mb-1">${product.name}</h3>
          <div class="flex items-center mb-2">
            <div class="flex text-yellow-400">${stars}</div>
            <span class="text-gray-400 text-sm ml-2">(0 reviews)</span>
          </div>
          <p class="text-gray-300 mb-3">${product.price}</p>
          <button class="add-to-cart w-full bg-[#00ff99] text-black font-bold py-2 rounded-lg hover:bg-[#00e68a] transition duration-300 shadow-md">
            Tambah ke Keranjang
          </button>
        </div>
      `;
      container.appendChild(card);

      
      card.addEventListener('click', (e) => {
        
        if (e.target.closest('.add-to-cart')) return;

        const url = card.dataset.url || '/';
        
        if (e.ctrlKey || e.metaKey) {
          window.open(url, '_blank');
        } else {
          window.location.href = url;
        }
      });
    });
  }

 
  function escapeHtml(unsafe) {
    return String(unsafe)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  
  renderProducts(products);

  
  let cartCount = 0;

  container.addEventListener('click', (e) => {
    const btn = e.target.closest('.add-to-cart');
    if (!btn) return;

    const card = btn.closest('.product-card');
    if (!card) return;

    cartCount++;
    if (cartBadge) cartBadge.textContent = cartCount;

    if (cartBadge) {
      cartBadge.classList.add('scale-125');
      setTimeout(() => cartBadge.classList.remove('scale-125'), 200);
    }

    try {
      const item = {
        name: card.dataset.name,
        priceText: card.dataset.price,
        image: card.dataset.image,
        qty: 1
      };
      let stored = JSON.parse(localStorage.getItem('cart_demo') || '[]');
      const existing = stored.find(x => x.name === item.name);
      if (existing) existing.qty += 1; else stored.push(item);
      localStorage.setItem('cart_demo', JSON.stringify(stored));
    } catch (err) {
      console.warn('Gagal update localStorage cart_demo', err);
    }

    const original = btn.textContent;
    btn.textContent = '✓ Ditambahkan';
    setTimeout(() => btn.textContent = original, 700);
  });

  
  function filterAndRender(query) {
    const q = (query || '').trim().toLowerCase();
    if (!q) {
      renderProducts(products);
      return;
    }
    const filtered = products.filter(p => {
     
      const name = (p.name || '').toLowerCase();
      const desc = (p.deskripsi || '').toLowerCase();
      const price = (p.price || '').toLowerCase();
      return name.includes(q) || desc.includes(q) || price.includes(q);
    });
    renderProducts(filtered);
  }

  
  if (input) {
    input.addEventListener('input', () => {
      const q = input.value;
      
      if (sugBox && typeof suggestions !== 'undefined' && Array.isArray(suggestions)) {
        const sugList = sugBox.querySelector('ul');
        const val = q.trim().toLowerCase();
        if (!val) { sugBox.classList.add('hidden'); sugList.innerHTML = ''; }
        else {
          const filteredSug = suggestions.filter(s => s.toLowerCase().includes(val)).slice(0,6);
          if (filteredSug.length === 0) { sugBox.classList.add('hidden'); sugList.innerHTML = ''; }
          else {
            sugList.innerHTML = filteredSug.map(item => `<li class="px-4 py-3 cursor-pointer hover:bg-[rgba(57,255,20,0.04)]">${escapeHtml(item)}</li>`).join('');
            sugBox.classList.remove('hidden');
            sugList.querySelectorAll('li').forEach(li => li.addEventListener('click', () => {
              input.value = li.textContent;
              sugBox.classList.add('hidden');
              filterAndRender(input.value); 
            }));
          }
        }
      }

      
      filterAndRender(q);
    });

    
    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        filterAndRender(input.value);
       
        if (sugBox) sugBox.classList.add('hidden');
      }
    });
  }


  if (searchBtn) {
    searchBtn.addEventListener('click', (e) => {
      e.preventDefault();
      if (input) filterAndRender(input.value);
      if (sugBox) sugBox.classList.add('hidden');
    });
  }

 
  if (sugBox) {
    document.addEventListener('click', (e) => {
      if (!sugBox.contains(e.target) && e.target !== input) {
        sugBox.classList.add('hidden');
      }
    });
  }

});
