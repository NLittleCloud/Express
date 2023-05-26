const db = require('mongoose');

db.connect('mongodb://127.0.0.1:27017/Web', {
	useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Now connected to MongoDB!'))
.catch(err => console.log('Something went wrong ', err));

module.exports = db;