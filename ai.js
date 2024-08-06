import { sendMessageToFirestore } from './firebase.js';

document.getElementById('send-btn').addEventListener('click', () => {
    const userInput = document.getElementById('user-input').value;
    sendMessage(userInput);
});

async function sendMessage(message) {
    const messagesContainer = document.getElementById('messages');
    const userMessageDiv = document.createElement('div');
    userMessageDiv.textContent = `You: ${message}`;
    messagesContainer.appendChild(userMessageDiv);


  await sendMessageToFirestore(message);


  const aiResponse = await getAIResponse(message);
    const aiMessageDiv = document.createElement('div');
    aiMessageDiv.textContent = `AI: ${aiResponse}`;
    messagesContainer.appendChild(aiMessageDiv);

    document.getElementById('user-input').value = '';
}

async function getAIResponse(message) {
    const response = await fetch('https://api.gemini.ai/your_endpoint', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${YOUR_GEMINI_AI_API_KEY}`
        },
        body: JSON.stringify({ message })
    });

    const data = await response.json();
    return data.reply || 'Sorry, I did not understand that.';
}
