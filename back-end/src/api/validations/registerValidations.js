const Joi = require('joi');

const registerValidation = (name, email, password) => {
  const { error } = Joi.object({
    name: Joi.string().min(12).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
  }).validate({ name, email, password });
  if (error) { return { error: { status: 400, message: error.details[0].message } }; }
  return true;
};

module.exports = {
  registerValidation,
};
