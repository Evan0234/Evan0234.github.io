async function getAIResponse(message) {

    const normalizedMessage = message.toLowerCase();


    if (normalizedMessage === 'hello' || normalizedMessage === 'hi') {
        return 'Hello!';
    } else if (normalizedMessage === 'bonjour') {
        return 'Bonjour, comma sa va?';
    }


    const apiKey = functions.config().google.api_key;
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
