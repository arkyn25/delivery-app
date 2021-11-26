const ProductService = require('../services/products');

const getAllProducts = async (req, res) => {
  const allProducts = await ProductService.getAllProducts();
  return res.status(200).json(allProducts);
};

module.exports = {
  getAllProducts,
};