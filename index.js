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

// Initialize Firebase Auth and Firestore
const auth = firebase.auth();
const db = firebase.firestore();

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
        const userCredential = await auth.createUserWithEmailAndPassword(email, password);
        const user = userCredential.user;
        await user.sendEmailVerification();
        alert('Verification Email Sent. Please verify your email before logging in.');

        // Log user UID and IP address to Firestore
        await db.collection('userLogs').doc(user.uid).set({
            uid: user.uid,
            email: email,
            ipAddress: ipData.ip, // Store the user's IP address
            signupTimestamp: firebase.firestore.FieldValue.serverTimestamp()
        });

        // Sign out the user to require email verification before login
        await auth.signOut();

    } catch (error) {
        console.error('Error during registration:', error);
        alert(error.message);
    }
}

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
                window.location.href = '/dashboard'; // Redirect to dashboard
            } else {
                alert('Please verify your email before logging in.');
                auth.signOut();
            }
        })
        .catch(error => {
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

// Redirect to /dashboard if already logged in
auth.onAuthStateChanged(user => {
    if (user && user.emailVerified) {
        window.location.href = '/dashboard'; // Redirect to dashboard
    }
});
