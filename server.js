require('dotenv').config();
const express = require('express');
const axios = require('axios');
const app = express();

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const BOT_ID = '1246411584658473012'; // Replace with your bot's client ID
const REDIRECT_URI = 'https://zeeps.me/auth/callback'; // Ensure this matches your Discord redirect URI

app.get('/auth/callback', async (req, res) => {
    const code = req.query.code;

    try {
        const tokenResponse = await axios.post('https://discord.com/api/oauth2/token', new URLSearchParams({
            client_id: CLIENT_ID,
            client_secret: CLIENT_SECRET,
            grant_type: 'authorization_code',
            code: code,
            redirect_uri: REDIRECT_URI
        }).toString(), {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });

        const accessToken = tokenResponse.data.access_token;
        const userResponse = await axios.get('https://discord.com/api/users/@me', {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        });

        const guildsResponse = await axios.get('https://discord.com/api/users/@me/guilds', {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        });

        const userGuilds = guildsResponse.data;
        const botInGuilds = userGuilds.some(guild => guild.id === BOT_ID);

        if (botInGuilds) {
            res.redirect('/dashboard'); // Redirect to the dashboard (to be coded later)
        } else {
            res.redirect('https://discord.com/oauth2/authorize?client_id=1246411584658473012&permissions=275146729558&integration_type=0&scope=bot');
        }
    } catch (error) {
        console.error(error);
        res.send('An error occurred while authenticating with Discord.');
    }
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
