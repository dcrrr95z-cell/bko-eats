// ==================== DATA ==================== 
const restaurants = [
  {
    id: 1,
    name: "Le Nido",
    emoji: "🍝",
    rating: 4.8,
    reviews: 234,
    deliveryTime: "25-35 min",
    deliveryFee: 500,
    minOrder: 2000,
    menu: [
      { id: 1, name: "Pasta Carbonara", price: 4500, emoji: "🍝" },
      { id: 2, name: "Pizza Margherita", price: 5000, emoji: "🍕" },
      { id: 3, name: "Salade Méditerranée", price: 3500, emoji: "🥗" },
      { id: 4, name: "Tiramisu", price: 2000, emoji: "🍰" },
    ]
  },
  {
    id: 2,
    name: "Grill Palace",
    emoji: "🍗",
    rating: 4.6,
    reviews: 456,
    deliveryTime: "20-30 min",
    deliveryFee: 400,
    minOrder: 1500,
    menu: [
      { id: 5, name: "Poulet Grillé", price: 4000, emoji: "🍗" },
      { id: 6, name: "Côtes Levées", price: 6500, emoji: "🍖" },
      { id: 7, name: "Brochettes", price: 3000, emoji: "🍢" },
      { id: 8, name: "Frites Maison", price: 1500, emoji: "🍟" },
    ]
  },
  {
    id: 3,
    name: "Saveurs d'Asie",
    emoji: "🍜",
    rating: 4.7,
    reviews: 389,
    deliveryTime: "30-40 min",
    deliveryFee: 500,
    minOrder: 2500,
    menu: [
      { id: 9, name: "Pad Thaï", price: 4500, emoji: "🍜" },
      { id: 10, name: "Rouleau Printemps", price: 3500, emoji: "🌯" },
      { id: 11, name: "Riz Sauté", price: 4000, emoji: "🍚" },
      { id: 12, name: "Soupe Miso", price: 2500, emoji: "🥢" },
    ]
  },
  {
    id: 4,
    name: "Burger Station",
    emoji: "🍔",
    rating: 4.5,
    reviews: 567,
    deliveryTime: "15-25 min",
    deliveryFee: 300,
    minOrder: 1000,
    menu: [
      { id: 13, name: "Burger Classique", price: 3500, emoji: "🍔" },
      { id: 14, name: "Double Cheese", price: 4500, emoji: "🧀" },
      { id: 15, name: "Sandwich Poulet", price: 3000, emoji: "🥪" },
      { id: 16, name: "Milkshake", price: 2000, emoji: "🥤" },
    ]
  },
  {
    id: 5,
    name: "Mali Kitchen",
    emoji: "🥘",
    rating: 4.9,
    reviews: 234,
    deliveryTime: "25-35 min",
    deliveryFee: 400,
    minOrder: 1500,
    menu: [
      { id: 17, name: "Riz Sauce Arachide", price: 3000, emoji: "🥘" },
      { id: 18, name: "Couscous Mouton", price: 4500, emoji: "🍲" },
      { id: 19, name: "Sauce Feuilles", price: 3500, emoji: "🥬" },
      { id: 20, name: "Boulettes Sauce", price: 3000, emoji: "🍖" },
    ]
  },
  {
    id: 6,
    name: "Café Verde",
    emoji: "☕",
    rating: 4.4,
    reviews: 178,
    deliveryTime: "10-15 min",
    deliveryFee: 200,
    minOrder: 500,
    menu: [
      { id: 21, name: "Cappuccino", price: 1500, emoji: "☕" },
      { id: 22, name: "Croissant", price: 1200, emoji: "🥐" },
      { id: 23, name: "Sandwich Jambon", price: 2000, emoji: "🥪" },
      { id: 24, name: "Donut", price: 1000, emoji: "🍩" },
    ]
  }
];

const categories = [
  { id: 1, name: "Tous", emoji: "🍽" },
  { id: 2, name: "Rapide", emoji: "⚡" },
  { id: 3, name: "Sain", emoji: "🥗" },
  { id: 4, name: "Asiatique", emoji: "🍜" },
  { id: 5, name: "Viande", emoji: "🍗" },
  { id: 6, name: "Desserts", emoji: "🍰" },
];

