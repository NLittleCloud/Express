const db = require('../configs/config');

const schema = new db.Schema({
	_id:{
		type: db.Types.ObjectId
	},
	name: {
		type: String,
		required: true,
		trim: true
	}
}, 
{versionKey: false, });

module.exports = db.model('api_key', schema);