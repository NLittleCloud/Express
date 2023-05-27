const db = require('../configs/config');

const schema = new db.Schema({
	Uname: {
		type: String,
		required: true,
		trim: true
	},
	Mname: {
		type: String,
		required: true,
		trim: true
	},
	Mtype: {
		type: String,
		required: true,
		trim: true
	},
	Object: {
		type: String,
		required: true,
		trim: true
	},
	Owerview: {
		type: String,
		required: true,
		trim: true
	},
	Comment: {
		type: String,
		required: true,
		trim: true
	},
	Createdata:{
		type: Date,
		default: Date.now()
	},
	Updatedata:{
		type: Date,
		default: Date.now()
	}
}, 
{versionKey: false});

module.exports = db.model('info_model', schema);