// ==================== STATE ==================== 
let cart = JSON.parse(localStorage.getItem('cart')) || [];
let user = JSON.parse(localStorage.getItem('user')) || null;
let orderHistory = JSON.parse(localStorage.getItem('orderHistory')) || [];

// ==================== DOM ELEMENTS ==================== 
const restaurantList = document.getElementById('restaurantList');
const cartPanel = document.getElementById('cartPanel');
const cartItems = document.getElementById('cartItems');
const openCartBtn = document.getElementById('openCart');
const closeCartBtn = document.getElementById('closeCart');
const cartCount = document.getElementById('cartCount');
const subtotal = document.getElementById('subtotal');
const delivery = document.getElementById('delivery');
const total = document.getElementById('total');
const checkoutButton = document.getElementById('checkoutButton');
const authButton = document.getElementById('authButton');
const authModal = document.getElementById('authModal');
const closeAuthModal = document.getElementById('closeAuthModal');
const authForm = document.getElementById('authForm');
const orderModal = document.getElementById('orderModal');
const closeModal = document.getElementById('closeModal');
const categoryRow = document.getElementById('categoryRow');
const resetButton = document.getElementById('resetButton');
const searchInput = document.getElementById('searchInput');
const paymentForm = document.getElementById('paymentForm');
const cartNotice = document.getElementById('cartNotice');

// ==================== INIT ==================== 
document.addEventListener('DOMContentLoaded', () => {
  renderRestaurants();
  renderCategories();
  updateCart();
  setupEventListeners();
  updateAuthButton();
});

// ==================== EVENT LISTENERS ==================== 
function setupEventListeners() {
  openCartBtn.addEventListener('click', () => cartPanel.classList.add('active'));
  closeCartBtn.addEventListener('click', () => cartPanel.classList.remove('active'));
  checkoutButton.addEventListener('click', handleCheckout);
  authButton.addEventListener('click', openAuthModal);
  closeAuthModal.addEventListener('click', () => authModal.classList.remove('active'));
  closeModal.addEventListener('click', () => orderModal.classList.remove('active'));
  authForm.addEventListener('submit', handleAuthSubmit);
  resetButton.addEventListener('click', () => renderRestaurants(restaurants));
  searchInput.addEventListener('input', handleSearch);

  document.addEventListener('click', (e) => {
    if (e.target.closest('.add-to-cart-btn')) {
      const btn = e.target.closest('.add-to-cart-btn');
      const { restaurantId, itemId } = btn.dataset;
      addToCart(Number(restaurantId), Number(itemId));
    }
  });
}

// ==================== RENDER RESTAURANTS ==================== 
function renderRestaurants(items = restaurants) {
  restaurantList.innerHTML = items
    .map((restaurant) => `
      <div class="restaurant-card">
        <div class="restaurant-image">${restaurant.emoji}</div>
        <div class="restaurant-content">
          <div class="restaurant-header">
            <h3 class="restaurant-name">${restaurant.name}</h3>
            <span class="restaurant-rating">★ ${restaurant.rating}</span>
          </div>
          <p class="restaurant-info">${restaurant.reviews} avis • ${restaurant.minOrder} FCFA min</p>
          <div class="restaurant-footer">
            <span class="restaurant-time">⏱ ${restaurant.deliveryTime}</span>
            <span class="restaurant-delivery">${restaurant.deliveryFee} FCFA</span>
          </div>
        </div>
        <div style="padding: 12px 16px; border-top: 1px solid var(--border-light); width: 100%;">
          <button class="primary-button" style="margin: 0; width: 100%; padding: 10px;" onclick="expandRestaurant(${restaurant.id})">
            Voir le menu
          </button>
        </div>
      </div>
    `)
    .join('');
}

