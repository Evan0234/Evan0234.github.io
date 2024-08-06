import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyDKvMklNFuPJ96u1kZjb2sNsfGBu6_RoK4",
    authDomain: "zeeps-75fba.firebaseapp.com",
    projectId: "zeeps-75fba",
    storageBucket: "zeeps-75fba.appspot.com",
    messagingSenderId: "593625338479",
    appId: "1:593625338479:web:3fb257f3d8e10e0aa4f39a",
    measurementId: "G-NE32QM5B99"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function sendMessageToFirestore(message) {
    try {
        const docRef = await addDoc(collection(db, "messages"), {
            text: message,
            timestamp: new Date()
        });
        console.log("Message sent with ID: ", docRef.id);
    } catch (e) {
        console.error("Error adding document: ", e);
    }
}

export { sendMessageToFirestore };
