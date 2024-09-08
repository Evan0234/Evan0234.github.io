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

// Initialize Firebase Authentication and Firestore
const auth = firebase.auth();
const db = firebase.firestore(); // Ensure Firestore is initialized after Firebase

// Show warning message on page load
window.onload = function() {
    alert("⚠️ WARNING ⚠️\n\nNEVER SHARE ANYTHING FROM THE TERMINAL. IF SOMEBODY ASKED YOU TO GET SOMETHING HERE, IT'S A SCAM!");
}

// Register function
function register() {
    try {
        // Get input fields
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const full_name = document.getElementById('full_name').value;
        const favourite_song = document.getElementById('favourite_song').value;
        const milk_before_cereal = document.getElementById('milk_before_cereal').value;

        // Validate input fields
        if (!validate_email(email) || !validate_password(password)) {
            throw new Error('Email or Password is Outta Line!!');
        }
        if (!validate_field(full_name) || !validate_field(favourite_song) || !validate_field(milk_before_cereal)) {
            throw new Error('One or More Extra Fields is Outta Line!!');
        }

        // Create user
        auth.createUserWithEmailAndPassword(email, password)
            .then(function(userCredential) {
                const user = userCredential.user;

                // Send verification email
                user.sendEmailVerification().then(function() {
                    alert('Verification Email Sent! Please check your inbox.');

                    // Check if the email is verified
                    auth.onAuthStateChanged(function(user) {
                        if (user) {
                            if (user.emailVerified) {
                                // Save user to Firestore
                                saveUserToFirestore(user, full_name, favourite_song, milk_before_cereal);
                            } else {
                                alert('Please verify your email before proceeding.');
                            }
                        }
                    });
                }).catch(function(error) {
                    console.error('Error while sending verification email:', error);
                    alert(error.message);
                });
            })
            .catch(function(error) {
                console.error('Error during registration:', error);
                alert(error.message);
            });
    } catch (error) {
        console.error('Error in register function:', error.message);
    }
}

// Save user data to Firestore
function saveUserToFirestore(user, full_name, favourite_song, milk_before_cereal) {
    try {
        // Add user data to Firestore with auto-generated ID
        db.collection('users').add({
            uid: user.uid,
            email: user.email,
            full_name: full_name,
            favourite_song: favourite_song,
            milk_before_cereal: milk_before_cereal,
            last_login: Date.now()
        })
        .then((docRef) => {
            console.log('Document written with ID: ', docRef.id);
            alert('User Created and Email Verified!!');
        })
        .catch((error) => {
            console.error('Error adding document: ', error);
            alert('Error creating user: ' + error.message);
        });
    } catch (error) {
        console.error('Error in saveUserToFirestore function:', error.message);
    }
}

// Login function
function login() {
    try {
        // Get input fields
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        // Validate input fields
        if (!validate_email(email) || !validate_password(password)) {
            throw new Error('Email or Password is Outta Line!!');
        }

        // Sign in the user
        auth.signInWithEmailAndPassword(email, password)
            .then(function(userCredential) {
                const user = userCredential.user;

                if (user.emailVerified) {
                    // Update last login time in Firestore
                    const userRef = db.collection('users').doc(user.uid);
                    userRef.update({
                        last_login: Date.now()
                    });

                    // Set a cookie for the login token (7 days)
                    document.cookie = "login_token=" + user.uid + "; max-age=" + 7 * 24 * 60 * 60 + "; path=/";

                    alert('User Logged In!!');
                    window.location.href = 'https://zeeps.me/dashboard';
                } else {
                    alert('Please verify your email before logging in.');
                }
            })
            .catch(function(error) {
                console.error('Error during login:', error);
                alert(error.message);
            });
    } catch (error) {
        console.error('Error in login function:', error.message);
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

// Validate other input fields
function validate_field(field) {
    return field != null && field.length > 0;
}
