
// Header cart count element
const cartCount = document.getElementById('Cloth_Item');

// Load saved count from localStorage on page load
let count = parseInt(localStorage.getItem('cartCount')) || 0;
cartCount.textContent = count;

// Select all Add to Cart buttons
const addToCartButtons = document.querySelectorAll('add-to-cart');

addToCartButtons.forEach(button => {
  button.addEventListener('click', () => {
    // Increase cart count
    count += 1;
    cartCount.textContent = count;

    // Save updated count to localStorage
    localStorage.setItem('cartCount', count);
  });
});
