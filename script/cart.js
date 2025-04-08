// Cart Page Functionality
document.addEventListener('DOMContentLoaded', () => {
    const cartItems = document.querySelector('.cart-items');
    const cartTotal = document.querySelector('.cart-total');
    const checkoutButton = document.querySelector('.checkout-btn');
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Display cart items
    function displayCartItems() {
        if (cart.length === 0) {
            cartItems.innerHTML = '<p class="empty-cart">Your cart is empty</p>';
            cartTotal.textContent = '$0.00';
            checkoutButton.disabled = true;
            return;
        }

        cartItems.innerHTML = '';
        let total = 0;

        cart.forEach((item, index) => {
            const price = parseFloat(item.price.replace('$', ''));
            const itemTotal = price * item.quantity;
            total += itemTotal;

            const cartItem = document.createElement('div');
            cartItem.className = 'cart-item';
            cartItem.innerHTML = `
                <div class="item-info">
                    <h3>${item.name}</h3>
                    <p class="price">${item.price}</p>
                </div>
                <div class="item-quantity">
                    <button class="decrease">-</button>
                    <span>${item.quantity}</span>
                    <button class="increase">+</button>
                </div>
                <div class="item-total">
                    <p>$${itemTotal.toFixed(2)}</p>
                </div>
                <button class="remove-item">×</button>
            `;

            // Add event listeners for quantity buttons
            const decreaseBtn = cartItem.querySelector('.decrease');
            const increaseBtn = cartItem.querySelector('.increase');
            const removeBtn = cartItem.querySelector('.remove-item');
            const quantitySpan = cartItem.querySelector('.item-quantity span');

            decreaseBtn.addEventListener('click', () => {
                if (item.quantity > 1) {
                    item.quantity--;
                    quantitySpan.textContent = item.quantity;
                    updateCart();
                }
            });

            increaseBtn.addEventListener('click', () => {
                item.quantity++;
                quantitySpan.textContent = item.quantity;
                updateCart();
            });

            removeBtn.addEventListener('click', () => {
                cart.splice(index, 1);
                updateCart();
            });

            cartItems.appendChild(cartItem);
        });

        cartTotal.textContent = `$${total.toFixed(2)}`;
        checkoutButton.disabled = false;
    }

    // Update cart in localStorage and refresh display
    function updateCart() {
        localStorage.setItem('cart', JSON.stringify(cart));
        displayCartItems();
    }

    // Checkout functionality
    checkoutButton.addEventListener('click', () => {
        // Show loading state
        checkoutButton.textContent = 'Processing...';
        checkoutButton.disabled = true;

        // Simulate checkout process
        setTimeout(() => {
            // Clear cart
            cart = [];
            localStorage.removeItem('cart');

            // Show success message
            const successMessage = document.createElement('div');
            successMessage.className = 'success-message';
            successMessage.textContent = 'Order placed successfully!';
            document.body.appendChild(successMessage);

            // Reset button
            checkoutButton.textContent = 'Proceed to Checkout';
            checkoutButton.disabled = true;

            // Update cart display
            displayCartItems();

            // Remove success message after 3 seconds
            setTimeout(() => {
                successMessage.remove();
            }, 3000);
        }, 1500);
    });

    // Initialize cart display
    displayCartItems();

    // Add smooth animations
    const cartItemElements = document.querySelectorAll('.cart-item');
    cartItemElements.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateX(-20px)';
        item.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
        
        setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'translateX(0)';
        }, index * 100);
    });
}); 