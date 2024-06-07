import { API } from "./api.js";

const formLogIn = document.getElementById("logInForm");
const error = document.getElementById("error");

document.addEventListener("DOMContentLoaded", () => {
    const urlParams = new URLSearchParams(window.location.search);
    const nombre = urlParams.get('nombre');
    const pass = urlParams.get('pass');
    
    if (nombre && pass) {
        document.getElementById("nombre").value = nombre;
        document.getElementById("pass").value = pass;
    }
});

formLogIn.addEventListener('submit', async (e) => {
    e.preventDefault();
    await logIn();
});

const logIn = async () => {
    const nombre = document.getElementById("nombre").value;
    const pass = document.getElementById("pass").value;

    try {
        const res = await fetch(`${API}/user/login`, {
            method: 'POST',
            body: JSON.stringify({ nombre, pass }),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const data = await res.json();

        if (data.status) {
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
