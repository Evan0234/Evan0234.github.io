const cors = require('cors');
const functions = require("firebase-functions");
const fetch = require('node-fetch');
const admin = require('firebase-admin');
const corsHandler = cors({ origin: true });

admin.initializeApp();
const db = admin.firestore();

exports.analyzeMessage = functions.https.onRequest((req, res) => {
    corsHandler(req, res, async () => {
        const { message } = req.body;
        const apiKey = functions.config().google.api_key; 
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
            console.error("Error processing request:", error);
            res.status(500).json({ error: 'Error processing request' });
        }
    });
});
