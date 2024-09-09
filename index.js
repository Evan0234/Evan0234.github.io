// Firebase configuration
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

// Initialize Firebase Authentication and Firestore
const auth = firebase.auth();
const db = firebase.firestore(); // Initialize Firestore

// Register function
function register() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const favourite_song = document.getElementById('favourite_song').value;
    const milk_before_cereal = document.getElementById('milk_before_cereal').value;

    auth.createUserWithEmailAndPassword(email, password)
        .then(function(userCredential) {
            const user = userCredential.user;

            // Send verification email
            user.sendEmailVerification().then(function() {
                alert('Verification Email Sent! Please check your inbox.');

                // Save user to Firestore after verification
                db.collection('users').doc(user.uid).set({
                    email: user.email,
                    favourite_song: favourite_song,
                    milk_before_cereal: milk_before_cereal,
                    last_login: Date.now()
                })
                .then(() => {
                    alert('User data saved to Firestore!');
                })
                .catch(error => {
                    console.error('Error saving user data: ', error);
                });
            });
        })
        .catch(function(error) {
            console.error('Error during registration: ', error);
        });
}

// Login function
function login() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    auth.signInWithEmailAndPassword(email, password)
        .then(function(userCredential) {
            const user = userCredential.user;

            // Check email verification
            if (user.emailVerified) {
                alert('User logged in!');
                // Update last login time in Firestore
                db.collection('users').doc(user.uid).update({
                    last_login: Date.now()
                });
            } else {
                alert('Please verify your email before logging in.');
            }
        })
        .catch(function(error) {
            console.error('Error during login: ', error);
        });
}
