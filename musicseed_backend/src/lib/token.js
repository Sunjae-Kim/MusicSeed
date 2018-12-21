const jwt = require('jsonwebtoken');

const { SECRET_KEY: secret } = process.env;

exports.generate = (payload, options) => {
  const jwtOptions = {
    issuer: 'velog.io',
    expiresIn: '7d',
    ...options,
  };
  if (!jwtOptions.expiresIn) {
    delete jwtOptions.expiresIn;
  }
  return new Promise((resolve, reject) => {
    jwt.sign(payload, secret, jwtOptions, (err, token) => {
      if (err) reject(err);
      resolve(token);
    });
  });
};

exports.decode = (token, secret_key=secret) => {
  return new Promise((resolve, reject) => {
    if (!secret) throw new Error('jwt secret missing');
    jwt.verify(token, secret_key, (err, decoded) => {
      if (err) reject(err);
      resolve(decoded);
    });
  });
};