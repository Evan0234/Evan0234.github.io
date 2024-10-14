// Import Firebase functions
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js";
import { getAuth, signOut } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-auth.js";
import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-firestore.js";

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAjl5C7TvjmtxPc4_eno6vRMIVjciLiV04",
    authDomain: "zeeplogin.firebaseapp.com",
    projectId: "zeeplogin",
    storageBucket: "zeeplogin.appspot.com",
    messagingSenderId: "343221159933",
    appId: "1:343221159933:web:e6c3e1e7ec6161a48dfb94",
    measurementId: "G-DE7X1YKVGY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Auth and Firestore
const auth = getAuth(app);
const db = getFirestore(app);

// Logout function
async function logout() {
    await signOut(auth);
    window.location.href = '/login'; // Redirect to login page
}

// Get user info from Firestore
async function getUserInfo(uid) {
    const userDoc = doc(db, "userLogs", uid);
    const userSnapshot = await getDoc(userDoc);
    if (userSnapshot.exists()) {
        const userData = userSnapshot.data();
        document.getElementById('userInfo').innerHTML = `
            <h2>User Info</h2>
            <p>UID: ${userData.uid}</p>
            <p>Email: ${userData.email}</p>
            <p>IP Address: ${userData.ipAddress}</p>
            <p>Sign Up Timestamp: ${userData.signupTimestamp.toDate().toLocaleString()}</p>
        `;
    } else {
        console.log("No such document!");
    }
}

// Redirect to login if not authenticated
auth.onAuthStateChanged(async (user) => {
    if (user) {
        // User is signed in, fetch user info
        await getUserInfo(user.uid);
    } else {
        window.location.href = '/login'; // Redirect to login if not signed in
    }
});
