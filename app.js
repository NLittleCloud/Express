const express = require('express');
const v1_router = require("./router/router");
const morgan = require("morgan");
const helmet = require('helmet')

const HOST = '127.0.0.1';
const PORT = 8000;
const app = express();

app.use(morgan('tiny'));
app.use(helmet());
app.use(express.static('public'));

app.use('/v1', v1_router);


app.use(function(err, req, res, next) {

	if(err.statusCode)
	{
		res.status(err.statusCode).json(err.message);
	}else{
		res.status(400).json("Отправьте запрос корректно!");
	}
});

app.listen(PORT, HOST, () =>{
	console.log(`Сервер запущен http://${HOST}:${PORT}`);
});
