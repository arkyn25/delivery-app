const jwt = require('jsonwebtoken');
require('dotenv').config();
const fs = require('fs');
const path = require('path');
const { User } = require('../../database/models');

const secret = fs
  .readFileSync(
    path.join(`${__dirname}../../../../jwt.evaluation.key`), { encoding: 'utf-8' },
).trim();

const validateJWT = async (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) { return res.status(400).json({ message: 'missing auth token' }); }

  try {
    const decoded = jwt.verify(token, secret);
    const user = await User.findOne({ email: decoded.email, password: decoded.password });

    if (!user) {
      return res.status(401).json({ message: 'Not Authorized' }); 
    }

    req.user = user.id;

    next();
  } catch (_err) {
    return res.status(402).json({ message: 'jwt malformed' });
  }
};

const getUserByToken = (token) => {
  const decoded = jwt.verify(token, secret);
  return decoded;
};

module.exports = { validateJWT, getUserByToken };