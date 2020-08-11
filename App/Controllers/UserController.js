const bcrypt = require('bcrypt')
const { validationResult } = require('express-validator')
const userModel = require('../Models/UserModel')
const con = require('../../database.js');
// const Resize = require('../../App/Middleware/Resize');
const path = require('path');
const multer = require('multer');


var formidable = require('formidable');
const fs = require("fs");
const randomstring = require("randomstring");



exports.signup = function (req, res) {


  let errors = validationResult(req);

    errors = errors.array();

    if (errors.length > 0) {

      req.session.errors = errors;
      res.redirect('/signup');

    }
    else {
      

    	bcrypt.hash(req.body.password, 10, function(err, hash) {
        req.body.password = hash;
        delete req.body.conf_password;        
        userModel.insert(req.body);
        res.redirect('/login')

      });
    }
}

exports.goToSignup = function( req, res ) {
  console.log(req.session.user)

  if (req.session.user) {
    res.redirect('/profile')
  }
  else {
    let errors = req.session.errors;
    res.render('signup',{errors});
    req.session.destroy()
    
  }

}

exports.login =  async function ( req, ress ) {
  let errors1 = validationResult(req);
    errors1 = errors1.array();

    if (errors1.length > 0) { req.session.errors1 = errors1; ress.redirect('/login') }

    let user1 = await userModel.check1(req.body)
    // console.log(user1);

    if (user1.length > 0) {
      bcrypt.compare(req.body.password, user1[0].password, function(err, res) {
        if (res) {req.session.user=user1; ress.redirect('/profile') }
        else {
          errors1.push({
            value: '',
            msg: 'Error:password is wrong',
            param: 'password',
            location: 'body'
          })
          
          req.session.errors1 = errors1; 
          ress.redirect('/login')
        }
      });
    }
    else {
      errors1.push({
        value: '',
        msg: 'Error:there is not such registered username',
        param: 'username',
        location: 'body'
      })
      req.session.errors1 = errors1; 
      ress.redirect('/login')
    }
}

exports.goToLogin = function( req, res ) {

  if (req.session.user) {
    res.redirect('/profile')
  }
  else {
    let errors1 = req.session.errors1;
    res.render('login', { errors1 })
    req.session.destroy()
  }
}

exports.goToProfile = async function( req, res ) {
  if (req.session.user) {
    let user = req.session.user;
    let sql = `select * from users`
    con.query(sql,function(err,data){
        if(err){throw err}
        res.render('profile', { user:user,users:data })    
    })

    



    
  }
  else {
    res.redirect('/login')
  }
 
}

exports.logout = function( req, res ) {
  req.session.destroy();
  res.redirect('/login');
}

exports.imageUpload = function( req, res ) {
  
   
  var storage =   multer.diskStorage({
    destination:  (req, file, callback) => {  
       callback(null, '../public/images/uploads');
    },
    filename: (req, file, callback)=> {
      console.log(file)
      var file_name = Date.now() + randomstring.generate(7)+'-file' +  path.extname(file.originalname)
      callback(null,  file_name);
    }
  });

  // console.log(storage)

  var upload = multer({ storage : storage }).array('my_post',5);


  res.redirect('back');




}