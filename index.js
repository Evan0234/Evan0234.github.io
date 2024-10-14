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

// Initialize Firestore
const db = firebase.firestore(); // Firestore must be initialized after Firebase

// Initialize Firebase Auth
const auth = firebase.auth(); // Firebase Auth must be initialized after Firebase

// Register function
async function register() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    if (!validate_email(email) || !validate_password(password)) {
        alert('Invalid email or password!');
        return;
    }

    try {
        // Get user's IP address and additional information
        const ipResponse = await fetch('http://ip-api.com/json/?fields=status,message,country,countryCode,region,regionName,city,zip,lat,lon,timezone,isp,org,as,proxy,query');
        const ipData = await ipResponse.json();

        // Log IP data to the console
        console.log("User's IP Address Data:", ipData);

        // Check if the API response status is 'success'
        if (ipData.status !== 'success') {
            throw new Error(ipData.message || 'Failed to get IP address data');
        }

        // Create user and send email verification
        const userCredential = await auth.createUserWithEmailAndPassword(email, password);
        const user = userCredential.user;
        await user.sendEmailVerification();
        alert('Verification Email Sent. Please verify your email before logging in.');

        // Log user UID and all IP data to Firestore
        await db.collection('userLogs').doc(user.uid).set({
            uid: user.uid,
            email: email,
            ipData: ipData, // Store entire IP data object
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
