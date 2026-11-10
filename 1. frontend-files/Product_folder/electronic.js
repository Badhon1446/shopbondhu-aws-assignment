let electronic = [
  { 
    "id": 1, 
    "name": "iPhone", 
    "price": 550, 
    "description": "iPhone 16 Pro Max. New model.", 
    "image": "Product_folder/image/Iphone.jpg"
  },
  { 
    "id": 2,
    "name": "HP Laptop", 
    "price": 3900,
    "description": "HP core i5 11Gen.", 
    "image": "Product_folder/image/HP_Laptop.jpg"
  },
  { 
    "id": 3,
    "name": "SSD", 
    "price": 800,
    "description": "New lunch 512GB SSD card", 
    "image": "Product_folder/image/ssd.jpg" 
  },
  { 
    "id": 4, 
    "name": "Camera", 
    "price": 1450, 
    "description": "Digital camera for traveling and photography", 
    "image": "Product_folder/image/camera.avif" 
  }
];

console.log('electronic');

function getCart() {
  return JSON.parse(localStorage.getItem("cart")) || [];
}

function saveCart(cart) {
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
}

function updateCartCount() {
  const cartCount = document.getElementById("cart-count");
  if (!cartCount) return;

  let cart = getCart();
  let total = cart.reduce((sum, item) => sum + item.quantity, 0);
  cartCount.textContent = total;
}

document.addEventListener('DOMContentLoaded', () => {

  updateCartCount();

  const electronicArray = document.getElementById('Electronic');

  
  electronic.forEach((element, index) => {
    const productCard = `
      <div class="bg-white rounded-2xl shadow hover:shadow-xl transition overflow-hidden">
        <img src="${element.image}" class="w-full h-48 object-cover" />
        <div class="p-5">
          <h3 class="text-lg font-semibold">${element.name}</h3>
          <p class="text-sm text-gray-500 mt-1">${element.description}</p>
          <div class="flex justify-between items-center mt-4">
            <span class="text-xl font-bold text-indigo-600">$${element.price}</span>
            <button 
              class="add-to-cart bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition"
              data-index="${index}">
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    `;
    electronicArray.innerHTML += productCard;
  });

  
  electronicArray.addEventListener('click', (e) => {
    const button = e.target.closest('.add-to-cart');
    if (!button) return;

    const index = button.getAttribute('data-index');
    const product = electronic[index];

    let cart = getCart();
    let existing = cart.find(item => item.id === product.id);

    if (existing) {
      existing.quantity += 1;
    } else {
      cart.push({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        quantity: 1
      });
    }

    saveCart(cart);
  });

});
