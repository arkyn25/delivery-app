const { Sale } = require('../../database/models');

const getAllSalesById = async (id) => {
  const result = await Sale.findAll(
    { where: { userId: id } },
    );
  return result; 
};

const createOrder = async (body) => {
  const result = await Sale.create({ 
      ...body,
   });
  return result; 
};

module.exports = {
  getAllSalesById,
  createOrder,
};