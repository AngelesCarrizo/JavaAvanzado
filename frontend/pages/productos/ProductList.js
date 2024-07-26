import { addToCart, renderCart } from '../carrito/carrito.js';

async function fetchProducts() {
    const response = await fetch('http://localhost:3000/prod/allprod');
    if (!response.ok) throw new Error('Error al obtener productos');
    return await response.json();
}

function renderProducts(products) {
    const productList = document.getElementById('product-list');
    productList.innerHTML = '';
    products.forEach(product => {
        const productItem = document.createElement('div');
        productItem.className = 'product-item';
        productItem.innerHTML = `
            <img src="${product.imagen}" alt="${product.nombre}">
            <h2>${product.nombre}</h2>
            <p>${product.desc}</p>
            <p>Precio: $${product.precio}</p>
            <p>Stock: ${product.stock}</p>
            <button class="add-to-cart" data-id="${product._id}">Agregar al carrito</button>
        `;
        productList.appendChild(productItem);
    });

    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', async (event) => {
            const id = event.target.getAttribute('data-id');
            await addToCart(id);
        });
    });
}

document.addEventListener('DOMContentLoaded', async () => {
    try {
        const products = await fetchProducts();
        renderProducts(products);

        document.getElementById('view-cart').addEventListener('click', () => {
            renderCart();
            document.getElementById('cart').style.display = 'block';
        });

        document.getElementById('close-cart').addEventListener('click', () => {
            document.getElementById('cart').style.display = 'none';
        });

        document.getElementById('buy-cart').addEventListener('click', () => {
            const user = JSON.parse(sessionStorage.getItem('user'));
            if (user) {
                const direccion = prompt('Ingrese su dirección de envío:');
                if (direccion) {
                    finalizarCompra(direccion);
                } else {
                    alert('La dirección es requerida para realizar la compra.');
                }
            } else {
                alert('Debes iniciar sesión para comprar');
                window.location.href = './login.html';
            }
        });

        document.getElementById('view-history').addEventListener('click', () => {
            const user = JSON.parse(sessionStorage.getItem('user'));
            if (!user || !user.token) {
                sessionStorage.setItem('redirectUrl', '/history.html');
                window.location.href = './login.html';
            } else {
                window.location.href = './historial.html';
            }
        });
    } catch (error) {
        console.error('Error:', error);
    }
});





