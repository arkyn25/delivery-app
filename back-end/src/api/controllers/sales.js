const rescue = require('express-rescue');
// const { Sale } = require('../../database/models');
const saleService = require('../services/sales');
const { getUserByToken } = require('../middlewares/validateToken');

const sales = rescue(async (req, res) => {
  const token = req.headers.authorization;
  const { data: { id } } = getUserByToken(token);
  const result = await saleService.getAllSalesById(id);
  if (!result) { return res.status(404).json({ message: 'Sem vendas para esse usuario' }); }
  return res.status(200).json(result);
});

const createOrder = rescue(async (req, res) => {
  const { id } = req.body;

  delete req.body.id;
  const result = await saleService.createOrder({
     userId: id, ...req.body, status: 'Pendente' });

  if (!result) { return res.status(404).json({ message: 'Erro ao criar o pedido' }); }
  return res.status(201).json(result);
});

const getSaleById = async (req, res) => {
  const { id } = req.params;

  const result = await saleService.getSaleById(id);

  if (!result) { return res.status(404).json({ message: 'Erro ao pegar os pedido' }); }
  return res.status(200).json(result);
};

const getAllSalesBySellerId = rescue(async (req, res) => {
  const { sellerId } = req.params;

  const result = await saleService.getAllSalesBySellerId(sellerId);

  if (!result) { return res.status(404).json({ message: 'sem pedidos para esse vendedor' }); }
  return res.status(200).json(result);
});

module.exports = {
  sales,
  createOrder,
  getSaleById,
  getAllSalesBySellerId,
};
