// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyAjl5C7TvjmtxPc4_eno6vRMIVjciLiV04",
    authDomain: "zeeplogin.firebaseapp.com",
    projectId: "zeeplogin",
    storageBucket: "zeeplogin.appspot.com",
    messagingSenderId: "343221159933",
    appId: "1:343221159933:web:e6c3e1e7ec6161a48dfb94",
    measurementId: "G-DE7X1YKVGY"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth(); // Ensure Firebase auth is initialized
const db = firebase.firestore(); // Ensure Firestore is initialized

// Register function
function register() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Validate input fields
    if (!validate_email(email) || !validate_password(password)) {
        alert('Invalid email or password');
        return;
    }

    // Create user with email and password
    auth.createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            const user = userCredential.user;

            // Send verification email
            user.sendEmailVerification().then(() => {
                alert('Verification email sent! Please check your inbox.');
            }).catch((error) => {
                console.error('Error sending verification email:', error);
                alert(error.message);
            });

            // Redirect after successful registration or perform any action
        })
        .catch((error) => {
            console.error('Error during registration:', error);
            alert(error.message);
        });
}

// Login function
function login() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Validate input fields
    if (!validate_email(email) || !validate_password(password)) {
        alert('Invalid email or password');
        return;
    }

    // Sign in the user
    auth.signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            const user = userCredential.user;

            if (user.emailVerified) {
                // Successful login, proceed further
                alert('User Logged In!!');
                window.location.href = 'https://zeeps.me/dashboard'; // Redirect to dashboard
            } else {
                alert('Please verify your email before logging in.');
            }
        })
        .catch((error) => {
            console.error('Error during login:', error);
            alert(error.message);
        });
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
