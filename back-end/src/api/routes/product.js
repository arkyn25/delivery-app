const router = require('express').Router();
const productController = require('../controllers/product');

router.get('/customer/products', productController.getAllProducts);

module.exports = router;