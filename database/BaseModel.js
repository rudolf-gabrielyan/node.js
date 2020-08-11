const mysql = require('mysql');

class BaseModel{
	constructor(){
		this.table = null
		this.con = mysql.createConnection({
			host : 'localhost',
			user : 'root',
			password : '',
			database : 'rud_node'

		})
	}

	findAll(){
		return new Promise(function(res,rej){
			this.con.query(`select * from ${this.table}`,function(err,data){
				if(err){throw err}
				else{res(data)}
			})
		}.bind(this))
	}

	insert(x){
		let keys 	= ''
		let values 	= ''		
		for(let i in x){
			keys+=`${i},`;
			values+=`'${x[i]}',`
		}
		keys=keys.substring(0,keys.length-1);
		values = values.substring(0,values.length-1)
		let sql = `insert into ${this.table}(${keys}) values(${values})`
				
		this.con.query(sql,function(err,data){
			if(err){throw err}
			return data
		}) 
	}

	delete(x){
		let key = []
		let value = []
		for(let i in x){
			key.push(i);
			value.push(x[i])
		}
		let text = ''
		for(let i = 0;i<key.length;i++){
			text+=`${key[i]}='${value[i]}' and `
		}

		text=text.substring(0,text.length-4)
		let sql = `delete from ${this.table} where ${text}`
		this.con.query(sql,function(err,data){
			if(err){throw err}
			return data
		}) 
		
		
	}

	update(x,y){
		let key1 = []
		let value1 = []
		let key2 = []
		let value2 = []
		let text1 = ''
		let text2 = ''
		for(let i in x){
			key1.push(i);
			value1.push(x[i])
		}
		for(let i in y){
			key2.push(i);
			value2.push(y[i])
		}
		for(let i = 0;i<key1.length;i++){
			text1+=`${key1[i]}='${value1[i]}',`
		}
		text1=text1.substring(0,text1.length-1)
		for(let i = 0;i<key2.length;i++){
			text2+=`${key2[i]}='${value2[i]}' and `
		}
		text2=text2.substring(0,text2.length-4)
		let sql = `update ${this.table} set ${text1} where ${text2}`
		this.con.query(sql,function(err,data){
			if(err){throw err}
			return data
		})  
	}

	find(x){
		return new Promise(function(res,rej){
			let key = []
			let value = []
			let text = ''
			for(let i in x){
				key.push(i);
				value.push(x[i])
			}
			for(let i = 0;i<key.length;i++){
			text+=`${key[i]}='${value[i]}' and `
			}
			text= text.substring(0,text.length-4);
			let sql = `select * from ${this.table} where ${text}`
			this.con.query(sql,function(err,data){
				if(err){throw err}
				res(data)
			})
		}.bind(this))
	}

}

module.exports = BaseModel;