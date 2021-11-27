const md5 = require('md5');
const { registerValidation } = require('../validations/registerValidations');
const { User } = require('../../database/models');

const registerUser = async (name, email, password, role) => {
  const isValid = registerValidation(name, email, password);
  if (!isValid) return isValid;
  const emailExists = await User.findOne({ where: { email } });
  if (emailExists) return { error: { status: 409, message: 'Email already registered' } };
  const hash = md5(password);
  return User.create({ name, email, password: hash, role });
};

module.exports = {
  registerUser,
};