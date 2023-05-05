const express = require('express');
const v1_router = express.Router();
const v1_router2 = express.Router();
const jsonParser = express.json();


let user = {user_agent: 0};
let com = " ";

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


v1_router2.get('/', (req, res) => {
 	res.send(com);
});

v1_router2.post('/', jsonParser, (req, res) => {
	console.log(req.body);
	com += JSON.stringify(req.body);
	res.send('Спасибо, за вашу отзывчивость!');
});

module.exports = {v1_router, v1_router2};
