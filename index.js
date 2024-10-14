// Your Firebase config
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
const db = firebase.firestore();

// Register function
window.register = function() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    if (!validate_email(email) || !validate_password(password)) {
        alert('Invalid email or password!');
        return;
    }

    auth.createUserWithEmailAndPassword(email, password)
        .then(userCredential => {
            const user = userCredential.user;

            // Fetch IP address and log it
            fetch('https://api64.ipify.org?format=json')
                .then(response => response.json())
                .then(data => {
                    const ipAddress = data.ip;
                    console.log("User's IP Address:", ipAddress);

                    // Log the user UID and IP address in Firestore
                    db.collection('users').add({
                        uid: user.uid,
                        ip: ipAddress,
                        timestamp: new Date(),
                    }).then(() => {
                        alert('Registration successful!');
                    }).catch(error => {
                        console.error('Error logging IP and UID:', error);
                    });
                })
                .catch(error => {
                    console.error('Error fetching IP address:', error);
                });
        })
        .catch(error => {
            console.error('Error during registration:', error);
            alert(error.message);
        });
};

// Login function
window.login = function() {
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
                alert('Login Successful!');
                // Redirect to the correct subdomain dashboard
                window.location.href = 'https://zeeps.me/dashboard';
            } else {
                alert('Please verify your email before logging in.');
                // Sign out the user if email is not verified
                auth.signOut();
            }
        })
        .catch(error => {
            console.error('Error during login:', error);
            alert(error.message);
        });
};

// Validate email format
function validate_email(email) {
    const expression = /^[^@]+@\w+(\.\w+)+\w$/;
    return expression.test(email);
}

// Validate password length
function validate_password(password) {
    return password.length >= 6;
}

// Redirect to dashboard if already logged in
auth.onAuthStateChanged(user => {
    if (user) {
        if (user.emailVerified) {
            window.location.href = 'https://zeeps.me/dashboard';
        } else {
            // If email is not verified, sign them out
            auth.signOut();
        }
    }
});
