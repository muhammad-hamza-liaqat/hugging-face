const express = require('express');
const myRoutes = express.Router();

const chatBotRoutes = require('./chatBot.routes');

myRoutes.use('/chatbot', chatBotRoutes);

module.exports = myRoutes;