const qrcode = require('qrcode-terminal'); 
const { Client, LocalAuth } = require('whatsapp-web.js');
const express = require('express');
const app = express();
const port = 3000;

const client = new Client({
    authStrategy: new LocalAuth()
});

client.on('qr', (qr) => {
    qrcode.generate(qr, { small: true });
});

client.on('ready', () => {
    console.log('✅ WhatsApp Client is ready!');
});

client.on('message', message => {
    console.log(`📩 Message received: ${message.body}`);

    const keywords = [
        'happy birthday',
        'happy birtday', // common typo
        'जन्मदिन',
        'जन्मदिवस',
        'शुभकामनाएं'
    ];

    const messageText = message.body.toLowerCase();
    const found = keywords.some(keyword => messageText.includes(keyword.toLowerCase()));

    if (found) {
        message.reply('बहुत-बहुत धन्यवाद 😊🙏💐 आपकी शुभकामनाएँ अनमोल हैं! ✨');
    }
});

app.get('/', (req, res) => {
    res.send('WhatsApp Bot is running!');
});

app.listen(port, () => {
    console.log(`🚀 Express Server Running on port ${port}`);
});

client.initialize();
