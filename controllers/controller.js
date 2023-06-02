const express = require('express');
const controller = express.Router();
const {insertUser, showUser, findbyidUser} = require('../services/service');
const {checkApi, insertApi, deleteApi, showModel, findbyidModel, insertModel, updateModel, deletebyidModel, sendHTML} = require('../services/serviceCRUD');

const jsonParser = express.json();

controller.post('/comments', jsonParser, insertUser);
controller.get('/comments/:id', findbyidUser);
controller.get('/comments', showUser);

//CRUD
controller.post('/api', jsonParser, insertApi);
controller.delete('/api/:id', deleteApi);

controller.get('/models', showModel);
controller.get('/models/:id', findbyidModel);

controller.post('/models', jsonParser, checkApi, insertModel);
controller.put('/models/:id', jsonParser, checkApi, updateModel);
controller.delete('/models/:id', checkApi, deletebyidModel);

 controller.get('/fetch', sendHTML)

module.exports = controller;
