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

// Set up our register function
function register() {
    // Get all our input fields
    email = document.getElementById('email').value;
    password = document.getElementById('password').value;
    full_name = document.getElementById('full_name').value;

    // Validate input fields
    if (validate_email(email) == false || validate_password(password) == false) {
        alert('Email or Password is Outta Line!!');
        return;
    }
    if (validate_field(full_name) == false) {
        alert('Name field is Outta Line!!');
        return;
    }

    // Move on with Auth
    auth.createUserWithEmailAndPassword(email, password)
    .then(function() {
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

        // Set a cookie to keep the user logged in for a week
        document.cookie = "loggedIn=true; max-age=" + (7 * 24 * 60 * 60) + "; path=/";

        // Redirect to dashboard
        window.location.href = 'https://zeeps.me/dashboard';
    })
    .catch(function(error) {
        // Firebase will use this to alert of its errors
        var error_code = error.code;
        var error_message = error.message;

        alert(error_message);
    });
}

// Set up our login function
function login() {
    // Get all our input fields
    email = document.getElementById('email').value;
    password = document.getElementById('password').value;

    // Validate input fields
    if (validate_email(email) == false || validate_password(password) == false) {
        alert('Email or Password is Outta Line!!');
        return;
    }

    auth.signInWithEmailAndPassword(email, password)
    .then(function() {
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

        // Set a cookie to keep the user logged in for a week
        document.cookie = "loggedIn=true; max-age=" + (7 * 24 * 60 * 60) + "; path=/";

        // Show success message with close button
        alert('User Logged In!!');
        // Redirect to dashboard
        window.location.href = 'https://zeeps.me/dashboard';
    })
    .catch(function(error) {
        // Firebase will use this to alert of its errors
        var error_code = error.code;
        var error_message = error.message;

        alert(error_message);
    });
}

// Redirect if logged in or not
firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        if (window.location.pathname === '/login' || window.location.pathname === '/') {
            window.location.href = 'https://zeeps.me/dashboard';
        }
    } else {
        if (window.location.pathname === '/dashboard') {
            window.location.href = 'https://zeeps.me/login';
        }
    }
});

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
