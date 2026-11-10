let children_toy = [
  {
    "id": 5,
    "name": "Water Gun",
    "price": 35,
    "description": "This is a toy water gun.",
    "image": "Product_folder/image/water_gun.jpg"
  },
  {
    "id": 6,
    "name": "F1 car",
    "price": 30,
    "description": "Replica version Formula-1 car",
    "image": "Product_folder/image/F1_car.jpg"
  },
  {
    "id": 7,
    "name": "Car",
    "price": 35,
    "description": "Remote control mini toy car",
    "image": "Product_folder/image/car.jpg"
  },
  {
    "id": 8,
    "name": "Remote control helicopter",
    "price": 45,
    "description": "This remote control helicopter with a large distance of network",
    "image": "Product_folder/image/helicopter.jpg"
  }
];
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
document.addEventListener("DOMContentLoaded", () => {

  updateCartCount();

  const childrenToyArray = document.getElementById("Children_Toy");
  if (!childrenToyArray) return;
  children_toy.forEach((element, index) => {
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
    childrenToyArray.innerHTML += productCard;
  });

  childrenToyArray.addEventListener("click", (e) => {
    if (e.target.classList.contains("add-to-cart")) {

      const index = e.target.getAttribute("data-index");
      const product = children_toy[index];

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
    }
  });

});
