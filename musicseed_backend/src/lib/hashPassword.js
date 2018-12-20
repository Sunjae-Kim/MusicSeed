const bcrypt = require('bcrypt');

exports.hashPassword = (myPlaintextPassword) => {
  const saltRounds = 10;
  return new Promise((resolve, reject) => {
    bcrypt.hash(myPlaintextPassword, saltRounds, function(err, hash) {
      if(err) reject(err);
      resolve(hash);
    });
  })
}