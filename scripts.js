// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";

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
const analytics = getAnalytics(app);
const auth = getAuth(app);

// Handle routing
document.addEventListener('DOMContentLoaded', () => {
    handleRouting();
    onAuthStateChanged(auth, (user) => {
        if (user) {
            showBuilder();
        } else {
            const path = window.location.pathname;
            if (path === '/login') {
                showLogin();
            } else if (path === '/sign-up') {
                showSignUp();
            } else {
                window.location.href = '/login';
            }
        }
    });
});

window.addEventListener('popstate', handleRouting);

function handleRouting() {
    const path = window.location.pathname;
    if (path === '/login') {
        showLogin();
    } else if (path === '/sign-up') {
        showSignUp();
    } else {
        showBuilder();
    }
}

function showSignUp() {
    document.getElementById('sign-up').classList.remove('hidden');
    document.getElementById('login').classList.add('hidden');
    document.getElementById('builder').classList.add('hidden');
}

function showLogin() {
    document.getElementById('login').classList.remove('hidden');
    document.getElementById('sign-up').classList.add('hidden');
    document.getElementById('builder').classList.add('hidden');
}

function showBuilder() {
    document.getElementById('builder').classList.remove('hidden');
    document.getElementById('login').classList.add('hidden');
    document.getElementById('sign-up').classList.add('hidden');
}

function signUp() {
    const email = document.getElementById('signUpEmail').value;
    const password = document.getElementById('signUpPassword').value;

    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            showBuilder();
        })
        .catch((error) => {
            document.getElementById('signUpError').classList.remove('hidden');
            document.getElementById('signUpError').innerText = error.message;
        });
}

function login() {
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            showBuilder();
        })
        .catch((error) => {
            document.getElementById('loginError').classList.remove('hidden');
            document.getElementById('loginError').innerText = error.message;
        });
}

let blocks = [];

function addBlock(type) {
    const id = Date.now();
    const block = { id, type, content: '' };
    blocks.push(block);
    renderBlocks();
}

function updateBlockContent(id, content) {
    const block = blocks.find(b => b.id === id);
    if (block) {
        block.content = content;
    }
}

function renderBlocks() {
    const blocksContainer = document.getElementById('blocks');
    blocksContainer.innerHTML = '';
    blocks.forEach(block => {
        const blockElement = document.createElement('div');
        blockElement.className = 'block';
        switch (block.type) {
            case 'text':
                blockElement.innerHTML = `
                    <textarea onchange="updateBlockContent(${block.id}, this.value)" placeholder="Enter text here">${block.content}</textarea>
                `;
                break;
            case 'image':
                blockElement.innerHTML = `
                    <input type="text" onchange="updateBlockContent(${block.id}, this.value)" placeholder="Enter image URL" value="${block.content}">
                `;
                break;
            case 'video':
                blockElement.innerHTML = `
                    <input type="text" onchange="updateBlockContent(${block.id}, this.value)" placeholder="Enter video URL" value="${block.content}">
                `;
                break;
            default:
                break;
        }
        blocksContainer.appendChild(blockElement);
    });
}

function savePage() {
    const pageName = document.getElementById('pageName').value;
    const pageData = { name: pageName, blocks };
    const request = new XMLHttpRequest();
    request.open('POST', 'https://api.github.com/repos/your-github-username/your-repo/issues'); // Replace with your GitHub username and repository name
    request.setRequestHeader('Content-Type', 'application/json');
    request.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 201) {
            alert('Page saved and submitted for approval!');
        }
    };
    request.send(JSON.stringify({
        title: `New Page: ${pageName}`,
        body: JSON.stringify(pageData),
        labels: ['approve']
    }));
}
