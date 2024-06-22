document.addEventListener('DOMContentLoaded', () => {
    const cart = [];
    const productList = document.getElementById('product-list');
    const cartItems = document.getElementById('cart-items');
    const totalElement = document.getElementById('total');
    const checkoutButton = document.getElementById('checkout');
    const cartSection = document.getElementById('cart');
    const toggleCartButton = document.getElementById('toggle-cart');

    productList.addEventListener('click', (event) => {
        if (event.target.classList.contains('add-to-cart')) {
            const productElement = event.target.closest('.product');
            const productId = productElement.getAttribute('data-id');
            const productName = productElement.getAttribute('data-name');
            const productPrice = parseFloat(productElement.getAttribute('data-price'));

            const product = {
                id: productId,
                name: productName,
                price: productPrice,
                quantity: 1
            };

            const existingProduct = cart.find(item => item.id === product.id);
            if (existingProduct) {
                existingProduct.quantity += 1;
            } else {
                cart.push(product);
            }

            renderCart();
        }
    });

    toggleCartButton.addEventListener('click', () => {
        cartSection.classList.toggle('open');
        cartSection.classList.toggle('hidden');
    });

    checkoutButton.addEventListener('click', () => {
        if (cart.length === 0) {
            alert('El carrito está vacío.');
            return;
        }

        const orderDetails = cart.map(item => `${item.quantity} x ${item.name} - $${item.price * item.quantity}`).join('\n');
        const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
        
        alert(`Orden de Compra:\n${orderDetails}\n\nTotal: $${total}`);

        // Clear the cart
        cart.length = 0;
        renderCart();
        toggleCartButton.click();  // Close the cart
    });

    function renderCart() {
        cartItems.innerHTML = '';
        let total = 0;

        cart.forEach(product => {
            const li = document.createElement('li');
            li.textContent = `${product.quantity} x ${product.name} - $${product.price * product.quantity}`;
            cartItems.appendChild(li);

            total += product.price * product.quantity;
        });

        totalElement.textContent = total.toFixed(2);
    }
});
