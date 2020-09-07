const connection = require("../models/db.js");
const accessTokenSecret = require("../config/jwt.config.js");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Create and Save a new Customer
exports.login = (req, res) => {
	
	const { email, password } = req.body;

	if (email && password) {
		
		connection.query('SELECT * FROM accounts WHERE email = ?', [email], function(error, results, fields) {
			
			if (results.length > 0) {

				user = results[0]
				
				// check password
				bcrypt.compare(password, user.password, function(err, result) {
					
					if(!result){
						res.json({
							reponse: false,
							message: 'Incorrect email and/or Password!'
						});
						res.end();
						return
					}
					
					// Generate an access token
					const accessToken = jwt.sign({ email: user.email,  role: user.profile }, accessTokenSecret.accessTokenSecret);

					res.json({
						accessToken
					});

					res.end();

				});
				
			} else {
				res.send('Incorrect Username and/or Password!');
				res.end();
			}			
			
		});
	} else {
		res.send('Please enter Username and Password!');
		res.end();
	}

};
