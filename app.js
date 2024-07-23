// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

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
const analytics = getAnalytics(app);
const auth = getAuth(app);

function executeRecaptcha(action) {
    return grecaptcha.execute('6LfSzhUqAAAAAEvB09kdQYPSlyZAhJfvqUaFF7v9', { action })
        .then(token => {
            return token;
        });
}

window.signup = function() {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    executeRecaptcha('signup').then(token => {
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                alert("User signed up: " + userCredential.user.email);
            })
            .catch((error) => {
                alert("Error: " + error.message);
            });
    }).catch(error => {
        alert("reCAPTCHA error: " + error.message);
    });
}

window.login = function() {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    executeRecaptcha('login').then(token => {
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                alert("User logged in: " + userCredential.user.email);
            })
            .catch((error) => {
                alert("Error: " + error.message);
            });
    }).catch(error => {
        alert("reCAPTCHA error: " + error.message);
    });
}

window.logout = function() {
    signOut(auth).then(() => {
        alert("User logged out");
    }).catch((error) => {
        alert("Error: " + error.message);
    });
}