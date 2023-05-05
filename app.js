const express = require('express');
const {v1_router, v1_router2} = require("./router/router");
const HOST = '127.0.0.1';
const PORT = 8000;

const app = express();
app.use(express.static('public'));

app.use('/v1', v1_router);
app.use('/v1/comments', v1_router2);

app.listen(PORT, HOST, () =>{
	console.log(`Сервер запущен http://${HOST}:${PORT}`);
});

app.use((req, res) => {
	res.status(404).send('Данная страница не найдена!');
});

app.use((err, req,res) => {
	res.status(500).send('Ошибка сервера')
});
