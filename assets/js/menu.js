document.addEventListener('DOMContentLoaded', () => {
  const grid = document.querySelector('[data-product-grid]');
  if (!grid) return;
  const filters = document.querySelectorAll('[data-filter]');
  const search = document.querySelector('[data-menu-search]');
  const result = document.querySelector('[data-menu-result]');
  let activeFilter = 'All';
  function render() {
    const query = search?.value.trim().toLowerCase() || '';
    const products = Savore.getProducts().filter(product => {
      const matchesCategory = activeFilter === 'All' || product.category === activeFilter;
      const searchable = `${product.name} ${product.category} ${product.description}`.toLowerCase();
      return matchesCategory && searchable.includes(query);
    });
    if (result) result.textContent = `${products.length} ${products.length === 1 ? 'item' : 'items'} on the menu`;
    grid.innerHTML = products.map(product => `
      <article class="product-card ${product.available ? '' : 'sold-out'}">
        <img class="product-image" src="${product.image}" alt="${product.name}">
        <div class="product-info">
          <div class="eyebrow">${product.category}</div>
          <h3>${product.name}</h3>
          <p>${product.description}</p>
          <div class="product-meta"><span class="price">${Savore.money(product.price)}</span><span class="availability ${product.available ? '' : 'off'}">${product.available ? '✓ Available' : '✕ Sold out'}</span></div>
          <button class="btn btn-green add-product-btn" data-add="${product.id}" ${product.available ? '' : 'disabled'}>${product.available ? '+ Add to cart' : 'Sold out'}</button>
        </div>
      </article>`).join('') || '<div class="empty-state">No products match that search. Try another dish or category.</div>';
    grid.querySelectorAll('[data-add]').forEach(button => button.addEventListener('click', () => Savore.addToCart(button.dataset.add)));
  }
  filters.forEach(button => button.addEventListener('click', () => { filters.forEach(item => item.classList.remove('active')); button.classList.add('active'); activeFilter = button.dataset.filter; render(); }));
  search?.addEventListener('input', render);
  render();
});
