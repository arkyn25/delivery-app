const { User } = require('../../database/models');

const getAll = async () => User.findAll({
  where: { role: 'seller' },
});

module.exports = {
  getAll,
};