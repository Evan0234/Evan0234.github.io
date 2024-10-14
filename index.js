// Import Firebase functions
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-auth.js";
import { getFirestore, doc, setDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-firestore.js";

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAjl5C7TvjmtxPc4_eno6vRMIVjciLiV04",
    authDomain: "zeeplogin.firebaseapp.com",
    projectId: "zeeplogin",
    storageBucket: "zeeplogin.appspot.com",
    messagingSenderId: "343221159933",
    appId: "1:343221159933:web:e6c3e1e7ec6161a48dfb94",
    measurementId: "G-DE7X1YKVGY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Auth and Firestore
const auth = getAuth(app);
const db = getFirestore(app);

// Register function
async function register() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    if (!validate_email(email) || !validate_password(password)) {
        alert('Invalid email or password!');
        return;
    }

    try {
        // Get user's IP address
        const ipResponse = await fetch('https://api64.ipify.org?format=json');
        const ipData = await ipResponse.json();

        // Log the user's IP address
        console.log("User's IP Address:", ipData.ip);

        // Create user and send email verification
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        await user.sendEmailVerification();
        alert('Verification Email Sent. Please verify your email before logging in.');

        // Log user UID and IP address to Firestore
        await setDoc(doc(db, "userLogs", user.uid), {
            uid: user.uid,
            email: email,
            ipAddress: ipData.ip, // Store the user's IP address
            signupTimestamp: serverTimestamp(),
            country: ipData.country,
            region: ipData.region,
            city: ipData.city,
            zip: ipData.zip,
            lat: ipData.lat,
            lon: ipData.lon,
            timezone: ipData.timezone,
            isp: ipData.isp,
            org: ipData.org,
            as: ipData.as,
            proxy: ipData.proxy
        });

        // Sign out the user to require email verification before login
        await auth.signOut();

    } catch (error) {
        console.error('Error during registration:', error);
        alert(error.message);
    }
}

// Login function
async function login() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    if (!validate_email(email) || !validate_password(password)) {
        alert('Invalid email or password!');
        return;
    }

    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        if (user.emailVerified) {
            window.location.href = '/dashboard'; // Redirect to dashboard
        } else {
            alert('Please verify your email before logging in.');
            await auth.signOut();
        }
    } catch (error) {
        console.error('Error during login:', error);
        alert(error.message);
    }
}

// Validate email format
function validate_email(email) {
    const expression = /^[^@]+@\w+(\.\w+)+\w$/;
    return expression.test(email);
}

// Validate password length
function validate_password(password) {
    return password.length >= 6;
}

// Redirect to /dashboard if already logged in
onAuthStateChanged(auth, user => {
    if (user && user.emailVerified) {
        window.location.href = '/dashboard'; // Redirect to dashboard
    }
});
