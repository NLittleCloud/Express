const express = require('express');
const controller = express.Router();
const {insertUser, showUser, findbyidUser} = require('../services/service');
const jsonParser = express.json();

controller.post('/comments', jsonParser, insertUser);
controller.get('/comments/:id', findbyidUser);
controller.get('/comments', showUser);

module.exports = controller;
