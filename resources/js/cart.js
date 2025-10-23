
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

  // select all behavior
  selectAll.addEventListener('change', e =>{
    const checked = e.target.checked;
    cartList.querySelectorAll('.item-checkbox').forEach(cb => cb.checked = checked);
    updateSummary();
  });

  // delegate clicks inside cartList for qty buttons, delete, and item checkbox
  cartList.addEventListener('click', e =>{
    // quantity
    if (e.target.classList.contains('qty-incr') || e.target.classList.contains('qty-decr')){
      const row = e.target.closest('.cart-item');
      const qtyEl = row.querySelector('[data-qty]');
      let qty = Number(qtyEl.textContent);
      if (e.target.classList.contains('qty-incr')) qty++;
      else qty = Math.max(1, qty-1);
      qtyEl.textContent = qty;
      updateSummary();
    }

    // delete
    if (e.target.classList.contains('btn-delete')){
      const row = e.target.closest('.cart-item');
      row.remove();
      updateCounts();
      updateSummary();
    }

    // checkbox change (if clicked on checkbox itself)
    if (e.target.classList.contains('item-checkbox')){
      // keep selectAll in sync
      const all = cartList.querySelectorAll('.item-checkbox');
      const checked = cartList.querySelectorAll('.item-checkbox:checked');
      selectAll.checked = all.length === checked.length && all.length > 0;
      updateSummary();
    }
  });

  // also update when checkboxes changed by keyboard or other
  cartList.addEventListener('change', e =>{
    if (e.target.classList.contains('item-checkbox')) updateSummary();
  });

  // initial
  updateCounts();
  updateSummary();

})();
