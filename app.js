import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyDKvMklNFuPJ96u1kZjb2sNsfGBu6_RoK4",
  authDomain: "zeeps-75fba.firebaseapp.com",
  projectId: "zeeps-75fba",
  storageBucket: "zeeps-75fba.appspot.com",
  messagingSenderId: "593625338479",
  appId: "1:593625338479:web:3fb257f3d8e10e0aa4f39a",
  measurementId: "G-NE32QM5B99"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

onAuthStateChanged(auth, (user) => {
    const bannedIPs = ["123.456.789.0", "987.654.321.0"];
    fetch("https://api.ipify.org?format=json")
        .then(response => response.json())
        .then(data => {
            if (bannedIPs.includes(data.ip)) {
                window.location.href = "/banned";
            }
        });

    if (!user && window.location.pathname === '/dashboard') {
        window.location.href = '/login';
    } else if (user && window.location.pathname === '/dashboard.html') {
        window.location.href = '/dashboard';
    }
});

document.getElementById('loginForm')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            alert("Login Successful!");
            window.location.href = '/dashboard';
        })
        .catch((error) => {
            const errorMessage = error.message;
            document.getElementById('loginError').innerText = errorMessage;
        });
});

const themeToggle = document.getElementById('themeToggle');
if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark');
        document.body.classList.toggle('light');
    });

    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        document.body.classList.add('dark');
    } else {
        document.body.classList.add('light');
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const emailForm = document.getElementById('emailForm');
    const responseMessage = document.getElementById('responseMessage');

    if (emailForm) {
        emailForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const email = document.getElementById('email').value;

            try {
                const response = await fetch('/send-email', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ email })
                });

                if (response.ok) {
                    responseMessage.textContent = 'u got the email 😊 👍';
                } else {
                    responseMessage.textContent = 'Failed to send email.';
                }
            } catch (error) {
                responseMessage.textContent = 'An error occurred.';
            }
        });
    }
});
