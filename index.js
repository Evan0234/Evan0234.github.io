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
const auth = firebase.auth();
const database = firebase.database();

// Listen for auth state changes
auth.onAuthStateChanged(function(user) {
    if (user) {
        // User is signed in, redirect to dashboard
        console.log("User is signed in, redirecting to dashboard...");
        window.location.href = 'https://zeeps.me/dashboard';
    } else {
        console.log("No user is signed in.");
    }
});

// Set up our register function
function register() {
    // Get all our input fields
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;
    var full_name = document.getElementById('full_name').value;

    // Validate input fields
    if (!validate_email(email) || !validate_password(password)) {
        alert('Email or Password is Outta Line!!');
        return;
    }
    if (!validate_field(full_name)) {
        alert('Full Name is Outta Line!!');
        return;
    }

    // Move on with Auth
    auth.createUserWithEmailAndPassword(email, password)
        .then(function() {
            console.log("User registered successfully");

            // Declare user variable
            var user = auth.currentUser;

            // Add this user to Firebase Database
            var database_ref = database.ref();

            // Create User data
            var user_data = {
                email: email,
                full_name: full_name,
                last_login: Date.now()
            };

            // Push to Firebase Database
            database_ref.child('users/' + user.uid).set(user_data);

            // Set a cookie to remember the logged-in state for 7 days
            document.cookie = "loggedIn=true; path=/; max-age=" + 7 * 24 * 60 * 60;

            // Redirect to dashboard
            window.location.href = 'https://zeeps.me/dashboard';
        })
        .catch(function(error) {
            console.error("Registration failed: ", error.message);
            alert(error.message);
        });
}

// Set up our login function
function login() {
    // Get all our input fields
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;

    // Validate input fields
    if (!validate_email(email) || !validate_password(password)) {
        alert('Email or Password is Outta Line!!');
        return;
    }

    auth.signInWithEmailAndPassword(email, password)
        .then(function() {
            console.log("User logged in successfully");

            // Declare user variable
            var user = auth.currentUser;

            // Add this user to Firebase Database
            var database_ref = database.ref();

            // Create User data
            var user_data = {
                last_login: Date.now()
            };

            // Push to Firebase Database
            database_ref.child('users/' + user.uid).update(user_data);

            // Set a cookie to remember the logged-in state for 7 days
            document.cookie = "loggedIn=true; path=/; max-age=" + 7 * 24 * 60 * 60;

            // Redirect to dashboard
            window.location.href = 'https://zeeps.me/dashboard';
        })
        .catch(function(error) {
            console.error("Login failed: ", error.message);
            alert(error.message);
        });
}

// Validate Functions
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