// ==================== EXPAND RESTAURANT ==================== 
function expandRestaurant(restaurantId) {
  const restaurant = restaurants.find((r) => r.id === restaurantId);
  if (!restaurant) return;

  const menuHTML = restaurant.menu
    .map((item) => `
      <div class="menu-item" style="
        padding: 12px;
        background: var(--surface);
        border-radius: var(--radius-md);
        margin-bottom: 8px;
        display: flex;
        justify-content: space-between;
        align-items: center;
      ">
        <div>
          <div style="font-weight: 600; margin-bottom: 4px;">${item.emoji} ${item.name}</div>
          <div style="font-size: 13px; color: var(--primary);">${item.price} FCFA</div>
        </div>
        <button class="add-to-cart-btn primary-button" data-restaurant-id="${restaurantId}" data-item-id="${item.id}" style="
          width: auto;
          padding: 8px 16px;
          margin: 0;
          font-size: 13px;
        ">
          Ajouter
        </button>
      </div>
    `)
    .join('');

  alert(`${restaurant.name}\n\nCliquez sur les boutons Ajouter pour ajouter les articles à votre panier.\n\n${menuHTML}`);
}

// ==================== ADD TO CART ==================== 
function addToCart(restaurantId, itemId) {
  const restaurant = restaurants.find((r) => r.id === restaurantId);
  const item = restaurant.menu.find((i) => i.id === itemId);

  const existingItem = cart.find(
    (c) => c.restaurantId === restaurantId && c.itemId === itemId
  );

  if (existingItem) {
    existingItem.quantity++;
  } else {
    cart.push({
      restaurantId,
      itemId,
      quantity: 1,
      name: item.name,
      price: item.price,
      emoji: item.emoji,
      restaurantName: restaurant.name,
    });
  }

  saveCart();
  updateCart();
  showNotification(`${item.name} ajouté au panier`);
}

// ==================== UPDATE CART ==================== 
function updateCart() {
  // Update count
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  cartCount.textContent = totalItems;

  // Update items
  cartItems.innerHTML =
    cart.length === 0
      ? '<div style="text-align: center; padding: 40px 20px; color: var(--text-tertiary);">Votre panier est vide</div>'
      : cart
          .map((item, index) => `
            <div class="cart-item">
              <div class="cart-item-image">${item.emoji}</div>
              <div class="cart-item-content">
                <div class="cart-item-name">${item.name}</div>
                <div class="cart-item-price">${item.price} FCFA</div>
                <div class="cart-item-controls">
                  <button class="quantity-button" onclick="updateQuantity(${index}, -1)">−</button>
                  <span class="quantity-display">${item.quantity}</span>
                  <button class="quantity-button" onclick="updateQuantity(${index}, 1)">+</button>
                </div>
              </div>
              <button class="remove-button" onclick="removeFromCart(${index})">✕</button>
            </div>
          `)
          .join('');

  // Calculate totals
  const subtotalAmount = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const deliveryFee = cart.length > 0 ? 1000 : 0;
  const totalAmount = subtotalAmount + deliveryFee;

  subtotal.textContent = `${subtotalAmount} FCFA`;
  delivery.textContent = `${deliveryFee} FCFA`;
  total.textContent = `${totalAmount} FCFA`;

  // Check minimum order
  const minOrder = 2000;
  if (cart.length > 0 && subtotalAmount < minOrder) {
    cartNotice.textContent = `Commande minimum: ${minOrder} FCFA`;
    cartNotice.style.color = 'var(--text-tertiary)';
    checkoutButton.disabled = true;
  } else {
    cartNotice.textContent = '';
    checkoutButton.disabled = false;
  }

  saveCart();
}

// ==================== UPDATE QUANTITY ==================== 
function updateQuantity(index, delta) {
  cart[index].quantity += delta;
  if (cart[index].quantity <= 0) {
    removeFromCart(index);
  } else {
    updateCart();
  }
}

// ==================== REMOVE FROM CART ==================== 
function removeFromCart(index) {
  cart.splice(index, 1);
  updateCart();
}

