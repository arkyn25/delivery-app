const router = require('express').Router();
const salesController = require('../controllers/sales');
const { validateJWT } = require('../middlewares/validateToken');

router.get('/sales', validateJWT, salesController.sales);
router.post('/customer/orders', validateJWT, salesController.createOrder);

module.exports = router;