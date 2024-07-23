import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-auth.js";

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

document.getElementById('loginForm').addEventListener('submit', (e) => {
  e.preventDefault();
  const email = document.getElementById('loginEmail').value;
  const password = document.getElementById('loginPassword').value;
  const recaptchaResponse = grecaptcha.getResponse();

  if (recaptchaResponse.length === 0) {
    document.getElementById('loginError').innerText = "Please complete the reCAPTCHA";
    return;
  }

  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      alert("Login Successful!");
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      document.getElementById('loginError').innerText = errorMessage;
    });
});
