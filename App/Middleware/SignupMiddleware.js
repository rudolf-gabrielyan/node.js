const {check} = require('express-validator/check')
const userModel = require('../models/userModel')
module.exports = {
	validate: function(link) {
		if (link == 'signup') {
			return [
				check('username', 'Error:username is invalid').not().isEmpty(),
				check('email', 'Error:email is invalid').isEmail(),
				check('email', 'Error:email has already been used').custom(async function(value, { req }) {
					let r = await userModel.check(value);
					if (r.length > 0) {
						throw new Error('email has already been used');
					}

					return true;
				}),
				check('password', 'Error:password is invalid').isLength({ min: 6 }),
				check('conf_password', 'Error:confirmPassword is invalid').isLength({ min: 6 }),
				check('conf_password', 'Error:confirmPassword is invalid').custom((value, { req }) => {
					if (value !== req.body.password) {
						throw new Error('Password confirmation does not match password');
					}

					return true;
				})
			]
		}
		else if(link == 'login') {
			return [
				check('username', 'Error:username is invalid').not().isEmpty(),
				check('password', 'Error:password is invalid').isLength({ min: 6 }),
			]
		}
	}



}
