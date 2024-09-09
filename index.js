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

// Initialize Firebase Authentication
const auth = firebase.auth();

// Register function
function register() {
    try {
        // Get input fields
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        // Validate input fields
        if (!validate_email(email) || !validate_password(password)) {
            throw new Error('Email or Password is Outta Line!!');
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
                                alert('User Created and Email Verified!!');
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
