const md5 = require('md5');
const { User } = require('../../database/models');

const login = async ({ email, password }) => {
  const hash = md5(password);
  const result = await User.findOne(
    { where: { email, password: hash } },
    );
    if (!result) return null;
  const { id, name, role } = result;
  return { id, name, email, role }; 
};

module.exports = {
  login,
};