// replace-api-key.js
const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'index.html'); 
const apiKey = process.env.GEMINI_API_KEY;

fs.readFile(filePath, 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading the file:', err);
    return;
  }

  const result = data.replace('__GEMINI_API_KEY__', apiKey);

  fs.writeFile(filePath, result, 'utf8', (err) => {
    if (err) {
      console.error('Error writing the file:', err);
    } else {
      console.log('API key has been inserted successfully.');
    }
  });
});
