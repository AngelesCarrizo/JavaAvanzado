import { API } from './api.js';

async function fetchProducts() {
    const response = await fetch(`${API}/prod/allprod`);
    const products = await response.json();
    return products;
}

function renderProducts(productos) {
    const productList = document.getElementById('listaprod');
    productList.innerHTML = '';
    productos.forEach(productos => {
        const productItem = document.createElement('div');
        productItem.className = 'product-item';
        productItem.innerHTML = `
            <img src="${productos.imagen}" alt="${productos.nombre}">
            <h2>${productos.nombre}</h2>
            <p>${productos.desc}</p>
            <p>Precio: ${productos.precio}</p>
            <p>Stock: ${productos.stock}</p>
            <button class="add-to-cart" data-id="${productos.id}">Agregar al carrito</button>
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

async function addToCart(id) {
    const user = JSON.parse(sessionStorage.getItem('user'));
    if (!user) {
        alert('Debes iniciar sesión para agregar productos al carrito');
        window.location.href = 'login.html';
        return;
    }

    try {
        const response = await fetch(`${API}/prod/agregar`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`,
            },
            body: JSON.stringify({ id: parseInt(id, 10) }),
        });

        if (response.ok) {
            const productos = await response.json();
            let cart = JSON.parse(localStorage.getItem('carro')) || [];
            const productInCart = cart.find(item => item.id === productos.id);
            if (productInCart) {
                productInCart.quantity += 1;
            } else {
                cart.push({ ...productos, quantity: 1 });
            }
            localStorage.setItem('carro', JSON.stringify(cart));
            alert('Producto agregado al carrito');
        } else {
            alert('Error al agregar el producto al carrito');
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

async function createOrder() {
    const user = JSON.parse(sessionStorage.getItem('user'));
    if (!user) {
        alert('Debes iniciar sesión para realizar una compra');
        window.location.href = 'login.html';
        return;
    }

    const cart = JSON.parse(localStorage.getItem('carro')) || [];
    if (cart.length === 0) {
        alert('El carrito está vacío');
        return;
    }

    const direccion = prompt('Ingrese su dirección de envío:');

    if (!direccion) {
        alert('La dirección es requerida');
        return;
    }

    const productos = cart.map(item => ({
        id: item.id,
        cantidad: item.quantity,
        precio: item.precio
    }));

    const order = { direccion, productos };

    try {
        const response = await fetch(`${API}/ven/nueva`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`,
            },
            body: JSON.stringify(order),
        });

        if (response.ok) {
            localStorage.removeItem('carro');
            alert('Orden creada con éxito');
        } else {
            alert('Error al crear la orden');
        }
    } catch (error) {
        console.error('Error:', error);
    }
}


document.addEventListener('DOMContentLoaded', async () => {
    const productos = await fetchProducts();
    renderProducts(productos);

    document.getElementById('cajacarrito').addEventListener('click', () => {
        const cart = JSON.parse(localStorage.getItem('carro')) || [];
        const cartList = document.getElementById('cart-list');
        cartList.innerHTML = '';

        if (cart.length === 0) {
            cartList.innerHTML = '<p>El carrito está vacío.</p>';
        } else {
            let total = 0;
            cart.forEach(item => {
                const cartItem = document.createElement('div');
                cartItem.className = 'cart-item';
                cartItem.innerHTML = `
                    <h3>${item.nombre}</h3>
                    <p>Cantidad: ${item.quantity}</p>
                    <p>Precio Unitario: ${item.precio}</p>
                    <p>Subtotal: ${item.precio * item.quantity}</p>
                `;
                total += item.precio * item.quantity;
                cartList.appendChild(cartItem);
            });

            const cartTotal = document.getElementById('totalcarrito');
            cartTotal.innerHTML = `<h3>Total: ${total}</h3>`;
        }

        document.getElementById('carro').style.display = 'block';
    });

    document.getElementById('comprarcarrito').addEventListener('click', createOrder);
});
document.getElementById('buy-button').addEventListener('click', () => {
    sessionStorage.setItem('redirectUrl', window.location.href);
    window.location.href = '/login.html';
});



