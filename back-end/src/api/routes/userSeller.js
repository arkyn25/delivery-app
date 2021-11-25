const router = require('express').Router();
const userSellerController = require('../controllers/userSeller');

router.get('/sellers', userSellerController.getAll);

module.exports = router;