const User = require('../models/users');
const db = require("../configs/config");

const handleError = (res, err) => {
	res.status(500).send(err.message);
}

async function insertUser(req, res){

	const user = new User(req.body);
	user
		.save()
		.then(() => {
			res.status(201).json(`Данные успешно отправлены!`);
		})
		.catch((err) => handleError(res, err));
};

async function showUser(req, res){

  User
		.find()
		.then((users) => {
			res.status(200).json(users);
		})
		.catch((err) => handleError(res, err));
};

async function findbyidUser(req, res){
	
	const id = req.params.id;
	User.findById(id)
	.then((result) => {
		res.status(200).json(result);
	})
	.catch((err) => handleError(res, err));
};

module.exports = {insertUser, showUser, findbyidUser};