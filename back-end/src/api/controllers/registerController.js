const rescue = require('express-rescue');
const jwt = require('jsonwebtoken');
const path = require('path');
const fs = require('fs');
const createToken = require('../middlewares/createToken');
const registerService = require('../services/registerService');

const secret = fs
  .readFileSync(
    path.join(`${__dirname}../../../../jwt.evaluation.key`), { encoding: 'utf-8' },
  ).trim();

const registerUser = rescue(async (req, res) => {
  const { name, email, password, role = 'customer' } = req.body;
  const newUser = await registerService.registerUser(name, email, password, role);
  const token = await createToken({ id: newUser.id, name, email, role });
  const { error } = newUser;
  if (error) return res.status(error.status).json(error.message);
  return res.status(201).json({ id: newUser.id, name, email, role, token });
});

const registerByAdmin = rescue(async (req, res) => {
  const { name, email, password, role } = req.body;
  const adminToken = req.headers.authorization;
  const decoded = jwt.verify(adminToken, secret);

  if (decoded.data.role === 'administrator') {
    const newUser = await registerService.registerUser(name, email, password, role); 
    const { error } = newUser;
    if (error) return res.status(error.status).json(error.message);
    const token = await createToken({ id: newUser.id, name, email, role });
    return res.status(201).json({ id: newUser.id, name, email, role, token });
  }
  return res.status(400).json({ message: 'ação inválida' });
});

module.exports = {
  registerUser,
  registerByAdmin,
};