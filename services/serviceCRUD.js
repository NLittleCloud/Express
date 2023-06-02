const Key = require('../models/api_keys');
const I_model = require('../models/info_models');
const db = require('../configs/config');
const path = require('path')

function checkApi(req, res, next){
	try{
		const apiKey = new db.Types.ObjectId(`${req.query.apiKey}`);

		Key
		.findById(apiKey)
		.then((result) => {
			if(result){
				next();
			}else {
				const error = new Error("Invalid API key");
           		error.statusCode = 400;
            	throw error;
			}
		})
		.catch((err) => {next(err);});

	}catch(err) {
		next(err);
	}
}

//API KEY
async function insertApi(req, res, next){
	try{
		if (req.headers['content-type'] === 'application/json'){
			const key = new Key(req.body);
			key._id = new db.Types.ObjectId();
	
			key
				.save()
				.then(() => {
					res.status(200).json(`Ваш apiKey: ${key._id}`);	
				})
				.catch((err) => {next(err);});
		}else{
			const error = new Error("Invalid content-type");
			error.statusCode = 400;
			throw error;
		};

	}catch(err){
		next(err);
	}
	
};

async function deleteApi(req, res, next){

	try{
		const ids = new db.Types.ObjectId(`${req.params.id}`);
		Key
		    .findByIdAndDelete(ids)
		    .then((result) => {
			  	if(result){
					res.status(200).json("Данные успешно удалены!");
			  	}else {
					const error = new Error("Такого документа не существует");
					error.statusCode = 400;
			 		throw error;
				};
		   	})
			.catch((err) => {next(err);});
	
	}catch(err){
		next(err);
	};
	
};

//MODELS
async function showModel(req, res, next){

	try{
		I_model
		  .find({}, {Mname: 1})
		  .then((models) => {
			  res.status(200).json(models);
		  })
		  .catch((err) => {next(err);});

	}catch(err){
		next(err);
	}
};

async function findbyidModel(req, res, next){

	try{
		const ids = new db.Types.ObjectId(`${req.params.id}`);
	
		I_model
		  .findById(ids)
		  .then((result) => {
			  if(result){
					res.status(200).json(result);
				}else {
					const error = new Error("Такого документа не существует");
					error.statusCode = 404;
			 		throw error;
				};
		  })
		  .catch((err) => {next(err);});

	}catch(err){
		next(err);
	}
};

async function insertModel(req, res, next){
	try{
			const model = new I_model(
			{ Uname: req.query.Uname,
				Mname: req.query.Mname,
				Mtype: req.query.Mtype,
				Object: req.query.Object,
				Owerview: req.query.Owerview,
				Comment: req.query.Comment
			});

		 model
			.save()
			.then(() => {
				res.status(200).json(`Данные успешно отправлены!`);
			})
			.catch((err) => {next(err);});
	}catch(err){
		next(err);
	}
};


async function updateModel(req, res, next){
	try{
			const ids = new db.Types.ObjectId(`${req.params.id}`);

			I_model
				.findByIdAndUpdate(ids, 
					{ Uname: req.query.Uname,
						Mname: req.query.Mname,
						Mtype: req.query.Mtype,
						Object: req.query.Object,
						Owerview: req.query.Owerview,
						Comment: req.query.Comment,
						Updatedata: Date.now()})

				.then((result) => {
					if(result){
						res.status(200).json("Данные успешно обновлены!");
					}else {
						const error = new Error("Такого документа не существует");
						error.statusCode = 400;
			 			throw error;
					};
				})
				.catch((err) => {next(err);});
	}catch(err){
		next(err);
	};
};

async function deletebyidModel(req, res, next){

	try{
		const ids = new db.Types.ObjectId(`${req.params.id}`);
		
		I_model
			.findByIdAndDelete(ids)
			.then((result) => {
				if(result){
					res.status(200).json("Данные успешно удалены!");

				}else {const error = new Error("Такого документа не существует");
					error.statusCode = 400;
				 	throw error;
				};
			})
			.catch((err) => {next(err);});

	}catch(err){
		next(err);
	};
};	

function sendHTML(req, res, next){
	res.sendFile(path.join(__dirname, '..', '/public/fetch.html'));
};

module.exports = {checkApi, insertApi, deleteApi, showModel, findbyidModel, insertModel, updateModel, deletebyidModel, sendHTML};