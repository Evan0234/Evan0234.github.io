// Firebase configuration (reuse the same Firebase config)
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

// Function to send password reset email
function sendResetEmail() {
    var email = document.getElementById('reset_email').value;

    if (validate_email(email)) {
        firebase.auth().sendPasswordResetEmail(email)
        .then(function() {
            alert('Password reset email sent! Please check your inbox.');
        })
        .catch(function(error) {
            alert('Error: ' + error.message);
        });
    } else {
        alert('Please enter a valid email address.');
    }
}

// Validation function for email
function validate_email(email) {
    var expression = /^[^@]+@\w+(\.\w+)+\w$/;
    return expression.test(email);
}
