<script type="module">
  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-analytics.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyDKvMklNFuPJ96u1kZjb2sNsfGBu6_RoK4",
    authDomain: "zeeps-75fba.firebaseapp.com",
    projectId: "zeeps-75fba",
    storageBucket: "zeeps-75fba.appspot.com",
    messagingSenderId: "593625338479",
    appId: "1:593625338479:web:3fb257f3d8e10e0aa4f39a",
    measurementId: "G-NE32QM5B99"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
</script>
