// Initialize Firebase (reuse your Firebase configuration)
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

function setupMFA() {
    const user = auth.currentUser;
    const phoneNumber = document.getElementById('phoneNumber').value;
    const appVerifier = new firebase.auth.RecaptchaVerifier('setupMFA', {
        'size': 'invisible'
    });

    const phoneAuthProvider = new firebase.auth.PhoneAuthProvider();
    phoneAuthProvider.verifyPhoneNumber(phoneNumber, appVerifier)
        .then(verificationId => {
            const verificationCode = window.prompt('Enter the verification code sent to your phone:');
            const phoneCredential = firebase.auth.PhoneAuthProvider.credential(verificationId, verificationCode);

            user.multiFactor.getSession()
                .then((multiFactorSession) => {
                    const multiFactorAssertion = firebase.auth.PhoneMultiFactorGenerator.assertion(phoneCredential);
                    return user.multiFactor.enroll(multiFactorAssertion, 'Phone Number');
                })
                .then(() => {
                    alert('MFA setup complete!');
                    window.location.href = 'https://dashboard.zeeps.me';
                })
                .catch((error) => {
                    console.error('Error during MFA setup:', error);
                    alert(error.message);
                });
        })
        .catch((error) => {
            console.error('Error during phone verification:', error);
            alert(error.message);
        });
}
