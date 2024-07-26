document.getElementById('admin-login-form').addEventListener('submit', async (event) => {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch('http://localhost:3000/user/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ nombre: username, contraseña: password })
        });

        const data = await response.json();

        if (response.ok && username === 'alma') {
            sessionStorage.setItem('admin', 'true'); // Marca la sesión como admin
            window.location.href = 'accesoadmin.html'; 
        } else {
            document.getElementById('login-error').style.display = 'block';
        }
    } catch (error) {
        console.error('Error:', error);
        document.getElementById('login-error').style.display = 'block';
    }
});

document.getElementById('btn-back').addEventListener('click', () => {
    window.location.href = 'filter.html';
});

