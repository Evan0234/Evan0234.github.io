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

// Theme management
const themeToggle = document.getElementById('themeToggle');
if (themeToggle) {
    // Apply saved theme preference on page load
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        document.body.classList.add(savedTheme);
    } else {
        // Default to system preference if no saved theme
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            document.body.classList.add('dark');
        } else {
            document.body.classList.add('light');
        }
    }

    themeToggle.addEventListener('click', () => {
        const isDarkMode = document.body.classList.contains('dark');
        const newTheme = isDarkMode ? 'light' : 'dark';
        document.body.classList.remove('light', 'dark');
        document.body.classList.add(newTheme);
        localStorage.setItem('theme', newTheme);
    });
}

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
