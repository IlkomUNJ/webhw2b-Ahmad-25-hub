(function(){
  const selectAll = document.getElementById('selectAll');
  const cartList = document.getElementById('cartList');
  const totalPriceEl = document.getElementById('totalPrice');
  const countItemsEl = document.getElementById('countItems');

  function formatRp(n){
    if (n === 0) return '-';
    return 'Rp' + n.toLocaleString('id-ID');
  }

  function updateCounts(){
    const items = cartList.querySelectorAll('.cart-item');
    countItemsEl.textContent = items.length;
  }

  function updateSummary(){
    const rows = cartList.querySelectorAll('.cart-item');
    let total = 0;
    rows.forEach(r =>{
      const checkbox = r.querySelector('.item-checkbox');
      if (checkbox.checked){
        const price = Number(r.getAttribute('data-price')) || 0;
        const qty = Number(r.querySelector('[data-qty]').textContent) || 0;
        total += price * qty;
      }
    });
    totalPriceEl.textContent = total ? formatRp(total) : '-';
  }


  selectAll.addEventListener('change', e =>{
    const checked = e.target.checked;
    cartList.querySelectorAll('.item-checkbox').forEach(cb => cb.checked = checked);
    updateSummary();
  });

  
  cartList.addEventListener('click', e =>{
   
    if (e.target.classList.contains('qty-incr') || e.target.classList.contains('qty-decr')){
      const row = e.target.closest('.cart-item');
      const qtyEl = row.querySelector('[data-qty]');
      let qty = Number(qtyEl.textContent);
      if (e.target.classList.contains('qty-incr')) qty++;
      else qty = Math.max(1, qty-1);
      qtyEl.textContent = qty;
      updateSummary();
    }

   
    if (e.target.classList.contains('btn-delete')){
      const row = e.target.closest('.cart-item');
      row.remove();
      updateCounts();
      updateSummary();
    }

    
    if (e.target.classList.contains('item-checkbox')){
      
      const all = cartList.querySelectorAll('.item-checkbox');
      const checked = cartList.querySelectorAll('.item-checkbox:checked');
      selectAll.checked = all.length === checked.length && all.length > 0;
      updateSummary();
    }
  });

  
  cartList.addEventListener('change', e =>{
    if (e.target.classList.contains('item-checkbox')) updateSummary();
  });

  
  updateCounts();
  updateSummary();

})();
