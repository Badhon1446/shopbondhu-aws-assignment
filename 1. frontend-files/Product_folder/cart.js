function getCart() {
  return JSON.parse(localStorage.getItem("cart")) || [];
}

function saveCart(cart) {
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
  renderCartItems();
}

function updateCartCount() {
  const cartCount = document.getElementById("cart-count");
  if (!cartCount) return;

  let cart = getCart();
  let totalQty = cart.reduce((sum, item) => sum + item.quantity, 0);
  cartCount.textContent = totalQty;
}
function renderCartItems() {
  const cartItemsContainer = document.getElementById("cartItems");
  if (!cartItemsContainer) return;

  let cart = getCart();
  cartItemsContainer.innerHTML = "";

  cart.forEach(item => {
    cartItemsContainer.innerHTML += `
      <div class="flex items-center gap-4 py-4 border-b">
        <img src="${item.image}" class="w-20 h-20 object-cover rounded">

        <div class="flex-1">
          <h3 class="font-semibold">${item.name}</h3>
          <p class="text-sm text-gray-500">$${item.price}</p>

          <div class="flex items-center gap-3 mt-2">
            <button onclick="changeQty(${item.id}, -1)"
              class="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300">−</button>

            <span class="font-semibold">${item.quantity}</span>

            <button onclick="changeQty(${item.id}, 1)"
              class="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300">+</button>
          </div>
        </div>

        <div class="font-semibold">
          $${item.price * item.quantity}
        </div>
      </div>
    `;
  });
}

function changeQty(id, value) {
  let cart = getCart();
  let item = cart.find(p => p.id === id);
  if (!item) return;

  item.quantity += value;

  if (item.quantity <= 0) {
    cart = cart.filter(p => p.id !== id);
  }

  saveCart(cart);
}
function clearCart() {
  localStorage.removeItem("cart");
  localStorage.setItem("cartCount", 0);
  updateCartCount(); 
  renderCartItems(); 
}

function calculateTotal(cart) {
  return cart.reduce((total, item) => total + item.price * item.quantity, 0);
}

document.getElementById("checkoutBtn").addEventListener("click", () => {
  const cart = getCart();
  const totalBill = calculateTotal(cart);
  document.getElementById("total").textContent = "Total Bill: $" + totalBill;
});


//promo function
document.getElementById("applyPromo").addEventListener("click", () => {
  const promoCode = document.getElementById("promoCode").value.trim();
  const cart = getCart();
  let totalBill = calculateTotal(cart);

  if (promoCode === "ostad10") {
    totalBill = totalBill * 0.9;
    alert("Promo code applied! 10% discount.");
  }else if(promoCode === "ostad50"){
    totalBill = totalBill * 0.5;
    alert("Promo code applied! 50% discount.");
  }else {
    alert("Invalid promo code.");
  }

  document.getElementById("total").textContent = "Total Bill: $" + totalBill;
});

document.addEventListener("DOMContentLoaded", () => {
  updateCartCount();
  renderCartItems();
});
