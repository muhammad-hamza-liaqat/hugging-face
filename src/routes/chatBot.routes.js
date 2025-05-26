const express = require('express');
const chatBotRoutes = express.Router();
const { chatBotHuggingFace } = require('../controller/chatBot.controller');

chatBotRoutes.post('/ai-assistant', chatBotHuggingFace);

module.exports = chatBotRoutes;