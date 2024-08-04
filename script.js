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
    const apiKey = 'process.env.GOOGLE_AI_API_KEY'; 
    const endpoint = `https://language.googleapis.com/v1/documents:analyzeSentiment?key=${apiKey}`;
    
    const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            document: {
                type: 'PLAIN_TEXT',
                content: message
            },
            encodingType: 'UTF8'
        })
    });

    const data = await response.json();
    return data.documentSentiment.score >= 0 ? 'Good' : 'Bad';
}
