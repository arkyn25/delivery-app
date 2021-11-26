const { Sale } = require('../../database/models');

const getAllSalesById = async (userId) => {
  const result = await Sale.findAll(
    { where: { userId } },
    );
  return result; 
};

const createOrder = async (body) => {
  const result = await Sale.create({ 
      ...body,
   });
  return result; 
};

const getAllSalesBySellerId = async (sellerId) => {
  const result = await Sale.findAll({
    where: { sellerId },
  });
  return result;
};

module.exports = {
  getAllSalesById,
  createOrder,
  getAllSalesBySellerId,
};