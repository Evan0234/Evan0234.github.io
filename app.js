// Import the Firebase SDK
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.9.0/firebase-app.js";
import { getDatabase, ref, onValue, set, increment, serverTimestamp, onDisconnect, push } from "https://www.gstatic.com/firebasejs/9.9.0/firebase-database.js";

// Your web app's Firebase configuration
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
const db = getDatabase(app);

// Visitor counter
const visitorsRef = ref(db, 'visitors');
const currentVisitorsRef = ref(db, 'currentVisitors');

// Increment total visitors count
set(visitorsRef, increment(1));

// Handle current visitors
const myConnectionRef = push(currentVisitorsRef);
set(myConnectionRef, serverTimestamp());
onDisconnect(myConnectionRef).remove();

// Update visitor count display
onValue(visitorsRef, (snapshot) => {
    const visitors = snapshot.val();
    document.getElementById('total-visitors').innerText = `Total Visitors: ${visitors}`;
});

// Update current visitors count display
onValue(currentVisitorsRef, (snapshot) => {
    const currentVisitors = snapshot.size;
    document.getElementById('current-visitors').innerText = `Current Visitors: ${currentVisitors}`;
});

// Theme toggle functionality
document.getElementById('themeToggle').addEventListener('click', () => {
    document.body.classList.toggle('dark');
});
