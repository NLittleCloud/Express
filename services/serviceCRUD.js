const Key = require('../models/api_keys');
const I_model = require('../models/info_models');
const db = require('../configs/config');

const handleError = (res, err) => {
	res.status(500).send("Ошибка HANDLEERROR");
}

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
           		error.statusCode = 401;
            	throw error;
			}
		})
		.catch((err) => {next(err);});//ОШИБКА!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

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
					res.status(201).json(`Ваш apiKey: ${key._id}`);
				})
				.catch((err) => {next(err);});
		}else{
			const error = new Error("Invalid content-type");
			error.statusCode = 401;
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
		  .find({}, {Uname: 1, Comment: 1})
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
					error.statusCode = 400;
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
		if (req.headers['content-type'] === 'application/json'){
			const model = new I_model(req.body);

		 model
			.save()
			.then(() => {
				res.status(201).json(`Данные успешно отправлены!`);
			})
			.catch((err) => {next(err);});
		} else{
			const error = new Error("Invalid content-type");
			error.statusCode = 401;
			throw error;
		};

	}catch(err){
		next(err);
	}
};


async function updateModel(req, res, next){

	try{
		if (req.headers['content-type'] === 'application/json'){
			const ids = new db.Types.ObjectId(`${req.params.id}`);
			body = req.body;	

			I_model
				.findByIdAndUpdate(ids, 
					{ Uname: body.Uname,
						Mname: body.Mname,
						Mtype: body.Mtype,
						Object: body.Object,
						Owerview: body.Owerview,
						Comment: body.Comment,
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
			
		} else{
			const error = new Error("Invalid content-type");
			error.statusCode = 401;
			throw error;
		};

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
module.exports = {checkApi, insertApi, deleteApi, showModel, findbyidModel, insertModel, updateModel, deletebyidModel };