const products = [
    { id: 1, name: 'Producto 1', price: 100 },
    { id: 2, name: 'Producto 2', price: 200 },
    { id: 3, name: 'Producto 3', price: 300 },
];

const cart = [];

document.addEventListener('DOMContentLoaded', () => {
    const productList = document.querySelector('.product-list');
    const cartItems = document.querySelector('.cart-items');
    const generateOrderButton = document.getElementById('generate-order');
    const orderSummary = document.querySelector('.order-summary');

    // Renderizar lista de productos
    products.forEach(product => {
        const productDiv = document.createElement('div');
        productDiv.className = 'product';
        productDiv.innerHTML = `
            <h3>${product.name}</h3>
            <p>Precio: $${product.price}</p>
            <button onclick="addToCart(${product.id})">Agregar al Carrito</button>
        `;
        productList.appendChild(productDiv);
    });

    // Función para agregar productos al carrito
    window.addToCart = (productId) => {
        const product = products.find(p => p.id === productId);
        cart.push(product);
        renderCart();
    };

    // Función para renderizar el carrito
    const renderCart = () => {
        cartItems.innerHTML = '';
        cart.forEach(item => {
            const cartItem = document.createElement('li');
            cartItem.textContent = `${item.name} - $${item.price}`;
            cartItems.appendChild(cartItem);
        });
    };

    // Generar orden de compra
    generateOrderButton.addEventListener('click', () => {
        if (cart.length === 0) {
            alert('El carrito está vacío');
            return;
        }
        const orderTotal = cart.reduce((total, item) => total + item.price, 0);
        orderSummary.innerHTML = `<h3>Resumen de la Orden</h3>
                                  <p>Total: $${orderTotal}</p>`;
    });
});
