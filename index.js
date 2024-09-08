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

// Initialize variables
const auth = firebase.auth()
const database = firebase.database()

// Show warning message on page load
window.onload = function() {
    alert("⚠️ WARNING ⚠️\n\nNEVER SHARE ANYTHING FROM THE TERMINAL. IF SOMEBODY ASKED YOU TO GET SOMETHING HERE, IT'S A SCAM!");
}

// Set up our register function
function register() {
    // Get all our input fields
    email = document.getElementById('email').value
    password = document.getElementById('password').value
    full_name = document.getElementById('full_name').value
    favourite_song = document.getElementById('favourite_song').value
    milk_before_cereal = document.getElementById('milk_before_cereal').value

    // Validate input fields
    if (validate_email(email) == false || validate_password(password) == false) {
        alert('Email or Password is Outta Line!!')
        return
    }
    if (validate_field(full_name) == false || validate_field(favourite_song) == false || validate_field(milk_before_cereal) == false) {
        alert('One or More Extra Fields is Outta Line!!')
        return
    }

    // Create the user with email and password
    auth.createUserWithEmailAndPassword(email, password)
        .then(function() {
            var user = auth.currentUser;

            // Send verification email
            user.sendEmailVerification().then(function() {
                alert('Verification Email Sent! Please check your inbox.');

                // Set a listener to detect changes in the user's authentication state
                auth.onAuthStateChanged(function(user) {
                    if (user) {
                        if (user.emailVerified) {
                            // If email is verified, add user to the database
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
            // Firebase will use this to alert of its errors
            var error_code = error.code;
            var error_message = error.message;

            alert(error_message);
        });
}

// Function to save user data to Firebase Database
function saveUserToDatabase(user, full_name, favourite_song, milk_before_cereal) {
    var database_ref = database.ref();

    // Create User data
    var user_data = {
        email: user.email,
        full_name: full_name,
        favourite_song: favourite_song,
        milk_before_cereal: milk_before_cereal,
        last_login: Date.now()
    };

    // Push to Firebase Database
    database_ref.child('users/' + user.uid).set(user_data);

    alert('User Created and Email Verified!!');
}

// Set up our login function
function login() {
    // Get all our input fields
    email = document.getElementById('email').value
    password = document.getElementById('password').value

    // Validate input fields
    if (validate_email(email) == false || validate_password(password) == false) {
        alert('Email or Password is Outta Line!!')
        return
    }

    auth.signInWithEmailAndPassword(email, password)
        .then(function() {
            var user = auth.currentUser;

            if (user.emailVerified) {
                // User is verified, proceed with login
                var database_ref = database.ref();

                // Create User data
                var user_data = {
                    last_login: Date.now()
                };

                // Push to Firebase Database
                database_ref.child('users/' + user.uid).update(user_data);

                // Set a cookie for the login token that expires in 7 days
                document.cookie = "login_token=" + user.uid + "; max-age=" + 7 * 24 * 60 * 60 + "; path=/";

                alert('User Logged In!!');
                window.location.href = 'https://zeeps.me/dashboard';
            } else {
                alert('Please verify your email before logging in.');
            }
        })
        .catch(function(error) {
            var error_code = error.code;
            var error_message = error.message;

            alert(error_message);
        });
}

// Function for password reset
function resetPassword() {
    // Get the user's email
    var email = document.getElementById('email').value;

    // Validate email
    if (validate_email(email) == false) {
        alert('Please enter a valid email address.');
        return;
    }

    // Send password reset email
    auth.sendPasswordResetEmail(email)
        .then(function() {
            alert('Password reset email sent! Please check your inbox.');
        })
        .catch(function(error) {
            alert(error.message);
        });
}

// Validate Functions
function validate_email(email) {
    expression = /^[^@]+@\w+(\.\w+)+\w$/;
    return expression.test(email);
}

function validate_password(password) {
    return password.length >= 6;
}

function validate_field(field) {
    return field != null && field.length > 0;
}
