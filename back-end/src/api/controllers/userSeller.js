const rescue = require('express-rescue');
const userSellerService = require('../services/userSeller');

const getAll = rescue(async (req, res) => {
  const sellers = await userSellerService.getAll();
  return res.status(200).json(sellers);
});

module.exports = {
  getAll,
};