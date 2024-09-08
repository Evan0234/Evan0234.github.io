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

// Initialize variables
const auth = firebase.auth();
const database = firebase.database();

// Show warning message on page load
window.onload = function() {
    alert("⚠️ WARNING ⚠️\n\nNEVER SHARE ANYTHING FROM THE TERMINAL. IF SOMEBODY ASKED YOU TO GET SOMETHING HERE, IT'S A SCAM!");
}

// Register function
function register() {
    email = document.getElementById('email').value;
    password = document.getElementById('password').value;
    full_name = document.getElementById('full_name').value;
    favourite_song = document.getElementById('favourite_song').value;
    milk_before_cereal = document.getElementById('milk_before_cereal').value;

    if (!validate_email(email) || !validate_password(password)) {
        alert('Email or Password is Outta Line!!');
        return;
    }
    if (!validate_field(full_name) || !validate_field(favourite_song) || !validate_field(milk_before_cereal)) {
        alert('One or More Extra Fields is Outta Line!!');
        return;
    }

    auth.createUserWithEmailAndPassword(email, password)
        .then(function() {
            var user = auth.currentUser;

            user.sendEmailVerification().then(function() {
                alert('Verification Email Sent! Please check your inbox.');

                auth.onAuthStateChanged(function(user) {
                    if (user && user.emailVerified) {
                        saveUserToDatabase(user, full_name, favourite_song, milk_before_cereal);
                    } else {
                        alert('Please verify your email before proceeding.');
                    }
                });
            }).catch(function(error) {
                alert(error.message);
            });
        })
        .catch(function(error) {
            alert(error.message);
        });
}

// Save user data to Firebase
function saveUserToDatabase(user, full_name, favourite_song, milk_before_cereal) {
    var database_ref = database.ref();
    var user_data = {
        email: user.email,
        full_name: full_name,
        favourite_song: favourite_song,
        milk_before_cereal: milk_before_cereal,
        last_login: Date.now()
    };

    database_ref.child('users/' + user.uid).set(user_data);
    alert('User Created and Email Verified!!');
}

// Login function
function login() {
    email = document.getElementById('email').value;
    password = document.getElementById('password').value;

    if (!validate_email(email) || !validate_password(password)) {
        alert('Email or Password is Outta Line!!');
        return;
    }

    auth.signInWithEmailAndPassword(email, password)
        .then(function() {
            var user = auth.currentUser;

            if (user.emailVerified) {
                var database_ref = database.ref();
                var user_data = {
                    last_login: Date.now()
                };

                database_ref.child('users/' + user.uid).update(user_data);
                document.cookie = "login_token=" + user.uid + "; max-age=" + 7 * 24 * 60 * 60 + "; path=/";

                alert('User Logged In!!');
                window.location.href = 'https://zeeps.me/dashboard';
            } else {
                alert('Please verify your email before logging in.');
            }
        })
        .catch(function(error) {
            alert(error.message);
        });
}

// Reset password function
function resetPassword() {
    var email = document.getElementById('email').value;
    if (!validate_email(email)) {
        alert('Please enter a valid email address.');
        return;
    }

    auth.sendPasswordResetEmail(email)
        .then(function() {
            alert('Password reset email sent!');
        })
        .catch(function(error) {
            alert(error.message);
        });
}

// Validation functions
function validate_email(email) {
    var expression = /^[^@]+@\w+(\.\w+)+\w$/;
    return expression.test(email);
}

function validate_password(password) {
    return password.length >= 6;
}

function validate_field(field) {
    return field != null && field.length > 0;
}
