// Firebase configuration object
const firebaseConfig = {
    apiKey: "AIzaSyAjl5C7TvjmtxPc4_eno6vRMIVjciLiV04",
    authDomain: "zeeplogin.firebaseapp.com",
    databaseURL: "https://zeeplogin-default-rtdb.firebaseio.com",
    projectId: "zeeplogin",
    storageBucket: "zeeplogin.appspot.com",
    messagingSenderId: "343221159933",
    appId: "1:343221159933:web:e6c3e1e7ec6161a48dfb94",
    measurementId: "G-DE7X1YKVGY"
};

// Initialize Firebase
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

const auth = firebase.auth();

let appVerifier; // Holds the reCAPTCHA verifier

function sendVerificationCode() {
    const phoneNumber = document.getElementById('phoneNumber').value;
    appVerifier = new firebase.auth.RecaptchaVerifier('sendVerificationCode', {
        size: 'invisible'
    });

    auth.signInWithPhoneNumber(phoneNumber, appVerifier)
        .then(confirmationResult => {
            // SMS sent. Prompt user to enter the code.
            window.confirmationResult = confirmationResult; // Store the confirmation result
            document.getElementById('verification-container').style.display = 'block';
            document.getElementById('statusMessage').innerText = "Verification code sent!";
        })
        .catch(error => {
            console.error('Error during signInWithPhoneNumber', error);
            document.getElementById('statusMessage').innerText = error.message;
        });
}

function verifyCode() {
    const code = document.getElementById('verificationCode').value;
    confirmationResult.confirm(code)
        .then(result => {
            // User signed in successfully.
            const user = result.user;
            document.getElementById('statusMessage').innerText = "MFA setup successful!";
        })
        .catch(error => {
            console.error('Error while verifying code', error);
            document.getElementById('statusMessage').innerText = error.message;
        });
}
