// Import the functions you need from the SDKs
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.20.0/firebase-app.js";
import { getAuth, GoogleAuthProvider } from "https://www.gstatic.com/firebasejs/9.20.0/firebase-auth.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCQmJdktws4jVY0hRVTMYpmzDzme08lAZw",
  authDomain: "zeepsme.firebaseapp.com",
  projectId: "zeepsme",
  storageBucket: "zeepsme.appspot.com",
  messagingSenderId: "710976896969",
  appId: "1:710976896969:web:d7e6f92b2c06974deaf218",
  measurementId: "G-5QSENX1ZMD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider };

