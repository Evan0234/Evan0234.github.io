<script type="module">
  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-app.js";
  import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-auth.js";

  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyDKvMklNFuPJ96u1kZjb2sNsfGBu6_RoK4",
    authDomain: "zeeps.me",
    projectId: "zeeps-75fba",
    storageBucket: "zeeps-75fba.appspot.com",
    messagingSenderId: "593625338479",
    appId: "1:593625338479:web:3fb257f3d8e10e0aa4f39a",
    measurementId: "G-NE32QM5B99"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);

  document.getElementById('signUpForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const username = document.getElementById('signUpUsername').value;
    const email = document.getElementById('signUpEmail').value;
    const password = document.getElementById('signUpPassword').value;
    const recaptchaResponse = grecaptcha.getResponse();

    if (recaptchaResponse.length === 0) {
      document.getElementById('signUpError').innerText = "Please complete the reCAPTCHA";
      return;
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed up
        const user = userCredential.user;
        // Add additional user info to your database if needed
        alert("Sign Up Successful!");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        document.getElementById('signUpError').innerText = errorMessage;
      });
  });
</script>
