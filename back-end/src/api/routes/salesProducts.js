const router = require('express').Router();
const salesProductsController = require('../controllers/salesProducts');

router.get('/checkout', salesProductsController.getAll);
router.get('/customer/orders/:id', salesProductsController.getAllSalesProductsBySeleId);
router.post('/salesProducts', salesProductsController.createSalesProducts);
router.get('/salesProducts', salesProductsController.getAllSalesProductsBySeleId);

module.exports = router;