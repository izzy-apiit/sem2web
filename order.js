document.addEventListener("DOMContentLoaded", function () {
    // Retrieve cart items from localStorage
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

    // Get the cart items container
    const cartItemsContainer = document.getElementById('cart-items');

    // Get the total price container
    const totalPriceContainer = document.getElementById('total-price');

    let total = 0;

    // Loop through cart items and add them to the order summary
    cartItems.forEach(item => {
        const li = document.createElement('li');
        li.textContent = `${item.product} - Rs.${item.price} x ${item.quantity}`;
        cartItemsContainer.appendChild(li);

        // Calculate the total price
        total += item.price * item.quantity;
    });

    // Update the total price
    totalPriceContainer.textContent = `Rs.${total.toFixed(2)}`;
});

//Add fovourites to order
document.getElementById('buy-favourites-btn').addEventListener('click', function() {
    const favouriteCart = JSON.parse(localStorage.getItem('favouriteCart')) || [];
    if (favouriteCart.length === 0) {
        alert('No favourite items saved.');
        return;
    }
    
    // Retrieve the current cart items
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    
    // Combine current cart with favourites
    const combinedCart = [...cartItems, ...favouriteCart];
    
    // Update localStorage with the combined cart
    localStorage.setItem('cartItems', JSON.stringify(combinedCart));
    alert('Favourite items added to your order!');
});


document.getElementById('payment-form').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const paymentOption = document.getElementById('payment-option').value;
    
    if (paymentOption === 'card') {
        const cardNumber = document.getElementById('card-number').value.trim();
        const expiryDate = document.getElementById('expiry-date').value.trim();
        const cvv = document.getElementById('cvv').value.trim();

        // Basic validation
        if (!cardNumber || !expiryDate || !cvv) {
            alert('Please fill out all card details.');
            return;
        }
    }

    // If validation passes, proceed with the payment processing.
    const deliveryDate = new Date();
    deliveryDate.setDate(deliveryDate.getDate() + 3); // Assuming 3 days for delivery
    alert(`Your payment is successful! Delivery date is ${deliveryDate.toDateString()}.`);

    // Optionally, you can submit the form data here if needed, e.g., sending it to a server.
});
