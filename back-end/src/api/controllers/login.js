const rescue = require('express-rescue');
const loginService = require('../services/login');
const createToken = require('../middlewares/createToken');

const login = rescue((req, res) => res.redirect('/login'));

const login2 = async (req, res) => {
  const result = await loginService.login(req.body);

  if (!result) { return res.status(404).json({ message: 'deu merda corre!' }); }
  const { id, name, email, role } = result;
  const token = createToken({ id, name, email, role });
  
  return res.status(200).json({ data: result, token });
};

module.exports = {
  login,
  login2,
};