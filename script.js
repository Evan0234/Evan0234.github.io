// Initialize Firestore
const db = firebase.firestore(); 

function toggleTheme() {
    const body = document.body;
    body.classList.toggle('light');
    body.classList.toggle('dark');
}

async function sendMessage(event) {
    if (event && event.key !== 'Enter') return; 
    const inputField = document.getElementById('chat-input');
    const message = inputField.value.trim();
    if (!message) return;

    appendMessage('user', message); 
    inputField.value = ''; 

    const response = await getAIResponse(message); 
    appendMessage('bot', response); 


    await db.collection('messages').add({
        userMessage: message,
        aiResponse: response,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
    });
}

function appendMessage(sender, message) {
    const chatBox = document.getElementById('chat-box');
    const messageElement = document.createElement('div');
    messageElement.classList.add('chat-message', sender);
    messageElement.textContent = message;
    chatBox.appendChild(messageElement);
    chatBox.scrollTop = chatBox.scrollHeight; 
}

async function getAIResponse(message) {
    const response = await fetch('https://zeeps-75fba.cloudfunctions.net/analyzeMessage', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message })
    });

    const data = await response.json();
    return data.documentSentiment.score >= 0 ? 'Good' : 'Bad'; 
}


async function loadMessages() {
    const messagesSnapshot = await db.collection('messages').orderBy('timestamp').get();
    messagesSnapshot.forEach(doc => {
        const messageData = doc.data();
        appendMessage('bot', messageData.aiResponse); 
    });
}


window.onload = loadMessages;
