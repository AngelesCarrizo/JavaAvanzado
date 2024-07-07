const API = 'http://localhost:3000';

const formLogIn = document.getElementById("logInForm");
const toggleLoginBtn = document.getElementById('toggle-login');


document.addEventListener("DOMContentLoaded", () => {
    const urlParams = new URLSearchParams(window.location.search);
    const nombre = urlParams.get('nombre');
    const contraseña = urlParams.get('contraseña');
    
    if (nombre && contraseña) {
        document.getElementById("nombre").value = nombre;
        document.getElementById("pass").value = contraseña;
    }
});

toggleLoginBtn.addEventListener('click', () => {
    formLogIn.style.display = 'block';
    formRegister.style.display = 'none';
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
            const redirectUrl = sessionStorage.getItem('redirectUrl') || '/filter.html';
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


