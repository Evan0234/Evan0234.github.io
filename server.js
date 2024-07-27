const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

const bannedIps = new Set();
const warnings = {};

const filteredWords = ['fuck', 'shit']; // Add more words as needed

app.use(express.static(path.join(__dirname, 'public')));

io.use((socket, next) => {
    const ip = socket.handshake.address;
    if (bannedIps.has(ip)) {
        return next(new Error('IP banned'));
    }
    socket.ip = ip;
    next();
});

io.on('connection', (socket) => {
    console.log('New connection:', socket.ip);

    socket.on('chatMessage', (message) => {
        const lowerMessage = message.toLowerCase();
        const containsFilteredWord = filteredWords.some(word => lowerMessage.includes(word) || lowerMessage.split('').some((char, i) => word.includes(lowerMessage[i] + lowerMessage[i + 1])));

        if (containsFilteredWord) {
            if (!warnings[socket.ip]) {
                warnings[socket.ip] = 0;
            }

            warnings[socket.ip]++;
            socket.emit('systemMessage', `Warning: Inappropriate language is not allowed. You have ${3 - warnings[socket.ip]} warning(s) left.`);

            if (warnings[socket.ip] >= 3) {
                bannedIps.add(socket.ip);
                socket.emit('systemMessage', 'You have been banned from the chat.');
                socket.disconnect();
            }
            return;
        }

        io.emit('message', `User: ${message}`);
    });

    socket.on('disconnect', () => {
        console.log('User disconnected:', socket.ip);
    });
});

server.listen(3000, () => {
    console.log('Server is running on port 3000');
});