// ==================== HANDLE CHECKOUT ==================== 
function handleCheckout() {
  if (!user) {
    openAuthModal();
    return;
  }

  const deliveryAddress = document.getElementById('deliveryAddress').value.trim();
  const deliveryPhone = document.getElementById('deliveryPhone').value.trim();
  const paymentMethod = document.getElementById('paymentMethod').value;

  if (!deliveryAddress || !deliveryPhone) {
    alert('Veuillez remplir l\'adresse et le téléphone');
    return;
  }

  // Create order
  const order = {
    id: Date.now(),
    items: [...cart],
    subtotal: cart.reduce((sum, item) => sum + item.price * item.quantity, 0),
    delivery: 1000,
    total: cart.reduce((sum, item) => sum + item.price * item.quantity, 0) + 1000,
    user: user.name,
    address: deliveryAddress,
    phone: deliveryPhone,
    paymentMethod,
    createdAt: new Date().toLocaleString('fr-FR'),
    status: 'En préparation',
  };

  orderHistory.push(order);
  localStorage.setItem('orderHistory', JSON.stringify(orderHistory));

  // Show success modal
  orderModal.classList.add('active');

  // Clear cart
  cart = [];
  saveCart();
  updateCart();
  cartPanel.classList.remove('active');

  // Reset form
  paymentForm.reset();
}

// ==================== AUTH ==================== 
function openAuthModal() {
  authModal.classList.add('active');
  if (user) {
    document.getElementById('authStatus').textContent = `Connecté en tant que ${user.name}`;
    document.getElementById('orderHistory').innerHTML = orderHistory
      .map(
        (order) => `
        <div class="order-item">
          <strong>${order.id}</strong> - ${order.createdAt}
          <br />
          ${order.items.map((i) => `${i.name} (${i.quantity})`).join(', ')}
          <br />
          Total: ${order.total} FCFA
        </div>
      `
      )
      .join('');
  }
}

function handleAuthSubmit(e) {
  e.preventDefault();

  user = {
    name: document.getElementById('authName').value,
    phone: document.getElementById('authPhone').value,
    address: document.getElementById('authAddress').value,
  };

  localStorage.setItem('user', JSON.stringify(user));
  updateAuthButton();
  authModal.classList.remove('active');
  authForm.reset();

  showNotification('Compte créé avec succès');
}

function updateAuthButton() {
  if (user) {
    authButton.textContent = user.name.substring(0, 2).toUpperCase();
    authButton.style.background = 'linear-gradient(135deg, var(--primary) 0%, var(--primary-light) 100%)';
    authButton.style.color = 'white';
  }
}

// ==================== SEARCH ==================== 
function handleSearch(e) {
  const query = e.target.value.toLowerCase();
  const filtered = restaurants.filter((r) =>
    r.name.toLowerCase().includes(query) ||
    r.menu.some((m) => m.name.toLowerCase().includes(query))
  );
  renderRestaurants(query ? filtered : restaurants);
}

// ==================== CATEGORIES ==================== 
function renderCategories() {
  categoryRow.innerHTML = categories
    .map(
      (cat) => `
      <button class="category-badge ${cat.id === 1 ? 'active' : ''}" onclick="filterByCategory(${cat.id})">
        ${cat.emoji} ${cat.name}
      </button>
    `
    )
    .join('');
}

function filterByCategory(catId) {
  document.querySelectorAll('.category-badge').forEach((btn) => {
    btn.classList.remove('active');
  });
  event.target.classList.add('active');

  // For demo, just show all restaurants
  renderRestaurants();
}

// ==================== UTILITIES ==================== 
function showNotification(message) {
  const notification = document.createElement('div');
  notification.textContent = message;
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background: var(--primary);
    color: white;
    padding: 12px 20px;
    border-radius: var(--radius-md);
    box-shadow: var(--shadow-md);
    z-index: 999;
    animation: slideIn 0.3s ease-out;
  `;
  document.body.appendChild(notification);

  setTimeout(() => notification.remove(), 3000);
}

function saveCart() {
  localStorage.setItem('cart', JSON.stringify(cart));
}
