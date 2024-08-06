const express = require('express');
const fetch = require('node-fetch');
const app = express();
const port = 3000;

const API_KEY = process.env.GEMINI_API_KEY; 

app.use(express.static('public'));

app.get('/api/generate', async (req, res) => {
    const prompt = req.query.prompt;
    const response = await fetch('https://api.example.com/generate', { 
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${API_KEY}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ prompt })
    });
    const data = await response.json();
    res.json(data);
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
