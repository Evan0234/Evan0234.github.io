<script type="module">
  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-analytics.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyCQmJdktws4jVY0hRVTMYpmzDzme08lAZw",
    authDomain: "zeepsme.firebaseapp.com",
    projectId: "zeepsme",
    storageBucket: "zeepsme.appspot.com",
    messagingSenderId: "710976896969",
    appId: "1:710976896969:web:d7e6f92b2c06974deaf218",
    measurementId: "G-5QSENX1ZMD"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
</script>
