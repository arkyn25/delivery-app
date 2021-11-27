require('dotenv').config();
const jwt = require('jsonwebtoken');
const path = require('path');
const fs = require('fs');

const secret = fs
  .readFileSync(
    path.join(`${__dirname}../../../../jwt.evaluation.key`), { encoding: 'utf-8' },
).trim();

const jwtConfig = {
  expiresIn: '24h',
  algorithm: 'HS256',
};

const createToken = (data) => jwt.sign({ data }, secret, jwtConfig);

module.exports = createToken;

// referencia: https://github.com/tryber/sd-010-b-project-delivery-app/blob/main-group-1/back-end/src/utils/generateToken.js - auxilio leandro reis