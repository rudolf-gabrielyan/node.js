var BaseModel = require('../../database/BaseModel');


class UserModel extends BaseModel {

	constructor(){
		super();
		this.table = 'users';
	}

	check(x){
		return new Promise(function(res,rej){
			this.con.query(`select * from users where email = '${x.email}'`,function(err,data){
				if(err){throw err}
				else{res(data)}
			})
		}.bind(this))
	}

	check1(x){
		return new Promise(function(res,rej){
			this.con.query(`select * from users where username = '${x.username}'`,function(err,data){
				if(err){throw err}
				else{res(data)}
			})
		}.bind(this))
	}

}
module.exports = new UserModel()