document.addEventListener('DOMContentLoaded', () => {
  const target = document.querySelector('[data-tracking]'); if (!target) return;
  const orders = Savore.getOrders(); const requested = new URLSearchParams(location.search).get('order'); const order = orders.find(item => item.id === requested) || orders[orders.length - 1];
  if (!order) { target.innerHTML = '<div class="empty-state"><h2>No order to track yet.</h2><a class="btn btn-green" href="menu.html">Start an order</a></div>'; return; }
  const statuses = ['Pending', 'Preparing', 'Ready', 'Completed']; const current = statuses.indexOf(order.status);
  document.querySelector('[data-order-id]').textContent = order.id; document.querySelector('[data-customer]').textContent = order.customer; document.querySelector('[data-order-date]').textContent = Savore.formatDate(order.date); document.querySelector('[data-order-total]').textContent = Savore.money(order.total); document.querySelector('[data-current-status]').textContent = order.status;
  document.querySelector('[data-tracking-items]').innerHTML = order.items.map(item => `<li class="summary-item"><span>${item.name} x${item.quantity}</span><strong>${Savore.money(item.price * item.quantity)}</strong></li>`).join('');
  document.querySelectorAll('[data-status-step]').forEach((step, index) => { if (index <= current) step.classList.add(index === current ? 'current' : 'done'); });
});
