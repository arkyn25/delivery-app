const router = require('express').Router();
const salesProductsController = require('../controllers/salesProducts');

router.get('/checkout', salesProductsController.getAll);
router.get('/salesProducts/:id', salesProductsController.getAllSalesProductsBySeleId);
router.patch('/salesProducts/:id', salesProductsController.updateSalesProductsBySeleId);
router.post('/salesProducts', salesProductsController.createSalesProducts);

module.exports = router;