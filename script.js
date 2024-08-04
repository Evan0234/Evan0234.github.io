async function getAIResponse(message) {
    const endpoint = 'https://us-central1-zeeps-75fba.cloudfunctions.net/analyzeMessage'; 

    const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ message }) 
    });

    if (!response.ok) {
        throw new Error('Network response was not ok');
    }

    const data = await response.json();
    return data.documentSentiment.score >= 0 ? 'Good' : 'Bad';
}
