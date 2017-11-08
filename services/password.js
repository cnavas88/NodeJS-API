'use strict';

var bcrypt = require('bcrypt');

var password = {};

password.generatePassword = (key, next) =>
{
    var password_generate = key + '1234';

    var BCRYPT_SALT_ROUNDS = 10;
    
    bcrypt.hash(password_generate, BCRYPT_SALT_ROUNDS)
          .then((hashed_password) => 
          {
                next(hashed_password, null);  
          })
          .catch((err) => 
          {
                next(null, 'Error generating password hash.');
          });
};

module.exports = password;