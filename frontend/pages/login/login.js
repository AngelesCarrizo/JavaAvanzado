const API = 'http://localhost:3000';

const formLogIn = document.getElementById("logInForm");
const startShoppingBtn = document.getElementById('start-shopping');
const logoutBtn = document.getElementById('logout');
const adminBtn = document.getElementById('admin');
const error = document.getElementById("error");

document.addEventListener("DOMContentLoaded", () => {
    const urlParams = new URLSearchParams(window.location.search);
    const nombre = urlParams.get('nombre');
    const contraseña = urlParams.get('contraseña');
    
    if (nombre && contraseña) {
        document.getElementById("nombre").value = nombre;
        document.getElementById("pass").value = contraseña;
    }
});

startShoppingBtn.addEventListener('click', () => {
    window.location.href = "filter.html";  
});

logoutBtn.addEventListener('click', () => {
    sessionStorage.removeItem('user');
    localStorage.removeItem('cart');  // Limpia el carrito
    window.location.href = "index.html"; 
});

adminBtn.addEventListener('click', () => {
    window.location.href = "admin.html";  
});

formLogIn.addEventListener('submit', async (e) => {
    e.preventDefault();
    await logIn();
});

const logIn = async () => {
    const nombre = document.getElementById("nombre").value;
    const contraseña = document.getElementById("pass").value;

    try {
        const res = await fetch(`${API}/user/login`, {
            method: 'POST',
            body: JSON.stringify({ nombre, contraseña }),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const data = await res.json();

        if (data.token) {
            console.log(data);
            sessionStorage.setItem('user', JSON.stringify(data));
            const redirectUrl = sessionStorage.getItem('redirectUrl') || 'filter.html';
            sessionStorage.removeItem('redirectUrl');
            window.location.href = redirectUrl;
            
        } else {
            error.textContent = "Error al encontrar al usuario 🫠";
        }
    } catch (err) {
        console.error('Error:', err);
        error.textContent = "Error al comunicarse con el servidor 🫠";
    }
};



