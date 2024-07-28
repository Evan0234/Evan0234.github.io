import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-auth.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDKvMklNFuPJ96u1kZjb2sNsfGBu6_RoK4",
  authDomain: "zeeps-75fba.firebaseapp.com",
  projectId: "zeeps-75fba",
  storageBucket: "zeeps-75fba.appspot.com",
  messagingSenderId: "593625338479",
  appId: "1:593625338479:web:3fb257f3d8e10e0aa4f39a",
  measurementId: "G-NE32QM5B99"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

onAuthStateChanged(auth, (user) => {
  if (!user && window.location.pathname === '/dashboard') {
    window.location.href = '/login';
  }
});

document.getElementById('loginForm')?.addEventListener('submit', (e) => {
  e.preventDefault();
  const email = document.getElementById('loginEmail').value;
  const password = document.getElementById('loginPassword').value;

  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      alert("Login Successful!");
      window.location.href = '/dashboard';
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      document.getElementById('loginError').innerText = errorMessage;
    });
});

const themeToggle = document.getElementById('themeToggle');
themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark');
  document.body.classList.toggle('light');
});

// Set initial theme
if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
  document.body.classList.add('dark');
} else {
  document.body.classList.add('light');
}

// Redirection for ToS
if (window.location.pathname === '/terms' || window.location.pathname === '/term') {
  window.location.href = '/tos';
}

// Show consent modal if not on ToS or Privacy Policy pages and if not already accepted
document.addEventListener('DOMContentLoaded', function() {
  const consentModal = document.getElementById('consentModal');
  const acceptBtn = document.getElementById('acceptBtn');

  const hasAccepted = localStorage.getItem('hasAcceptedPolicies');

  if (!hasAccepted && window.location.pathname !== '/tos.html' && window.location.pathname !== '/privacy.html') {
    consentModal.style.display = 'flex';
  }

  acceptBtn.addEventListener('click', function() {
    localStorage.setItem('hasAcceptedPolicies', 'true');
    consentModal.style.display = 'none';
  });
});
