var express = require('express');
var router = express.Router();
const AMW = require('../App/Middleware/SignupMiddleware')
const UserController = require('../App/Controllers/UserController');
const upload = require('../App/Middleware/uploadMiddleware');


router.get('/',function(req, res, next){
   res.redirect('/welcome')
});

router.get('/welcome',function(req, res, next){
  res.render('welcome');
});

router.get('/signup',UserController.goToSignup);

router.get('/login',UserController.goToLogin);

router.get('/profile',UserController.goToProfile);

router.get('/logout',UserController.logout);

// router.post('/upload/image', UserController.imageUpload);

router.post('/user/login',AMW.validate('login'),UserController.login);

router.post('/user/signup',AMW.validate('signup'),UserController.signup);



module.exports = router;
