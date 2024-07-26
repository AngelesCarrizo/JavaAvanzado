document.addEventListener('DOMContentLoaded', () => {
    // Logout
    document.getElementById('logout').addEventListener('click', () => {
        sessionStorage.removeItem('admin');
        window.location.href = 'filter.html'; // Redirige a la página de inicio
    });

    // Verifica si el usuario autorizado
    const user = JSON.parse(sessionStorage.getItem('user'));
    if (!user || user.nombre !== 'alma') {
        sessionStorage.removeItem('admin');
        window.location.href = 'accesoadmin.html'; 
        return;
    }
});


// Crear producto
document.getElementById('create-product-form').addEventListener('submit', async (event) => {
    event.preventDefault();
    
    const categoria = document.getElementById('create-categoria').value;
    const nombre = document.getElementById('create-nombre').value;
    const desc = document.getElementById('create-desc').value;
    const precio = document.getElementById('create-precio').value;
    const imagen = document.getElementById('create-imagen').value;
    const stock = document.getElementById('create-stock').value;

    const product = { categoria, nombre, desc, precio, imagen, stock };

    try {
        const response = await fetch('http://localhost:3000/prod/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(product)
        });

        if (response.ok) {
            alert('Producto creado con éxito');
        } else {
            document.getElementById('create-error').style.display = 'block';
        }
    } catch (error) {
        console.error('Error:', error);
        document.getElementById('create-error').style.display = 'block';
    }
});

// Modificar producto
document.getElementById('update-product-form').addEventListener('submit', async (event) => {
    event.preventDefault();
    
    const id = document.getElementById('update-id').value;
    const nombre = document.getElementById('update-nombre').value;
    const desc = document.getElementById('update-desc').value;
    const precio = document.getElementById('update-precio').value;
    const imagen = document.getElementById('update-imagen').value;
    const stock = document.getElementById('update-stock').value;

    const product = { nombre, desc, precio, imagen, stock };

    try {
        const response = await fetch(`http://localhost:3000/prod/updateByName/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(product)
        });

        if (response.ok) {
            alert('Producto modificado con éxito');
        } else {
            document.getElementById('update-error').style.display = 'block';
        }
    } catch (error) {
        console.error('Error:', error);
        document.getElementById('update-error').style.display = 'block';
    }
});


// Eliminar producto
document.getElementById('delete-product-form').addEventListener('submit', async (event) => {
    event.preventDefault();
    
    const id = document.getElementById('delete-id').value;

    try {
        const response = await fetch(`http://localhost:3000/prod/deleteById/${id}`, {
            method: 'DELETE'
        });

        if (response.ok) {
            alert('Producto eliminado con éxito');
        } else {
            document.getElementById('delete-error').style.display = 'block';
        }
    } catch (error) {
        console.error('Error:', error);
        document.getElementById('delete-error').style.display = 'block';
    }
});

