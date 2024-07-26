// historial.js

document.addEventListener("DOMContentLoaded", async () => {
    const user = JSON.parse(sessionStorage.getItem('user'));

    // Verificar si el usuario esta autorizado
    if (!user) {
        alert('Debes iniciar sesión para ver el historial de compras.');
        window.location.href = 'login.html';
        return;
    }

    //  historial de compras
    try {
        const response = await fetch('http://localhost:3000/ven/allmongo');
        if (response.ok) {
            const history = await response.json();
            renderHistory(history);
        } else {
            alert('Error al cargar el historial de compras.');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Error al cargar el historial de compras.');
    }
});

function renderHistory(history) {
    const historyList = document.getElementById('history-list');
    historyList.innerHTML = '';

    history.forEach(order => {
        const orderItem = document.createElement('div');
        orderItem.className = 'order-item';
        orderItem.innerHTML = `
            <h2>Fecha: ${new Date(order.createdAt).toLocaleDateString()}</h2>
            <h3>Productos:</h3>
            ${order.productos.map(product => `
                <div class="product-item">
                    <p>Nombre: ${product.nombre}</p>
                    <p>Descripción: ${product.desc}</p>
                    <p>Precio: $${product.precio}</p>
                </div>
            `).join('')}
        `;
        historyList.appendChild(orderItem);
    });
}

document.getElementById('btn-back').addEventListener('click', () => {
    window.location.href = 'filter.html';
});


document.addEventListener('DOMContentLoaded', async () => {
    const history = await fetchPurchaseHistory();
    renderHistory(history);

    document.getElementById('btn-logout').addEventListener('click', () => {
        sessionStorage.removeItem('user');
        window.location.href = 'login.html';
    });

    document.getElementById('btn-admin').addEventListener('click', () => {
        window.location.href = 'admin.html';
    });
});

