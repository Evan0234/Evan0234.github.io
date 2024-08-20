import express from 'express';
import axios from 'axios';
import bodyParser from 'body-parser';

const app = express();
app.use(bodyParser.json());

app.post('/send-sms', (req, res) => {
    const phoneNumber = req.body.phoneNumber;
    const message = "This is a test message, please don't reply";

    const apiKey = process.env.ABSTRACT_API_KEY;

    axios.get(`https://phonevalidation.abstractapi.com/v1/?api_key=${apiKey}&phone=${phoneNumber}`)
        .then(response => {
            console.log(response.data);
            res.json({ message: 'Message sent successfully!' });
        })
        .catch(error => {
            console.error(error);
            res.status(500).json({ message: 'Failed to send message' });
        });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
