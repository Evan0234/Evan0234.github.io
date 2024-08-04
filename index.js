const functions = require("firebase-functions"); 
const { onRequest } = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");
const fetch = require('node-fetch');
const admin = require('firebase-admin');

admin.initializeApp(); 
const db = admin.firestore(); 

const apiKey = functions.config().google.api_key; 


exports.analyzeMessage = onRequest(async (req, res) => {
    const { message } = req.body;
    const endpoint = `https://language.googleapis.com/v1/documents:analyzeSentiment?key=${apiKey}`;

    try {
        const response = await fetch(endpoint, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                document: { type: 'PLAIN_TEXT', content: message },
                encodingType: 'UTF8'
            })
        });
        const data = await response.json();


        await db.collection('messages').add({
            userMessage: message,
            aiResponse: data.documentSentiment.score >= 0 ? 'Good' : 'Bad',
            timestamp: admin.firestore.FieldValue.serverTimestamp()
        });

        res.json(data);
    } catch (error) {
        logger.error("Error processing request:", error);
        res.status(500).json({ error: 'Error processing request' });
    }
});
