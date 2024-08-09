// Initialize cart items
let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

// Function to update the cart UI
function updateCartUI() {
    const cartBody = document.getElementById('cart-body');
    const totalPriceElement = document.getElementById('total-price');
    cartBody.innerHTML = ''; // Clear current cart items
    let totalPrice = 0;

    cartItems.forEach(item => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${item.product}</td>
            <td>${item.quantity}</td>
            <td>Rs.${item.price * item.quantity}</td>
        `;
        cartBody.appendChild(row);
        totalPrice += item.price * item.quantity;
    });

    totalPriceElement.textContent = `Rs.${totalPrice.toFixed(2)}`;
}

// Function to handle adding to cart
function addToCart(product, price, quantity) {
    const existingItem = cartItems.find(item => item.product === product);

    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cartItems.push({ product, price, quantity });
    }

    // Save updated cart to localStorage
    localStorage.setItem('cartItems', JSON.stringify(cartItems));

    // Update the cart UI
    updateCartUI();
}

// Set event listeners for "Add to Cart" buttons
document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', function() {
        const product = this.getAttribute('data-product');
        const price = parseFloat(this.getAttribute('data-price'));
        const quantityInput = this.previousElementSibling;
        const quantity = parseInt(quantityInput.value);

        addToCart(product, price, quantity);
    });
});

//Add cart to favourites
document.getElementById('add-to-favourites-btn').addEventListener('click', function() {
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    localStorage.setItem('favouriteCart', JSON.stringify(cartItems));
    alert('Items added to favourites!');
});

// Initialize the cart UI on page load
document.addEventListener('DOMContentLoaded', updateCartUI);

// Buy Now button logic
document.getElementById('buynow').addEventListener('click', function() {
    window.location.href = 'order.html';
});
