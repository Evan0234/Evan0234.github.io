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
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

// Set session persistence
auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL)
    .catch(error => {
        console.error("Error setting persistence:", error);
    });

// Login function
function login() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    if (!validate_email(email) || !validate_password(password)) {
        alert('Invalid email or password!');
        return;
    }

    auth.signInWithEmailAndPassword(email, password)
        .then(userCredential => {
            const user = userCredential.user;
            if (user.emailVerified) {
                window.location.href = '/dashboard';
            } else {
                alert('Please verify your email before logging in.');
                auth.signOut();
            }
        })
        .catch(error => {
            console.error("Error during login:", error);
            alert(error.message);
        });
}

// Register function
function register() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    if (!validate_email(email) || !validate_password(password)) {
        alert('Invalid email or password!');
        return;
    }

    auth.createUserWithEmailAndPassword(email, password)
        .then(userCredential => {
            const user = userCredential.user;
            user.sendEmailVerification()
                .then(() => {
                    alert('Verification Email Sent. Please verify your email before logging in.');
                });
        })
        .catch(error => {
            console.error("Error during registration:", error);
            alert(error.message);
        });
}

// Helper functions
function validate_email(email) {
    const expression = /^[^@]+@\w+(\.\w+)+\w$/;
    return expression.test(email);
}

function validate_password(password) {
    return password.length >= 6;
}

// Redirect only if logged in and email is verified
auth.onAuthStateChanged(user => {
    const currentPath = window.location.pathname;
    if (user && user.emailVerified && currentPath === '/login') {
        window.location.href = '/dashboard';
    } else if ((!user || !user.emailVerified) && currentPath === '/dashboard') {
        window.location.href = '/login';
    }
});
