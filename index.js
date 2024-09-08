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

// Initialize Firebase Authentication and Database
const auth = firebase.auth();
const database = firebase.database();

// Show warning message on page load
window.onload = function() {
    alert("⚠️ WARNING ⚠️\n\nNEVER SHARE ANYTHING FROM THE TERMINAL. IF SOMEBODY ASKED YOU TO GET SOMETHING HERE, IT'S A SCAM!");
}

// Set up the register function
function register() {
    // Get input fields
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const full_name = document.getElementById('full_name').value;
    const favourite_song = document.getElementById('favourite_song').value;
    const milk_before_cereal = document.getElementById('milk_before_cereal').value;

    // Validate input fields
    if (!validate_email(email) || !validate_password(password)) {
        alert('Email or Password is Outta Line!!');
        return;
    }
    if (!validate_field(full_name) || !validate_field(favourite_song) || !validate_field(milk_before_cereal)) {
        alert('One or More Extra Fields is Outta Line!!');
        return;
    }

    // Create user
    auth.createUserWithEmailAndPassword(email, password)
        .then(function() {
            var user = auth.currentUser;

            // Send verification email
            user.sendEmailVerification().then(function() {
                alert('Verification Email Sent! Please check your inbox.');

                // Check if the email is verified
                auth.onAuthStateChanged(function(user) {
                    if (user) {
                        if (user.emailVerified) {
                            // Save user to database
                            saveUserToDatabase(user, full_name, favourite_song, milk_before_cereal);
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
            // Handle Firebase errors
            var error_message = error.message;
            alert(error_message);
        });
}

// Function to save user data to Firebase Database
function saveUserToDatabase(user, full_name, favourite_song, milk_before_cereal) {
    var database_ref = database.ref();

    // Create user data object
    var user_data = {
        email: user.email,
        full_name: full_name,
        favourite_song: favourite_song,
        milk_before_cereal: milk_before_cereal,
        last_login: Date.now()
    };

    // Push user data to Firebase Database
    database_ref.child('users/' + user.uid).set(user_data);
    alert('User Created and Email Verified!!');
}

// Set up the login function
function login() {
    // Get input fields
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Validate input fields
    if (!validate_email(email) || !validate_password(password)) {
        alert('Email or Password is Outta Line!!');
        return;
    }

    // Log in the user
    auth.signInWithEmailAndPassword(email, password)
        .then(function() {
            var user = auth.currentUser;

            if (user.emailVerified) {
                // User is verified, log in
                var database_ref = database.ref();

                // Update user login timestamp
                var user_data = {
                    last_login: Date.now()
                };

                // Push to Firebase Database
                database_ref.child('users/' + user.uid).update(user_data);

                // Set a cookie for the login token (7 days)
                document.cookie = "login_token=" + user.uid + "; max-age=" + 7 * 24 * 60 * 60 + "; path=/";

                alert('User Logged In!!');
                window.location.href = 'https://zeeps.me/dashboard';
            } else {
                alert('Please verify your email before logging in.');
            }
        })
        .catch(function(error) {
            var error_message = error.message;
            alert(error_message);
        });
}

// Function to validate email
function validate_email(email) {
    const expression = /^[^@]+@\w+(\.\w+)+\w$/;
    return expression.test(email);
}

// Function to validate password
function validate_password(password) {
    return password.length >= 6;
}

// Function to validate other input fields
function validate_field(field) {
    return field != null && field.length > 0;
}

// Password reset function
function sendPasswordReset() {
    const email = document.getElementById('email').value;

    if (!validate_email(email)) {
        alert('Please enter a valid email.');
        return;
    }

    auth.sendPasswordResetEmail(email)
        .then(function() {
            alert('Password Reset Email Sent!');
        })
        .catch(function(error) {
            alert(error.message);
        });
}
