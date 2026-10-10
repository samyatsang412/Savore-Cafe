document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('[data-checkout-form]');
  const summary = document.querySelector('[data-checkout-summary]');
  if (!form || !summary) return;
  const cart = Savore.getCart();
  summary.innerHTML = cart.map(item => `<li class="summary-item"><span>${item.name} x${item.quantity}</span><strong>${Savore.money(item.price * item.quantity)}</strong></li>`).join('') || '<li class="empty-state">Your cart is empty.</li>';
  document.querySelector('[data-checkout-total]').textContent = Savore.money(Savore.cartTotal());
  form.addEventListener('submit', event => {
    event.preventDefault();
    if (!cart.length) { alert('Please add an item before checking out.'); return; }
    const data = new FormData(form); const order = { id: Savore.orderNumber(), customer: data.get('fullName'), contact: data.get('contact'), email: data.get('email'), notes: data.get('notes'), payment: data.get('payment'), items: cart, total: Savore.cartTotal(), status: 'Pending', date: new Date().toISOString() };
    const orders = Savore.getOrders(); orders.push(order); Savore.writeStore(Savore.SAVORE_KEY.orders, orders); Savore.writeStore(Savore.SAVORE_KEY.cart, []); window.location.href = `tracking.html?order=${order.id}`;
  });
});
