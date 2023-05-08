const express = require('express');
const v1_router = express.Router();

const jsonParser = express.json();
let user = {user_agent: 0};
let com = " ";

function validation(req, res, next){
	if(JSON.stringify(req.body) == '{}'){
		next(err);
	}else next();
}

function checkAuthorization(req, res, next){
	const apiKey = req.query.apiKey;
	if (apiKey !== 'api'){
		next(err);
	}
	else next();
}

v1_router.get('/', (req, res) => {
	res.send('Рады видеть вас на нашем сервере!');
});

v1_router.get('/stats', (req, res) => {
	user.user_agent++;
	res.send(`<table>
	<tr><td>User-agent:</td>
	<td>Request:</td></tr>
	<tr><td>${req.headers['user-agent']}</td><td>${user.user_agent}</td></tr>
	</table>`) 
});

v1_router.post('/users', jsonParser, validation, checkAuthorization, (req, res) => {
	res.send('Успешно!');
});

v1_router.get('/comments', (req, res) => {
 	res.send(com);
});

v1_router.post('/comments', jsonParser, validation, (req, res) => {
	console.log(req.body);
	com += JSON.stringify(req.body);
	res.send('Спасибо, за вашу отзывчивость!');
});

v1_router.use((req, res, next) =>{
  res.status(404).send('Такой страницы не существует!');
});

module.exports = v1_router;
