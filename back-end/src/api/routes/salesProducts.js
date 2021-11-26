const router = require('express').Router();
const salesProductsController = require('../controllers/salesProducts');

router.get('/checkout', salesProductsController.getAll);
router.post('/salesProducts', salesProductsController.createSalesProducts);
router.get('/salesProducts/:id', salesProductsController.getAllSalesProductsBySeleId);

module.exports = router;