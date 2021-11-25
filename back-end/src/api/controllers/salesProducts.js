const rescue = require('express-rescue');
const salesProductsService = require('../services/salesProducts');

const getAll = rescue(async (req, res) => {
  const result = await salesProductsService.getAll();
  if (!result) { return res.status(404).json({ message: 'Não foram encontrados!' }); }
  return res.status(200).json(result);
});

const createSalesProducts = rescue(async (req, res) => {
  console.log('controller');
  const result = await salesProductsService.createSalesProducts(req.body);
  if (!result) { return res.status(404).json({ message: 'nao criou' }); }
  return res.status(200).json(result);
});

const getAllByUserId = rescue(async (req, res) => {
  const { id } = req.params;
  const result = await salesProductsService.getAllByUserId(id);
  if (!result) { return res.status(404).json({ message: 'erro' }); }
  return res.status(200).json(result);
});

module.exports = {
  getAll,
  getAllByUserId,
  createSalesProducts,
};
