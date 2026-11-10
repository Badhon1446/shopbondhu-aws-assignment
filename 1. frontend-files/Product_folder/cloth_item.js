let cloth_item = [
  {
    "id":9,
    "name": "Shirt",
    "price": 50,
    "description": "Men Orginal check T-Shirt",
    "image": "Product_folder/image/Shirt.jpg"
  },
  {
    "id":10,
    "name": "Panjabi",
    "price": 39,
    "description": "Panjabi callorfull avabaile",
    "image": "Product_folder/image/panjabe.jpeg"
  },
  {
    "id":11,
    "name": "Sharee",
    "price": 80,
    "description": "Shahjadpur's orginal tati sharee",
    "image": "Product_folder/image/sharee.jpg"
  },
  {
    "id":12,
    "name": "Couple Sharee and Panjabi",
    "price": 180,
    "description": "Capule matching sharee and panjabi for wedding and cultural function.",
    "image": "Product_folder/image/couple sharee and panjabi.jpg"
  }
]

console.log(cloth_item)

function getCart() {
  return JSON.parse(localStorage.getItem("cart")) || []
}

function saveCart(cart) {
  localStorage.setItem("cart", JSON.stringify(cart))
  updateCartCount()
}

function updateCartCount() {
  const cartCount = document.getElementById("cart-count")
  if (!cartCount) return

  let cart = getCart()
  let total = cart.reduce((sum, item) => sum + item.quantity, 0)
  cartCount.textContent = total
}

document.addEventListener('DOMContentLoaded', () => {

  updateCartCount()

  const clothItemArray = document.getElementById('Cloth_Item')
  if (!clothItemArray) return

  
  cloth_item.forEach((element, index) => {
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
    `
    clothItemArray.innerHTML += productCard
  })

  
  clothItemArray.addEventListener('click', (e) => {
    const button = e.target.closest('.add-to-cart')
    if (!button) return

    const index = button.getAttribute('data-index')
    const product = cloth_item[index]

    let cart = getCart()
    let existing = cart.find(item => item.id === product.id)

    if (existing) {
      existing.quantity += 1
    } else {
      cart.push({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        quantity: 1
      })
    }

    saveCart(cart)
  })

})
